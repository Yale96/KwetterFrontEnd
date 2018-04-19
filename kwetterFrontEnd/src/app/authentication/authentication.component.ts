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
  providers: [AuthenticationService]
})
export class AuthenticationComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login(username: string, password: string) {
    this.loading = true;
    this.authenticationService.login(username, password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          //window.location.href = '/startpagina';
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
}
