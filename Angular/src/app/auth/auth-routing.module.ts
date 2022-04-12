import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";


const routes: Routes = [
    {
        path: 'users/register',
        component: RegisterComponent,
    },
    {
        path: 'users/login',
        component: LoginComponent,
    },
    // {
    //     path: 'profile',
    //     // TODO stoimenovg: uncomment.
    //     // canActivate: [AuthGuard],
    //     // component: ProfileComponent,
    // }
]

export const AuthRoutingModule = RouterModule.forChild(routes);