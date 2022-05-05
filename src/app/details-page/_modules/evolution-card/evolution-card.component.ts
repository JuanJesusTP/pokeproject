import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PokeClass } from '../../../global/_class/pokeclass';
import { PokeIntro } from '../../../global/_interfaces/poke-intro';
import { CapitalizePipe } from '../../../global/_pipes/capitalize.pipe';


@Component({
  selector: 'app-evolution-card',
  templateUrl: './evolution-card.component.html',
  styleUrls: ['./evolution-card.component.css'],
  providers: [CapitalizePipe]
})
export class EvolutionCardComponent implements OnInit {
  
  @Input() pokeData: PokeIntro ; 
  
  pokeC: PokeClass;

  constructor(
    public router: Router,
    public pipeCapitalize: CapitalizePipe,
  ) {this.pokeC = new PokeClass()}

  ngOnInit(): void {
  }

  changeImg(){
    this.pokeData.img = '../../../../assets/images/homePage/unknown_pokemon.png';
  }

}
