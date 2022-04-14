import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListItemMinimizedComponent } from './posts-list-item-minimized/posts-list-item-minimized.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { PostDetailPageComponent } from './post-detail-page/post-detail-page.component';
import { PostPageComponent } from './post-page/post-page.component';



@NgModule({
  declarations: [
    PostsListItemMinimizedComponent,
    PostListComponent,
    PostListItemComponent,
    PostDetailPageComponent,
    PostPageComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule
  ], 
  exports: [
    PostsListItemMinimizedComponent
  ]
})
export class PostsModule { }
