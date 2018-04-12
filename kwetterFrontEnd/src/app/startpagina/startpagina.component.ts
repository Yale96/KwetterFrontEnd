import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tweet} from '../Tweet';
import {ApiService} from '../ApiService';

@Component({
  selector: 'app-startpagina',
  templateUrl: './startpagina.component.html',
  styleUrls: ['./startpagina.component.css'],
  providers: [ApiService]
})
export class StartpaginaComponent implements OnInit {

  _postsArray: Tweet[];
  errorMessage: String;
  content: String;
  name: String;
  tweet = new Tweet();

  constructor(private apiSerivce: ApiService) {
  }

  getPosts(): void {
    this.apiSerivce.getPosts()
      .subscribe(
        resultArray => this._postsArray = resultArray,
        error => console.log("Error :: " + error)
      )
  }

  ngOnInit(): void {
    this.getPosts();
  }

  addTweet(): void {
    this.apiSerivce.addTweetWithObservable(this.tweet)
      .subscribe( tweett => {
          this.getPosts();
          this.name = "Admin";
          tweett.content = tweett.content.replace("#","%23")
          this.content = tweett.content;
        },
        error => this.errorMessage = <any>error);
  }
}
