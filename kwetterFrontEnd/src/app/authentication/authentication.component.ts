import {Component, OnInit} from '@angular/core';
import {Profile} from '../Profile';
import {User} from '../User';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.html']
})
export class AuthenticationComponent {

  model = new User('', '');


  submitted = false;

  onSubmit() { this.submitted = true; console.log(this.model); }

  newUser() {
    this.model = new User('', '');
    console.log('success');
  }

  onLogin() {
    window.location.href = '/profile';
  }

}
