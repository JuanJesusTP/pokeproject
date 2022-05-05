import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PokeClass } from '../../../global/_class/pokeclass';
import { CapitalizePipe } from '../../../global/_pipes/capitalize.pipe';
import { PokeIntro } from '../../../global/_interfaces/poke-intro';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.css'],
  providers: [CapitalizePipe]
})
export class PokeCardComponent implements OnInit {

  @Input() pokeData: PokeIntro ; 
 
  pokeC: PokeClass;

  constructor(
    public router: Router,
    public pipeCapitalize: CapitalizePipe,
  ){this.pokeC = new PokeClass()}

  ngOnInit(): void {
  }

  changeImg() {
    this.pokeData.img = '../../../../assets/images/homePage/unknown_pokemon.png';
  }

}
