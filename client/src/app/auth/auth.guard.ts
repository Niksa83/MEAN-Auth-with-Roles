import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, CanActivateChild, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  canLoad() {
    return this.checkLogin();
  }

  canActivate() {
    return this.checkLogin();
    // TODO server check for token to be usef for our users route
  }

  canActivateChild() {
    return this.checkLogin();
  }
  

  checkLogin(): boolean {
    if (this.authService.isLoggedIn()) { return true; }

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
  
}