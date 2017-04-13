import { Component, Input } from '@angular/core';

@Component({
    selector: 'user-list',
    styleUrls: ['user-list.component.scss'],
    template: `
        <li class="list-group-item">{{user.email}} - <strong>{{user.role}}</strong></li>    
    `
})
export class UserListComponent{

 @Input()
  user;

  
}