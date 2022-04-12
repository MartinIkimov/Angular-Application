import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces/user';

export interface CreateUserDto { username: string, email: string, password: string}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser?: IUser;

  get isLogged() {
    return !!this.currentUser;
  }

  constructor(private httpClient: HttpClient) { }

  register$(userData: CreateUserDto): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}users/register`, userData, {withCredentials: true})
  }

  login$(userData: { email: string, password: string }): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${environment.apiUrl}users/login`, userData, { withCredentials: true, observe: 'response' })
      .pipe(
        tap(response => console.log(response)),
        map(response => response.body),
        tap(user => this.currentUser = user)
      )
  }
}
