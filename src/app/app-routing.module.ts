import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  { path: 'pokedex', loadChildren: ()=>import('./global/global.module').then(module=>module.GlobalModule) },
  { path:'**', redirectTo: 'pokedex' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
