import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient){}

  ngOnInit() {
  }

  postTweet(){
    this.http.post('http://localhost:8080/Kwetter/resources/tweets/post', 'Name: Admin, Content: Test').subscribe(data => {
      console.log(data);
    });
  }

}
