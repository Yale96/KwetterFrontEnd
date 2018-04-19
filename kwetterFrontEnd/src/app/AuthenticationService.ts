import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import * as JWT from 'jwt-decode';

@Injectable()
export class AuthenticationService {
  public token: string;
  public  onlyToken: string;
  public decoded: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    //this.onlyToken = currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:8080/Kwetter/resources/users/login?login=' + username + '&password=' + password + '', JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.text();
        console.log(token);
        if (token) {
          // set token property
          this.token = token;
          console.log('THIS TOKEN: ' + this.token);

          this.decoded = JWT(token);
          console.log("DECODED::::::::: " + this.decoded)
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username}));
          localStorage.setItem('token', JSON.stringify({token: token}));
          console.log('CURRENT USER:::::' + localStorage.getItem('currentUser'));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
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
  }
}
