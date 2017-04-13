import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { GuestGuard } from './guest.guard';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  providers: [
    AuthService,
    AuthGuard,
    RoleGuard,
    GuestGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AuthModule {}
