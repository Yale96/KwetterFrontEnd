import {Component, OnInit} from '@angular/core';
import {Profile} from './Profile';
import {User} from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  model = new User('', '');

  submitted = false;

  onSubmit() { this.submitted = true; console.log("submittedd")}

  newUser() {
    this.model = new User('', '');
    console.log('success');
}
}
