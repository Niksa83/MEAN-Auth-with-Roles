import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { User } from '../../models/user.interface';
import { UsersService } from '../../users.service';


@Injectable()
export class UsersResolve implements Resolve<User[]> {

  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usersService.getUsers();
  }

}