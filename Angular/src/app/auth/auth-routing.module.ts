import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    {
        path: 'register',
        // component: RegisterComponent,
    },
    {
        path: 'login',
        // component: LoginComponent,
    },
    {
        path: 'profile',
        // TODO stoimenovg: uncomment.
        // canActivate: [AuthGuard],
        // component: ProfileComponent,
    }
]

export const AuthRoutingModule = RouterModule.forChild(routes);