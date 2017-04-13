import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// container
import { LoginComponent } from './containers/login/login.component';

// components
import { LoginEmailComponent } from './components/login-email/login-email.component';
import { LoginPaswordComponent } from './components/login-password/login-password.component';

import { GuestGuard } from '../auth/guest.guard';

export const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    LoginComponent,
    LoginEmailComponent,
    LoginPaswordComponent
  ]
})
export class LoginModule {}
