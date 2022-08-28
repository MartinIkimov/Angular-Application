import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { AboutComponent } from "../feature/pages/about/about.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

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
        canActivate: [AuthGuard],
        component: ProfileComponent,
    },
    {
        path: 'users/profile/:id',
        canActivate:[AuthGuard],
        component:UserProfileComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }
]

export const AuthRoutingModule = RouterModule.forChild(routes);