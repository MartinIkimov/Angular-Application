import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundPageComponent } from './page-not-found-page/page-not-found-page.component';



@NgModule({
  declarations: [
    HomePageComponent,
    PageNotFoundPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
