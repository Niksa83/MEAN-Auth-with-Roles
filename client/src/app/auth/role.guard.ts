import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class RoleGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}


  canLoad(){
    return this.authService.verifyUser();
    
  }


  
}