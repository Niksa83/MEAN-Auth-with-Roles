import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// containers
import { UsersDashboardComponent } from './containers/users-dashboard/users-dashboard.component';
// components
import { FormEmailComponent } from './components/form-email/form-email.component';
import { FormPasswordsComponent } from './components/form-passwords/form-passwords.component';
import { FormRoleComponent } from './components/form-role/form-role.component';
import { UserListComponent } from './components/user-list/user-list.component';

// service
import { UsersService } from './users.service';

// resolve
import { UsersResolve } from './containers/users-dashboard/users-dashboard.resolve';

export const ROUTES: Routes = [
  {
    path: '',
    component: UsersDashboardComponent,
        resolve: {
          users : UsersResolve
        },
  },

];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    UsersDashboardComponent,
    FormEmailComponent,
    FormPasswordsComponent,
    FormRoleComponent,
    UserListComponent
  ],
  providers : [
    UsersService,
    UsersResolve
  ]
})
export class UsersModule {}
