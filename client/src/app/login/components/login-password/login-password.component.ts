import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'login-password',
    styleUrls : ['login-password.component.scss'],
    template: `
        <div class="form-group" [formGroup]="parent">
                <label for="password">Enter password:</label>
                <input type="password" placeholder="password" formControlName="password" class="form-control">
            </div><!-- form-group -->
                  <div 
                   class="bg-danger" 
                   *ngIf="invalid">
                    Pasword is required
                  </div><!--/errors -->
    `
})
export class LoginPaswordComponent{

 @Input()
 parent: FormGroup;

 get invalid(){
   return (
       this.parent.get('password').touched 
       && this.parent.get('password').hasError('required')
   );
 }



}