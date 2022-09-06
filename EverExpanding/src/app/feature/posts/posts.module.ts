import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListItemMinimizedComponent } from './posts-list-item-minimized/posts-list-item-minimized.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { PostDetailPageComponent } from './post-detail-page/post-detail-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { CommentComponent } from './comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsAddComponent } from './posts-add/posts-add.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    PostsListItemMinimizedComponent,
    PostListComponent,
    PostListItemComponent,
    PostDetailPageComponent,
    PostPageComponent,
    CommentComponent,
    PostsAddComponent,
    PostUpdateComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ], 
  exports: [
    PostsListItemMinimizedComponent,
    NgxSpinnerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PostsModule { }
