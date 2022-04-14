import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';

@Component({
  selector: 'app-posts-list-item-minimized',
  templateUrl: './posts-list-item-minimized.component.html',
  styleUrls: ['./posts-list-item-minimized.component.css']
})
export class PostsListItemMinimizedComponent implements OnInit {

  @Input() post: IPost;

  constructor() { }

  ngOnInit(): void {
    console.log(this.post);
    console.log("NG ON INIT BBY")
  }

}
