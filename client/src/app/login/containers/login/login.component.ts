import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EmailValidators } from '../../../validators/email.validators';

import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'login-component',
  styleUrls:['login.component.scss'],
  template : `
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h1 class="text-center text-muted">Log In</h1>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Welcome</h3>
        </div>
        <div class="panel-body">

          <form novalidate [formGroup]="form" (ngSubmit)="onSubmit()">

               <login-email
               [parent]="form">
               </login-email>

               <login-password
               [parent]="form">
               </login-password>


          <button type="submit" class="btn btn-info btn-block" [disabled]="form.invalid">Log In!</button>
          </form>    

        </div>
      </div><!-- /.panel-default -->
      <h3  class="bg-danger text-center"
            *ngIf="errMsg">               
          {{errMsg}}
      </h3>   
    <!--  <pre>
          Form : {{ form.value | json }}
          {{ form.get('email').errors | json }}
            Form status {{ form.status }} 
      </pre> -->

      </div> <!-- /.col-md-8 col-md-offset-2 -->
    </div><!-- /.row -->
  `
})
export class LoginComponent implements OnInit {

  private errMsg:string;

    constructor(
        private fb: FormBuilder,
        private authService : AuthService,
        private router: Router
    ){}

    ngOnInit(){

    }

    form = this.fb.group({
      email : ['', [Validators.required, EmailValidators.checkEmail]],
      password : ['', Validators.required]
    });

    onSubmit(){
      
      this.authService.login(this.form.value)
      .subscribe(
      (data) => {
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('profile', JSON.stringify(data.user));
        this.router.navigate(['/dashboard']);
      },
      (error) => { this.errMsg = `${error._body}- ${error.status}` });

      this.form.get('password').patchValue('');
      //this.form.reset();
    }


}