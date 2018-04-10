import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tweet} from '../Tweet';

@Component({
  selector: 'app-startpagina',
  templateUrl: './startpagina.component.html',
  styleUrls: ['./startpagina.component.css']
})
export class StartpaginaComponent implements OnInit {

  constructor(private http: HttpClient){}

  tweet = new Tweet('');

  ngOnInit() {
  }

  postTweet(){
    var body = "Name=" + 'admin' + "content=" + 'Testman';
    this.http.post("http://localhost:8080/Kwetter/resources/tweets/post", body).subscribe((data) => {});
    };


}
