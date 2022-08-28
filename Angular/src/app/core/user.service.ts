import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces/user';

export interface CreateUserDto { username: string, email: string, password: string}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  login$(username: string, password: string) : Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}users/login`, {
      username,
      password,
    }, httpOptions)
  }

  register$(username: string, email: string, password: string) : Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}users/register`, {
      username,
      email,
      password
    }, httpOptions)
  }

  getUserById(userId: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}users/profile/` + userId)
  }
}
