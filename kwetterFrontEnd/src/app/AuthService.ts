import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './User';
import * as moment from 'angular2-moment/moment.module';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string ) {
    return this.http.post<User>('http://localhost:8080/Kwetter/resources/users/login?login=' + username + '&password=' + password + '', {username, password})
      .do(res => this.setSession)
      .shareReplay();
  }

  private setSession(authResult) {
    const expiresAt = authResult.expiresat;

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('name_token', authResult.nameToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    console.log(authResult.idToken);
    console.log(authResult.nameToken);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
  }
}
