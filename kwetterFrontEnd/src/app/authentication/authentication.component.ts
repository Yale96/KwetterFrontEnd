import {Component, OnInit} from '@angular/core';
import {Profile} from '../Profile';
import {User} from '../User';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../ApiService';
import { Router } from '@angular/router';
import {AuthenticationService} from '../AuthenticationService';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.html'],
  providers: [AuthenticationService, ApiService]
})
export class AuthenticationComponent implements OnInit {

  errorMessage: string;

  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private apiSerive: ApiService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    console.log('Stored User Id ' + localStorage.getItem('userId') + ' Stored User name ' + localStorage.getItem('currentUser') + ' Stored token ' + localStorage.getItem('token'));
    this.apiSerive.subscribee();
  }

  login(username: string, password: string) {
    this.loading = true;
    this.authenticationService.findId(username)
      .subscribe(result => {
        if (result !== null) {
          // login successful
          //window.location.href = '/startpagina';
          console.log('RESULT::::::' + result);
          localStorage.setItem('userId', result.toString());
          console.log('Stored User Id ' + localStorage.getItem('userId') + ' Stored User name ' + localStorage.getItem('currentUser') + ' Stored token ' + localStorage.getItem('token'));
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });

    this.authenticationService.login(username, password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          window.location.href = '/startpagina';
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }

  registerUser(name: any, password: any): void  {
    this.apiSerive.addUserWithObservable(name, password)
      .subscribe( profilee => {
        },
        error => this.errorMessage = <any>error);
  }
}
