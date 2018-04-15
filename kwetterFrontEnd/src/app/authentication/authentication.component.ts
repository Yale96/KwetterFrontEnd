import {Component, OnInit} from '@angular/core';
import {Profile} from '../Profile';
import {User} from '../User';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.html']
})
export class AuthenticationComponent implements OnInit{
  constructor(private http: HttpClient) {}

  user = new User();

  onSubmit() { }

  newUser() {
    this.user = new User();
    console.log('success');
  }

  onLogin() {
    window.location.href = '/startpagina';
  }

  ngOnInit() {
  }
}
