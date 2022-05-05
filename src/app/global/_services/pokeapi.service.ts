import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PokeData } from '../_interfaces/poke-data';
import { PokeIntro } from '../_interfaces/poke-intro';

@Injectable({
  providedIn: 'root'
})

export class PokeapiService {
  private urlbase = 'https://pokeapi.co/api/v2/';
  private urlPokemon = this.urlbase + 'pokemon/';
  private urlType = this.urlbase + 'type/';
  private urlSpecie = this.urlbase + 'pokemon-species/';;
  private urlEvo = this.urlbase + 'evolution-chain/';
  public auxid: any;
  constructor(
    private http: HttpClient,
  ) { }

  getPokeList(): Observable<any> {
    const limit = '?limit=1118';
    return this.http.get(this.urlPokemon+limit);
  }

  getPokeInfo(url: string, id?: string): PokeIntro {
    let pokeData: PokeIntro = {
      pokeid: 0,
      name: '',
      img: '',
      types: [],
    }

    if (id) {
      url = this.urlPokemon + id;
    }

    this.http.get(url).subscribe((response: any) => {
      if (response) {
        const data = response;
        pokeData.name = data.name;
        pokeData.pokeid = data.id;
        pokeData.types = this.extractData(data.types, 'name', 'type');
        pokeData.img = data.sprites.other["official-artwork"].front_default;
      }
    });
  
    return pokeData;
  }

  getFullPokeInfo(id: string): PokeData {
    let pokeData: PokeData = {
      pokeid: 0,
      name: '',
      img: '',
      types: [],
      weaknesses: [],
      description: '',
      height: 0,
      weight: 0,
      abilities: [],
      stats: [],
      evolution: [],
      genders: [],
      specie: '',
      nextPoke: [],
      prevPoke: []
    }
    
    this.http.get(this.urlPokemon + id).subscribe(
      (response: any) => {
        if (response) {
          const dataPoke = response;
          pokeData.name = dataPoke.name;
          pokeData.pokeid = dataPoke.id;
          pokeData.stats = this.extractData(dataPoke.stats, 'base_stat');
          pokeData.height = dataPoke.height;
          pokeData.weight = dataPoke.weight;
          pokeData.types = this.extractData(dataPoke.types, 'name', 'type');
          pokeData.abilities = this.extractData(dataPoke.abilities, 'name', 'ability', 2);
          pokeData.stats = this.extractData(dataPoke.stats, 'base_stat');
          pokeData.img = dataPoke.sprites.other["official-artwork"].front_default;

          this.auxid = pokeData.types[0];
          this.http.get(this.urlType + this.auxid).subscribe((response: any)=>{
            if (response) {
              const dataType= response;
              pokeData.weaknesses = this.extractData(dataType.damage_relations.double_damage_from, 'name');
              pokeData.weaknesses = this.removeItems(pokeData.weaknesses, pokeData.types);
            }
          });

          if (pokeData.types[1]) {
            this.auxid = pokeData.types[1];
            this.http.get(this.urlType + this.auxid).subscribe((response: any)=>{
              if (response) {
                const dataType = response;
                this.auxid = this.extractData(dataType.damage_relations.double_damage_from, 'name');
                pokeData.weaknesses = this.removeItems(pokeData.weaknesses, this.auxid);
                pokeData.weaknesses.push.apply(pokeData.weaknesses, this.auxid);
                pokeData.weaknesses = this.removeItems(pokeData.weaknesses, pokeData.types);
              }
            });
          } 

          this.auxid = pokeData.pokeid.toString();
          this.http.get(this.urlSpecie + this.auxid)
            .subscribe((response: any)=> {
              if (response) {
                const dataSpecie = response;
                pokeData.description = this.getText(dataSpecie.flavor_text_entries, 'flavor_text', true);
                pokeData.specie = this.getText(dataSpecie.genera, 'genus');
                pokeData.genders = this.getGenders(dataSpecie.gender_rate); 

                this.auxid = this.getPokeid(dataSpecie.evolution_chain.url);
                
                this.http.get(this.urlEvo + this.auxid).subscribe((response: any)=>{
                  if (response) {
                    const dataEvolution = response;
                    pokeData.evolution = this.getEvolutionChain(dataEvolution);
                  }
                });
              }
            },
            (error: any)=>{
              if (error) {
                pokeData.description = 'Details of this Pokémon are Unknown';
                pokeData.specie = 'Unknown';
              }
            }
          );

          this.auxid = pokeData.pokeid - 1;
          if (this.auxid != 0) {
            pokeData.prevPoke = this.getPokeInfo('', this.auxid);
          }

          this.auxid = pokeData.pokeid + 1;
          if (this.auxid < 10221) {
            pokeData.nextPoke = this.getPokeInfo('', this.auxid);
          }
        }
      },
      (error: any) => {
        if (error) {
          pokeData.name = '';
        }
      }
    );

    return pokeData;
  }

  extractData(arrayValues: Array<any>, key: string, subkey?: string, quantity?: number): Array<string> {
    var data: Array<string> = [];
    var count: number = 0;
    if (!quantity) {
      quantity = arrayValues.length;
    } else {
      if (quantity > arrayValues.length) {
        quantity = arrayValues.length;
      } 
    }

    for (count = 0; count < quantity; count++) {
      if (subkey) {
        data.push(arrayValues[count][subkey][key]);
      } else {
        data.push(arrayValues[count][key]); 
      }
    }
    return data;
  }

  removeItems( original: Array<string>, removeList: Array<string>) {
    for ( let item of removeList ) {
      let index = original.indexOf(item);
      if (index >= 0) {
        original.splice(index, 1);
      }
    }
    return original;
  }

  getText(arrayInfo: Array<any>, txtKey: string, parsed?: boolean): string {
    var txt: string = '';
    var count: number = 0;
    if (!parsed) {
      parsed = false;
    }
    for (count = 0; count < arrayInfo.length; count++) {
      txt = arrayInfo[count][txtKey];
      if (arrayInfo[count]['language']['name'] === 'en') {
        if (parsed) {
          txt = txt.replace('\n',' ');
          txt = txt.replace('\f',' ');
        }
        return txt;
      }
    }
    txt = 'Unknown details of this Pokemon';
    return txt;
  }

  getGenders(genRate: number): Array<string> {
    var gendersArray: Array<string> = [];
    if (genRate != -1) {
      if (genRate > 0 && genRate <= 8)
      {
        gendersArray.push('female');
      }
      if (genRate === 0 || genRate != 8)
      {
        gendersArray.push('male');
      }
    } else {
      gendersArray.push('genderless');
    }
    return gendersArray;
  }

  getPokeid(url: string): string {
    var id: string = '';
    var urlparts: Array<string> = [];

    urlparts = url.split('/');
    id = urlparts[urlparts.length - 2];
    return id;
  }


  getEvolutionChain(evoData: any): Array<PokeIntro> {
    var status: boolean = true;
    var actualChain = evoData.chain;
    var evoChain: Array<PokeIntro> = [];
    var id: string = '';
    do {
      id = this.getPokeid(actualChain.species.url);
      evoChain.push(this.getPokeInfo('', id));
      if (actualChain.evolves_to.length && actualChain.evolves_to.length <= 2) {
        if (actualChain.evolves_to.length > 1) {
          id = this.getPokeid(actualChain.evolves_to[0].species.url);
          evoChain.push(this.getPokeInfo('', id));

          actualChain = actualChain.evolves_to[1];
        } else {
          actualChain = actualChain.evolves_to[0];
        }

      } else {
        status = false;
      }
    } while(status);

    if (actualChain.evolves_to.length > 2) {
      var j = 0;
      for (j = 0; j< actualChain.evolves_to.length; j++) {
        id = this.getPokeid(actualChain.evolves_to[j].species.url);
        evoChain.push(this.getPokeInfo('', id));
      }
    }
    
    return evoChain;
  }

}
