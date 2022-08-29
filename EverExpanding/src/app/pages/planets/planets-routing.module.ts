import { RouterModule, Routes } from '@angular/router';
import { EarthComponent } from './earth/earth.component';
import { JupiterComponent } from './jupiter/jupiter.component';
import { MarsComponent } from './mars/mars.component';
import { MercuryComponent } from './mercury/mercury.component';
import { NeptuneComponent } from './neptune/neptune.component';
import { SaturnComponent } from './saturn/saturn.component';
import { SunComponent } from './sun/sun.component';
import { TheMoonComponent } from './the-moon/the-moon.component';
import { UranusComponent } from './uranus/uranus.component';
import { VenusComponent } from './venus/venus.component';

const routes: Routes = [
    {
        path: 'planets/sun',
        component:SunComponent
    },
    {
        path: 'planets/mercury',
        component:MercuryComponent
    },
    {
        path: 'planets/venus',
        component:VenusComponent
    },
    {
        path: 'planets/earth',
        component:EarthComponent
    },
    {
        path: 'planets/theMoon',
        component:TheMoonComponent
    },
    {
        path: 'planets/mars',
        component:MarsComponent
    },
    {
        path: 'planets/jupiter',
        component:JupiterComponent
    },
    {
        path: 'planets/saturn',
        component:SaturnComponent
    },
    {
        path: 'planets/uranus',
        component:UranusComponent
    },
    {
        path: 'planets/neptune',
        component:NeptuneComponent
    }
];


export const PlanetsRoutingModule = RouterModule.forChild(routes);

