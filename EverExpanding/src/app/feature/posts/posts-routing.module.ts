import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { PostDetailPageComponent } from "./post-detail-page/post-detail-page.component";
import { PostPageComponent } from "./post-page/post-page.component";
import { PostUpdateComponent } from "./post-update/post-update.component";
import { PostsAddComponent } from "./posts-add/posts-add.component";

const routes: Routes = [
    {
        path: 'posts/all',
        canActivate: [AuthGuard],
        component: PostPageComponent
    },
    {
        path: 'posts/:postId/details',
        canActivate: [AuthGuard],
        component: PostDetailPageComponent
    },
    {
        path: 'posts/add',
        canActivate: [AuthGuard],
        component: PostsAddComponent
    },
    {
        path: 'posts/:postId/edit',
        canActivate: [AuthGuard],
        component: PostUpdateComponent
    }
];

export const PostsRoutingModule = RouterModule.forChild(routes);