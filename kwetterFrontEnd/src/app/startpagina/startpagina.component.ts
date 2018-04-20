import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tweet} from '../Tweet';
import {User} from '../User';
import {HashTag} from '../HashTag';
import {ApiService} from '../ApiService';
import {text} from '@angular/core/src/render3/instructions';
import {AuthenticationService} from '../AuthenticationService';

@Component({
  selector: 'app-startpagina',
  templateUrl: './startpagina.component.html',
  styleUrls: ['./startpagina.component.css'],
  providers: [ApiService, AuthenticationService]
})
export class StartpaginaComponent implements OnInit {

  _postsArray: Tweet[] = [];
  _mentionsArray: Tweet[];
  _matchesArray: Tweet[];
  tagsArray: HashTag[];
  stringsArray: string[];
  _statisticssArray: User;
  errorMessage: string;
  content: string;
  naampje = localStorage.getItem('currentUser');
  checkBoolLike: boolean;
  checkBoolFlag: boolean;

  name: string;
  user = new User();
  tweet = new Tweet();
  id: number;

  constructor(private apiSerivce: ApiService, private authenticationService: AuthenticationService) {
    this.naampje = this.naampje.replace(/"/g, "");
  }

  logout() {
    this.authenticationService.logout();
  }

  getPosts(): void {
    this.apiSerivce.getPosts()
      .subscribe(
        (tweets) => {
          this._postsArray = tweets;
        },
          error => console.log("Error :: " + error)
      );
  }

  getPostss(): void {
    this.apiSerivce.getPostss()
      .subscribe(
        (tweets) => {
          this._postsArray = tweets;
        },

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

  getTrends(): void {
    this.apiSerivce.getTrendss()
      .subscribe(
        resultArray => this.stringsArray = resultArray,
        error => console.log("Error :: " + error)
      );
  }

  getTagss(): void {
    this.apiSerivce.getTagss()
      .subscribe(
        resultArray => this.tagsArray = resultArray,
        error => console.log("Error :: " + error)
      );
  }

  getByMatchs(string: any): void {
    this.apiSerivce.getMatches(string)
      .subscribe(
        resultArray => this._matchesArray = resultArray,
        error => console.log("Error :: " + error)
      );
  }

  checkLike(string: any, id: any): boolean {
    this.apiSerivce.checkLikeWithObservable(string, id)
      .subscribe(
        resultArray => this.checkBoolLike = resultArray,
        error => console.log("Error :: " + error)
      );
    return this.checkBoolLike;
  }

  checkFlag(string: any, id: any): boolean {
    this.apiSerivce.checkFlagWithObservable(string, id)
      .subscribe(
        resultArray => this.checkBoolFlag = resultArray,
        error => console.log("Error :: " + error)
      );
    return this.checkBoolFlag;
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
    this.getTagss();
    this.getTrends();
    this.getPostss();
    console.log('Stored User Id ' + localStorage.getItem('userId') + ' Stored User name ' + localStorage.getItem('currentUser') + ' Stored token' + localStorage.getItem('token'));
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

  followUser(string: any): void {
    this.apiSerivce.followUserWithObservable(string)
      .subscribe( user => {
          this.getPosts();
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

  addTweet(string: string, test: any): void {
    string = string.replace('#', '%23');
    this.apiSerivce.addTweetWithObservable(string, this.naampje)
      .subscribe( tweett => {
          this.getPosts();
        },
        error => this.errorMessage = <any>error);
    // this.checkFlag(naampje, 1);
    // this.checkLike(naampje, 1);
  }
}
