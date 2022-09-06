import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPost } from 'src/app/core/interfaces/post';
import { PostService } from 'src/app/core/post.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: IPost[];
  totalElements: number = 0;

  constructor(
    private postService: PostService, private spinner: NgxSpinnerService) { }

      ngOnInit(): void {
      this.getProducts({page: "0", size: "5"});
  }

  private getProducts(request) {
    this.spinner.show();
    this.postService.getAllPosts$(request)
    .subscribe(data => {
      this.posts = data['content'];
      this.totalElements = data['totalElements'];
      this.spinner.hide();
    },
    error => {
      console.log(error.error.message)
    });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getProducts(request);
  }

}
