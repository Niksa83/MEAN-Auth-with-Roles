import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'login-email',
    styleUrls : ['login-email.component.scss'],
    template: `
        <div class="form-group" [formGroup]="parent">
            <label for="email">Email address</label>
            <input type="email" placeholder="email@example.com" formControlName="email" class="form-control">
        </div><!-- form-group -->
                <div 
                 class="bg-danger" 
                 *ngIf="invalid">
                    Name is required
                </div><!--/errors -->
                <div 
                 class="bg-danger" 
                 *ngIf="email">
                    Not a valid E-mail adress!
                </div><!--/errors -->
    `
})
export class LoginEmailComponent{

 @Input()
 parent: FormGroup;

 get invalid(){
   return (
       this.parent.get('email').touched 
       && this.parent.get('email').hasError('required')
   );
 }

 get email(){
   return (
       this.parent.get('email').touched 
       && this.parent.get('email').hasError('invalidEmail')
   );
 }

}