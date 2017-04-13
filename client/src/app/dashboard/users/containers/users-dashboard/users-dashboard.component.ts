import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { EmailValidators } from '../../../../validators/email.validators';
import { PasswordValidators } from '../../../../validators/password.validators';

import { User } from '../../models/user.interface';
import { UsersService } from '../../users.service';

@Component({
    styleUrls: ['users-dashboard.component.scss'],
    template: `
        <div class="row">
            <div class="col-sm-8">
                <h3 class="text-center text-muted">Create a new user: </h3>

                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form novalidate [formGroup]="userForm" (ngSubmit)="onSubmit()">

                                <form-email [parent]="userForm"></form-email>

                                <form-passwords [parent]="userForm"></form-passwords>

                                <form-role [parent]="userForm"></form-role>

                                <hr />
                                        
                            <button type="submit" class="btn btn-info btn-block" [disabled]="userForm.invalid">Create User</button>
                            </form> 
                        </div>
                    </div> <!-- /.panel -->

            </div><!-- /.col-sm-8-->

            <div class="col-sm-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="text-center text-muted">All users: </h4>                       
                        </div>
                        <div class="panel-body">
                            <ul class="list-group">
                                <user-list
                                 *ngFor="let user of users"
                                 [user]="user">
                                </user-list>
                            </ul>
                        </div><!--/.panel-body-->
                    </div>
            
            </div><!-- /.col-sm-4-->

            <pre>
                 Form : {{ userForm.value | json }}
                 Valid : {{ userForm.valid }}
            </pre>

        </div>
    `
})
export class UsersDashboardComponent implements OnInit {

    users : User[];

    constructor(
        private fb: FormBuilder,
        private userService: UsersService,
        private route: ActivatedRoute
    ){}

    userForm = this.fb.group({
      email : ['', [Validators.required, EmailValidators.checkEmail ]],
      passwords : this.fb.group({
            password : ['', [Validators.required , PasswordValidators.passwordStrength]],
            confirm: ['', Validators.required]
        }, {validator : PasswordValidators.comparePassword}),
      role: 'editor'
    });

    ngOnInit(){
        this.route.data
        .subscribe((data: { users: User[] }) =>{
            this.users = data.users;
        });
    }

    onSubmit(){
        this.userService.registerNewUser(this.userForm.value)
        .subscribe((data : User) => {
            this.users = [data, ...this.users];
        });
        
        this.userForm.reset();
    }

}