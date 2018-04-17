import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tweet} from '../Tweet';
import {User} from '../User';
import {ApiService} from '../ApiService';
import {text} from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-startpagina',
  templateUrl: './startpagina.component.html',
  styleUrls: ['./startpagina.component.css'],
  providers: [ApiService]
})
export class StartpaginaComponent implements OnInit {

  _postsArray: Tweet[];
  _mentionsArray: Tweet[];
  _statisticssArray: User;
  errorMessage: string;
  content: string;
  name: string;
  tweet = new Tweet();
  id: number;
  idd: number;
  tekst: string;

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

  addFlag(idde: any): void {
    this.apiSerivce.addFlagWithObservable(idde)
      .subscribe( tweett => {
          this.getPosts();
          this.name = "Admin";
          tweett.id = idde;
          console.log('HET GESELECTEERDE ID' + idde);
          this.id = tweett.id;
        },
        error => this.errorMessage = <any>error);
  }

  addLike(idde: any): void {
    this.apiSerivce.addLikeWithObservable(idde)
      .subscribe( tweett => {
          this.getPosts();
          this.name = "Admin";
          tweett.id = idde;
          console.log('HET GESELECTEERDE ID' + idde);
          this.id = idde;
        },
        error => this.errorMessage = <any>error);
  }

  addTweet(): void {
    this.apiSerivce.addTweetWithObservable(this.tweet)
      .subscribe( tweett => {
          this.getPosts();
          this.name = "Admin";
          this.tekst = tweett.content.replace('t', 'T');
          console.log(this.tekst);
          tweett.content = this.tekst;
          this.content = tweett.content;
        },
        error => this.errorMessage = <any>error);
  }
}
