import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlanetsRoutingModule } from './planets-routing.module';
import { SunComponent } from './sun/sun.component';
import { MercuryComponent } from './mercury/mercury.component';
import { VenusComponent } from './venus/venus.component';
import { EarthComponent } from './earth/earth.component';
import { TheMoonComponent } from './the-moon/the-moon.component';
import { MarsComponent } from './mars/mars.component';
import { JupiterComponent } from './jupiter/jupiter.component';
import { SaturnComponent } from './saturn/saturn.component';
import { UranusComponent } from './uranus/uranus.component';
import { NeptuneComponent } from './neptune/neptune.component';



@NgModule({
  declarations: [
    SunComponent,
    MercuryComponent,
    VenusComponent,
    EarthComponent,
    TheMoonComponent,
    MarsComponent,
    JupiterComponent,
    SaturnComponent,
    UranusComponent,
    NeptuneComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PlanetsRoutingModule
  ]
})
export class PlanetsModule { }
