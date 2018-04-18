import {Component, OnInit} from '@angular/core';
import {Profile} from '../Profile';
import {User} from '../User';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../AuthService';
import {ApiService} from '../ApiService';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.html'],
  providers: [AuthService]
})
export class AuthenticationComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}

  user = new User();

  onSubmit() { }

  newUser() {
    this.user = new User();
    console.log('success');
  }

  onLogin() {

  }

  logout()
  {
    this.authService.logout();
  }

  login(stringOne: any, stringTwo: any) {
    if (stringOne !== '' && stringTwo !== '') {
      this.authService.login(stringOne, stringTwo)
        .subscribe(
          () => {
            console.log("User is logged in");
            window.location.href = '/startpagina';
          }
        );
    }
  }

  ngOnInit() {
  }
}
