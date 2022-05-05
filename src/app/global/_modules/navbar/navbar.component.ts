import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokeClass } from '../../../global/_class/pokeclass';

@Component({
  selector: 'global-app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  pokeC: PokeClass;
  pokeid: any;

  constructor(
    private router: Router,
  ) { this.pokeC = new PokeClass() }

  ngOnInit(): void {
  }

  randomPokemon() {
    var min = 1;
    var max = 898;
    var randomId = Math.floor(Math.random()*(max-min+1)+min);

    this.pokeC.viewDetails(randomId, this.router);
  }

  searchPokemon() {
    if (this.pokeid) {
      this.pokeC.viewDetails(this.pokeid, this.router);
      this.pokeid = '';
    }
  }

}
