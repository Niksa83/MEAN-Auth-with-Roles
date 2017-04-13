import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Category } from './models/category.interface';

// Observables and RXJS operators needed (map, catch, throw)
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const CATEGORIES_API = 'http://localhost:3000/api/categories';

@Injectable()
export class CategoriesService {

  constructor (private http: Http) {}

  getCategories(): Observable<Category[]> {

    let headers = new Headers({ 
    'Content-Type': 'application/json', 
    'Authorization' : localStorage.getItem('id_token') 
   });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(CATEGORIES_API, options)
      .map((res: Response) => {
        let body = res.json();
        return body.data || { };       
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  createCategory(category:Category): Observable<Category> {

      let body = category;
      let headers = new Headers({ 
        'Content-Type': 'application/json', 
        'Authorization' : localStorage.getItem('id_token') 
      }); 
      let options = new RequestOptions({ headers: headers });

      return this.http.post(CATEGORIES_API, body, options)
                      .map(res => {
                        let body = res.json();
                        return body.category;
                      })
                      .catch((error: any) => Observable.throw(error.json()));    
  }


  deleteCategory(category:Category){

      let headers = new Headers({ 
        'Content-Type': 'application/json', 
        'Authorization' : localStorage.getItem('id_token') 
      }); 
      let options = new RequestOptions({ headers: headers });
      return this.http
        .delete(`${CATEGORIES_API}/${category._id}`, options)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()));
  }





    
}