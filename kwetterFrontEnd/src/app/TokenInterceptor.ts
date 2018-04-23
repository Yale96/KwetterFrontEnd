import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {SessionCheckService} from './SessionCheckService';
import {AuthenticationService} from './AuthenticationService';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string
  sessionCheckservice: SessionCheckService;
  authService: AuthenticationService;
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // && this.sessionCheckservice.validate(this.authService.getToken())
    if (localStorage.getItem('token') !== null) {
      console.log('IN TOKEN INTERCEPTOR::::::: ' + req)
      this.token = localStorage.getItem('token');
      this.token = this.token.replace(/"/g, "");
      const returnReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token)
      });
      return next.handle(returnReq);
    } else {
      this.authService.logout();
      return next.handle(req);
    }
  }
}
