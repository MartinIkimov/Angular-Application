import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './feature/pages/home-page/home-page.component';
import { PageNotFoundComponent } from './feature/pages/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path:'users',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'planets',
        loadChildren: () => import('./feature/pages/planets/planets.module').then(m => m.PlanetsModule)
    },
    {
        path: 'posts',
        loadChildren: () => import('./feature/posts/posts.module').then(m => m.PostsModule)
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];


export const AppRoutingModule = RouterModule.forRoot(routes);

