import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Observables and RXJS operators needed (map, catch, throw)
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from './models/user.interface';

const USERS_API = 'http://localhost:3000/api/auth';

@Injectable()
export class UsersService {

  constructor (private http: Http) {}

  getUsers(): Observable<User[]> {

    let headers = new Headers({ 
    'Content-Type': 'application/json', 
    'Authorization' : localStorage.getItem('id_token') 
   });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(`${USERS_API}/users`, options)
      .map((res: Response) => {
        let body = res.json();
        return body.data || { };       
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  registerNewUser(userdata) :Observable<User> {

    let body = {
      email: userdata.email,
      password: userdata.passwords.password,
      role: userdata.role
    };
    let headers = new Headers({ 
    'Content-Type': 'application/json', 
    'Authorization' : localStorage.getItem('id_token') 
    });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`${USERS_API}/register`, body, options)
      .map((res: Response) => {
        let body = res.json();
        return body.user || { };       
      })
      .catch((error: any) => Observable.throw(error.json()));
  }


}