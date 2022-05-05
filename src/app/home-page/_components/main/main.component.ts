import { Component, OnInit } from '@angular/core';

import { PokeData } from '../../../global/_interfaces/poke-data';
import { PokeIntro } from '../../../global/_interfaces/poke-intro';
import { PokeapiService } from '../../../global/_services/pokeapi.service';
@Component({
  selector: 'home-app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  pokemonDisplay: Array<PokeIntro> = [];
  pokemonListTotal: Array<any> = [];
  pokemonListFilter: Array<any> = [];
  filterSelected: string = 'Lowest Number (First)';
  filterOptions: Array<string> = [
    'Lowest Number (First)',
    'Highest Number (First)',
    'A-Z',
    'Z-A'
  ];
  indexLimit: number = 0; 
  totalDisplay: number = 20;
  reverse: boolean = false;
  loading = true;
  
  constructor(
    private servPokeApi: PokeapiService
  ) { }

  ngOnInit(): void {
    this.servPokeApi.getPokeList().subscribe((response: any) => {
      if (response) {
        this.pokemonListTotal = response['results'];
        this.pokemonListFilter = this.pokemonListTotal.slice();
        this.fillPokemonDisplay();
      }
    });
  }

  changeFilter(): void {
    this.pokemonListFilter = this.pokemonListTotal.slice();
    switch (this.filterSelected) {
      case 'Lowest Number (First)':
        this.reverse = false;
        break;
      case 'Highest Number (First)':
        this.reverse = true;
        break;
      case 'A-Z':
        this.reverse = false;
        this.sort(this.pokemonListFilter, 'name', true);
        break;
      case 'Z-A':
        this.reverse = false;
        this.sort(this.pokemonListFilter, 'name', false);
        break;
    }
    this.pokemonDisplay = [];
    if (!this.reverse) {
      this.indexLimit = 0;
    } else {
      this.indexLimit = this.pokemonListTotal.length - 1;
    }
    this.loading = true;
    this.fillPokemonDisplay();
  }

  sort(array: any[], property: string, isAtoZ: boolean): any {
    if (isAtoZ) {
      return array.sort((item1,item2)=> {
        return (item1[property].toLowerCase() > item2[property].toLowerCase()) ? 1 : -1;});
    } else {
      return array.sort((item1,item2)=> {
        return (item1[property].toLowerCase() < item2[property].toLowerCase()) ? 1 : -1;});
    }
  }

  loadMorePokemon() {
    this.fillPokemonDisplay();
  }

  fillPokemonDisplay(): void {
    var count = 0;
    var url = '';
    for(count = 0; count < this.totalDisplay; count++) {
      url = this.pokemonListFilter[this.indexLimit]['url'];
      this.pokemonDisplay.push(this.servPokeApi.getPokeInfo(url));

      if (!this.reverse) {
        this.indexLimit ++;
      } else {
        this.indexLimit --;
      }
    }
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
