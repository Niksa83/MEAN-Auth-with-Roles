import { Component, Input } from '@angular/core';

@Component({
    selector : 'form-role',
    styleUrls : ['form-role.component.scss'],
    template : `

    <div [formGroup]="parent">
        <div class="radio">
            <label>
                <input type="radio" value="editor"  formControlName="role">
                Role: EDITOR
            </label>
        </div>
        <div class="radio">
            <label>
                <input type="radio"  value="admin" formControlName="role">
                Role: ADMIN
            </label>
        </div>
    </div>
    `
})
export class FormRoleComponent {

    @Input()
    parent;


}