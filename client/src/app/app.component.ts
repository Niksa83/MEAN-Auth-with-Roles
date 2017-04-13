import { Component } from '@angular/core';
import { User } from './auth/models/user.interface';
import { AuthService } from './auth/auth.service';

import { LoginComponent } from './login/containers/login/login.component';

interface Nav {
  link: string,
  name: string,
  exact:boolean
}

@Component({
  selector: 'app-root',
  template: `
 <div class="container">

    <nav class="navbar navbar-default" *ngIf="authService.isLoggedIn()">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Admin interface</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
              <li 
              *ngFor="let item of nav"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{exact: item.exact}">
                  <a [routerLink]="item.link">{{item.name}}</a>
              </li>
            <li
            *ngIf="user && user.role == 'admin'"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{exact: true}">
              <a routerLink="/dashboard/users">
              Manage Users</a> 
            </li> 
          </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="" (click)="logOut(); false">Log Out</a></li>
        </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

     <router-outlet
     (activate)="onActivate($event)"
     ></router-outlet>
</div> 
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user:User;

  constructor(private authService: AuthService){}

  nav : Nav[] = [
    {
      link : '/dashboard',
      name : 'Home',
      exact : true
    },
    {
      link : '/dashboard/categories',
      name : 'Categories',
      exact : true
    }
  ];
  
/*
  ngOnInit(){
  //  this.user = JSON.parse(localStorage.getItem('profile'));
  } */

  logOut(){
    this.authService.logout();
    this.user = null;
  }

  onActivate(event){
    if(!(event instanceof LoginComponent) && !this.user) {
        this.user = this.user = JSON.parse(localStorage.getItem('profile'));
    }
  }

}
