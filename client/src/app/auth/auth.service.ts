import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { tokenNotExpired } from 'angular2-jwt';

import { User } from './models/user.interface';

@Injectable()
export class AuthService {

  private authUrl = 'http://localhost:3000/api/auth/';

  constructor(private http: Http, private router: Router) { }

 /* checkPermissions() {
    const user = JSON.parse(localStorage.getItem('profile')) as User;
    return Observable.of(user.role === "admin");
  }
  */

  isLoggedIn() {
     return tokenNotExpired();
  }

  verifyUser() : Observable<boolean>{

    // grab the user from strorage
      let user = JSON.parse(localStorage.getItem('profile')) as User;
      // make a call to  API route to retrieve user from DB (or just his role)
      let body = { _id: user._id };
      let headers = new Headers({ 
      'Content-Type': 'application/json', 
      'Authorization' : localStorage.getItem('id_token') 
      });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(`${this.authUrl}/role`, body, options)
        .map((res : Response) => res.json())
        .map((res) => {
           if ( res.data.role === 'admin') return true;
           return false;
        })
        .catch((error: any) => Observable.throw(error.json()))

  }

  login(credentials) {
    let body = { email: credentials.email, password: credentials.password };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.authUrl}/login`, body, options)
      .map(res => res.json());
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/login']);
  }



}
