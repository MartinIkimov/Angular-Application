import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: IPost[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<IPost[]>(`${environment.apiUrl}posts/all`). subscribe(
      postsFromGet => {
        this.posts = postsFromGet;
        console.log(postsFromGet)
      }
    )
  }

}
