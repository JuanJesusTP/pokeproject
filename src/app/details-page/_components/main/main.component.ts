import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokeData } from '../../../global/_interfaces/poke-data';
import { PokeClass } from '../../../global/_class/pokeclass';
import { PokeapiService } from '../../../global/_services/pokeapi.service';
import { CapitalizePipe } from '../../../global/_pipes/capitalize.pipe';
import { HeightMeasurePipe } from '../../../global/_pipes/height-measure.pipe';
import { WeightMeasurePipe } from '../../../global/_pipes/weight-measure.pipe';

@Component({
  selector: 'details-page-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [CapitalizePipe, HeightMeasurePipe, WeightMeasurePipe]
})
export class MainComponent implements OnInit {
  pokeDetails: PokeData;
  pokeC: PokeClass;
  statsConf = [
    {style:'hp-bar', title:'HP'},
    {style:'attack-bar', title:'Attack'},
    {style:'defense-bar', title:'Defense'},
    {style:'sp-attack-bar', title:'Special attack'},
    {style:'sp-defense-bar', title:'Special defense'},
    {style:'speed-bar', title:'Speed'},
  ];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private servPokeApi: PokeapiService,
    public pipeCapitalize: CapitalizePipe,
    public pipeWeight: WeightMeasurePipe,
    public pipeHeight: HeightMeasurePipe,
    public router: Router,
  ) { this.pokeC = new PokeClass() }
 
  ngOnInit(): void {
    this.pokeDetails = this.servPokeApi.getFullPokeInfo(this.route.snapshot.paramMap.get('id'));
   
    setTimeout(() => {
      this.loading = false;
    }, 1000);
     
  }

  changeImg(): void {
    this.pokeDetails.img = '../../../../assets/images/homePage/unknown_pokemon.png';
  }

}


