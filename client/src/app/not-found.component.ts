import { Component } from '@angular/core';

@Component({
    template: `
  <div class="jumbotron">
    <h1>404 Page not found sorry</h1> 
    <p>Go back to home page <a routerLink="/">here</a></p> 
  </div>

    `
})
export class NotFoundComponent {

}