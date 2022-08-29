import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComment } from './interfaces/comment';
import { IPost } from './interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  loadPostById$(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${environment.apiUrl}posts/${id}/details`)
  }

  getCommentsByPostId$(id: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${environment.apiUrl}api/${id}/comments`)
  }

  postComment$(message: any, postId: number) : Observable<any> {
    return this.http.post(`${environment.apiUrl}api/${postId}/comments`, message);
  }

  addPost$(file: any){
    this.http.post(`${environment.apiUrl}posts/add`, file, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          console.log('200')
        } else {
          console.log('else')
        }
      }
      );
  }

  getAllPosts$(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${environment.apiUrl}posts/all`);
  }

  deletePost$(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}posts/${id}`)
  }

  editPost$(file: any, id: number,){
    return this.http.patch(`${environment.apiUrl}posts/${id}/edit`, file ,{observe: 'response'})
    .subscribe((response) => {
      if (response.status === 200) {
        console.log('200')
      } else {
        console.log('else')
      }
    });
  }
}
