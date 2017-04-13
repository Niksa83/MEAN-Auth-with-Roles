import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// containers
import { WelcomePageComponent } from './containers/welcome-page/welcome-page.component';

import { AuthGuard } from '../../auth/auth.guard';

export const ROUTES: Routes = [
  {
    path: 'dashboard',
    component: WelcomePageComponent,
    canActivate : [AuthGuard]
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    WelcomePageComponent
  ],
  providers : [
 
  ]
})
export class WelcomeModule {}
