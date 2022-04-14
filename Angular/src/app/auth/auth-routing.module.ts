import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "../feature/pages/about/about.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
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
    {
        path: 'users/profile',
        // TODO stoimenovg: uncomment.
        // canActivate: [AuthGuard],
        component: ProfileComponent,
    },
    {
        path: 'about',
        component: AboutComponent
    }
]

export const AuthRoutingModule = RouterModule.forChild(routes);