import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class GuestGuard implements  CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  canActivate() {
    if (!this.authService.isLoggedIn()) { return true; }

    // Navigate to the login page with extras
    this.router.navigate(['/dashboard']);
    return false;
  }
  
}