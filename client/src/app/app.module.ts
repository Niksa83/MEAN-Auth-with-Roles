import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes, PreloadAllModules } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// custom modules
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { WelcomeModule } from './dashboard/welcome/welcome.module';

import { NotFoundComponent } from './not-found.component';

import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

import { DialogService } from './dashboard/dialog.service';


export const ROUTES: Routes = [
  {path : '', redirectTo: '/dashboard', pathMatch: 'full'},
  // note - preload only works on modules that don't have canLoad
  { path: 'dashboard/categories', loadChildren: './dashboard/categories/categories.module#CategoriesModule' }, 
  { path: 'dashboard/users', canLoad:[AuthGuard, RoleGuard], loadChildren: './dashboard/users/users.module#UsersModule' }, 
  {path : '**', component: NotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    LoginModule,
    WelcomeModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
