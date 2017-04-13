import { Component, Input } from '@angular/core';

@Component({
    selector : 'form-passwords',
    styleUrls : ['form-passwords.component.scss'],
    template : `
    <div  [formGroup]="parent">
        <div class="form-group" formGroupName="passwords">
            <label for="password">Enter password:</label>
            <input type="password" class="form-control" formControlName="password">
        </div><!-- form-group -->
                <div 
                 class="bg-danger" 
                 *ngIf="strength">
                    Atleast 1 uppercase charcter 1 number and 5 characters min password length.
                </div><!--/errors -->

        <div class="form-group" formGroupName="passwords">
            <label for="confirm">Confirm password:</label>
            <input type="password" class="form-control" formControlName="confirm">
        </div><!-- form-group -->
                <div 
                 class="bg-danger" 
                 *ngIf="match">
                   Passwords dont match
                </div><!--/errors -->
    </div>  
    `
})
export class FormPasswordsComponent {

    @Input()
    parent;
    
    get strength(){
        return(
            this.parent.get('passwords.password').hasError('veakPassword')
             && this.parent.get('passwords.password').dirty
        );
    }

    get match(){
        return(
            this.parent.get('passwords.password').dirty &&
            this.parent.get('passwords.password').value.length === this.parent.get('passwords.confirm').value.length  &&
            this.parent.get('passwords').hasError('passwordMissmatch')
        );       
    }
}