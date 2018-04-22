import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tweet} from '../Tweet';
import {User} from '../User';
import {HashTag} from '../HashTag';
import {ApiService} from '../ApiService';
import {text} from '@angular/core/src/render3/instructions';
import {AuthenticationService} from '../AuthenticationService';
import {Profile} from '../Profile';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-startpagina',
  templateUrl: './startpagina.component.html',
  styleUrls: ['./startpagina.component.css'],
  providers: [ApiService, AuthenticationService]
})
export class StartpaginaComponent implements OnInit {

  _postsArray: Tweet[] = [];
  tweetarray: Tweet[] = [];
  _mentionsArray: Tweet[];
  _matchesArray: Tweet[];
  tagsArray: HashTag[];
  stringsArray: string[];
  idArray: number[] = [];
  _statisticssArray: User;
  errorMessage: string;
  content: string;
  naampje = localStorage.getItem('currentUser');
  idtje = localStorage.getItem('userId');
  checkBoolLike: boolean;
  checkBoolFlag: boolean;
  profilearray: Profile;

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
          console.log("POST ARRAY:::::::::::::::: " + this._postsArray);
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
    this.apiSerivce.getMentions(this.naampje)
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

  checkLike(id: any): void {
    this.apiSerivce.checkLikeWithObservable(this.naampje, id)
      .subscribe(
        resultArray => this.checkBoolLike = resultArray,
        error => console.log("Error :: " + error)
      );
    console.log("BOOL LIKE:::: " + this.checkBoolLike);
  }

  checkFlag(id: any): void {
    this.apiSerivce.checkFlagWithObservable(this.naampje, id)
      .subscribe(
        resultArray => this.checkBoolFlag = resultArray,
        error => console.log("Error :: " + error)
      );
    console.log("BOOL FLAG:::: " + this.checkBoolFlag);
  }

  getStatistics(): void {
    this.apiSerivce.getStatistics(this.naampje)
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
    this.apiSerivce.addFlagWithObservable(this.naampje, idde)
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
    this.apiSerivce.followUserWithObservable(this.idtje, string)
      .subscribe( user => {
          this.getPosts();
          this.getStatistics();
        },
        error => this.errorMessage = <any>error);
  }

  addLike(idde: any): void {
    this.apiSerivce.addLikeWithObservable(this.naampje, idde)
      .subscribe( tweett => {
          this.getPosts();
          this.name = "Admin";
          tweett.id = idde;
          console.log('HET GESELECTEERDE ID' + idde);
          this.id = idde;
        },
        error => this.errorMessage = <any>error);
  }

  addTweet(string: string): void {
    string = string.replace('#', '%23');
    this.apiSerivce.addTweetWithObservable(string, this.naampje)
      .subscribe( tweett => {
          this.getPosts();
          this.getStatistics();
          this.getTrends();
          this.tweetarray.push(tweett);
          this.tweet = tweett
          this.checkFlag(tweett.id);
          this.checkLike(tweett.id);
          console.log("TWEETT::::: " + this.tweet);
        },
        error => this.errorMessage = <any>error);
    // this.checkFlag(naampje, 1);
    // this.checkLike(naampje, 1);
  }
}
