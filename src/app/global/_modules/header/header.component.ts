import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokeClass } from '../../../global/_class/pokeclass';

@Component({
  selector: 'global-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pokeC: PokeClass;

  constructor(
    private router: Router
  ) { this.pokeC = new PokeClass() }

  ngOnInit(): void {
  }

  goHome() {
    this.pokeC.goHome(this.router);
  }
}
