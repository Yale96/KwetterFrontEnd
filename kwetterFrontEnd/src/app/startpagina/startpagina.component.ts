import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tweet} from '../Tweet';
import {User} from '../User';
import {ApiService} from '../ApiService';

@Component({
  selector: 'app-startpagina',
  templateUrl: './startpagina.component.html',
  styleUrls: ['./startpagina.component.css'],
  providers: [ApiService]
})
export class StartpaginaComponent implements OnInit {

  _postsArray: Tweet[];
  _mentionsArray: Tweet[];
  _statisticssArray: User[];
  errorMessage: String;
  content: String;
  name: String;
  tweet = new Tweet();
  id: number;
  idd: number;

  constructor(private apiSerivce: ApiService) {
  }

  getPosts(): void {
    this.apiSerivce.getPosts()
      .subscribe(
        resultArray => this._postsArray = resultArray,
        error => console.log("Error :: " + error)
      );
  }

  getMentions(): void {
    this.apiSerivce.getMentions()
      .subscribe(
        resultArray => this._mentionsArray = resultArray,
        error => console.log("Error :: " + error)
      );
  }

  getStatistics(): void {
    this.apiSerivce.getStatistics()
      .subscribe(
        resultArray => this._statisticssArray = resultArray,
        error => console.log("Error :: " + error)
      );
  }

  ngOnInit(): void {
    this.getPosts();
    this.getMentions();
    this.getStatistics();
  }

  addFlag(idd): void {
    this.apiSerivce.addFlagWithObservable(this.tweet)
      .subscribe( tweett => {
          this.getPosts();
          this.name = "Admin";
          tweett.id = idd;
          this.id = tweett.id;
        },
        error => this.errorMessage = <any>error);
  }

  addLike(idd): void {
    this.apiSerivce.addLikeWithObservable(this.tweet)
      .subscribe( tweett => {
          this.getPosts();
          this.name = "Admin";
          tweett.id = idd;
          this.id = tweett.id;
        },
        error => this.errorMessage = <any>error);
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
