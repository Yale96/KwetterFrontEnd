import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import {ApiService} from './ApiService';

@Injectable()
export class AuthenticationService {
  public token: string;
  public  onlyToken: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(userName: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:8080/Kwetter/resources/users/login?login=' + userName + '&password=' + password + '', JSON.stringify({username: userName, password: password}))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.text();
        console.log(token);
        if (token) {
          // set token property
          this.token = token;
          console.log('THIS TOKEN: ' + this.token);

          // store username and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('userId', JSON.stringify({n}));
          localStorage.setItem('currentUser', JSON.stringify(userName.toString()));
          localStorage.setItem('token', JSON.stringify(token.toString()));
          console.log('Stored User Id ' + localStorage.getItem('userId') + ' Stored User name ' + localStorage.getItem('currentUser') + ' Stored token ' + localStorage.getItem('token'));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  findId(name: string): Observable<number> {
    return this.http.get('http://localhost:8080/Kwetter/resources/users/byname?name=' + name + '', JSON.stringify({username: name}))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let x = response.json();
        console.log('IN FIND:::::::::::' + x);
        if (x) {
          // set token property
          // return true to indicate successful login
          return x;
        } else {
          // return false to indicate failed login
          return 0;
        }
      });
  }


  getToken(): string{
    return localStorage.getItem('token');
  }


  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
