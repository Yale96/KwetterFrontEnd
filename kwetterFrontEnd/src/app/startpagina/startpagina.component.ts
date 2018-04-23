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
  usert: User;
  errorMessage: string;
  content: string;
  naampje = localStorage.getItem('currentUser');
  idtje = localStorage.getItem('userId');
  checkBoolLike: boolean;
  checkBoolFlag: boolean;
  checkBoolFollow: boolean;
  profilearray: Profile;



  t = new Tweet();
  tweetjes: Observable<Tweet>;
  name: string;
  user = new User();
  tweett: Tweet;
  tweet = new Tweet();
  tweettt: Tweet;
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
    this.getStatistics();
  }

  getSingle(): Tweet {
    this.apiSerivce.getSingle().subscribe(data => {
      console.log('DATA::::::::::: ' + data);
      this.tweett = data;
      console.log('DATA::::::::::: ' + this.tweett.owner + ', ' + this.tweett.id);
    });
    return this.tweett;
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

  checkLike(id: any): boolean {
    this.apiSerivce.checkLikeWithObservable(this.naampje, id)
      .subscribe(
        resultArray => this.checkBoolLike = resultArray,
        error => console.log("Error :: " + error)
      );
    console.log("BOOL LIKE:::: " + this.checkBoolLike);
    return this.checkBoolLike;
  }

  checkFlag(id: any): boolean {
    this.apiSerivce.checkFlagWithObservable(this.naampje, id)
      .subscribe(
        resultArray => this.checkBoolFlag = resultArray,
        error => console.log("Error :: " + error)
      );
    console.log("BOOL FLAG:::: " + this.checkBoolFlag);
    return this.checkBoolFlag;
  }

  getStatistics(): void {
    this.apiSerivce.getStatistics(this.naampje).subscribe(data => {
      console.log('DATA::::::::::: ' + data);
      this.usert = data;
      console.log('DATA::::::::::: ' + this.usert.username + ', ' + this.usert.tweetsCount);
    });
  }

  ngOnInit(): void {
    this.getPosts();
    this.getMentions();
    this.getStatistics();
    this.getTagss();
    this.getTrends();
    this.getPostss();
    this.getSingle();
    console.log('Stored User Id ' + localStorage.getItem('userId') + ' Stored User name ' + localStorage.getItem('currentUser') + ' Stored token' + localStorage.getItem('token'));
  }

  checkFollow(string: string): void{
    if(this.naampje === string)
    {
      this.checkBoolFollow = false;
    }
    else
      this.checkBoolFollow = true;
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
          this.tweettt = this.getSingle();
          this.getPosts();
          this.getStatistics();
          this.getTrends();
          this.checkFollow(this.tweettt.owner);
          console.log('TWEETTT::::' + this.tweettt);
        },
        error => this.errorMessage = <any>error);
        console.log('T ID::::::::: ' + this.tweettt.id);
        console.log('T OWNER::::::::: ' + this.tweettt.owner);
        this.checkLike(this.tweettt.id);
        this.checkFlag(this.tweettt.id);
        this.checkFollow(this.tweettt.owner);
        console.log('BOOL FOLLOW::::::::: ' + this.checkBoolFollow);
  }
}
