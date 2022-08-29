import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router) {}
  
  canActivate(): boolean | UrlTree {
    if (sessionStorage.getItem('auth-token')) {
      return true;
    }

    return this.router.createUrlTree(['/users/login'])
  }
  
}
