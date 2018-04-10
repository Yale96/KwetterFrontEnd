import {Component, OnInit} from '@angular/core';
import {Profile} from '../Profile';
import {User} from '../User';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.html']
})
export class AuthenticationComponent {
  constructor(private http: HttpClient){}

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

  ngOnInit(): void {
    this.http.get('http://localhost:8080/Kwetter/resources/tweets').subscribe(data => {
      console.log(data);
    });
  }

}
