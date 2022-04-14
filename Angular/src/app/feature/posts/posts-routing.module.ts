import { Routes, RouterModule } from "@angular/router";
import { PostPageComponent } from "./post-page/post-page.component";

const routes: Routes = [
    {
        path: 'posts/all',
        component: PostPageComponent
    },
    // {
    //     path: '/users/:postId/details',
    //     component: HomePageComponent
    // }
];

export const PostsRoutingModule = RouterModule.forChild(routes);