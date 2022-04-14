import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/core/token-storage.service';
import {IPost} from 'src/app/core/interfaces/post'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUserPosts: IPost[];

  currentUser: any;

  constructor(private token: TokenStorageService, private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.httpClient.get<IPost[]>(`${environment.apiUrl}users/profile`). subscribe(
      posts => {
        this.currentUserPosts = posts;
      }
    )
  }



}
