import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { GlobalmainComponent } from './_components/globalmain/globalmain.component';
import { FooterComponent } from './_modules/footer/footer.component';
import { HeaderComponent } from './_modules/header/header.component';
import { NavbarComponent } from './_modules/navbar/navbar.component';
import { ContentComponent } from './_modules/content/content.component';
import { CapitalizePipe } from './_pipes/capitalize.pipe';
import { HeightMeasurePipe } from './_pipes/height-measure.pipe';
import { WeightMeasurePipe } from './_pipes/weight-measure.pipe';

const routes:Routes = [
  {
    path: '', 
    component: GlobalmainComponent,
    children: [
      { path: '', redirectTo: '/pokedex', pathMatch: 'full' },     
      { path: '', loadChildren: ()=>import('../home-page/home-page.module').then(m=>m.HomePageModule) },
      { path: 'pokemon/:id', loadChildren: ()=>import('../details-page/details-page.module').then(m=>m.DetailsPageModule) },
    ]
  }
];

@NgModule({
  declarations: [
    GlobalmainComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    ContentComponent,
    CapitalizePipe,
    HeightMeasurePipe,
    WeightMeasurePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class GlobalModule { }
