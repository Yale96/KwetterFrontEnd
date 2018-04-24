import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tweet} from '../Tweet';
import {Profile} from '../Profile';
import {ApiService} from '../ApiService';
import {AuthenticationService} from '../AuthenticationService';
import {User} from '../User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ApiService, AuthenticationService]
})
export class ProfileComponent implements OnInit {

  profile = new Profile();
  _postsArray: Tweet[];
  stringsArray: string[];
  picture: string;
  namesArray: string[];
  errorMessage: string;
  namee: string;
  id: number;
  tweet = new Tweet();
  web: string;
  location: string;
  bio: string;
  _statisticssArray: User;
  profilearray: Profile;
  tweetArray: Tweet;
  naampje = localStorage.getItem('currentUser');
  idtje = localStorage.getItem('userId');

  constructor(private apiSerivce: ApiService, private authenticationService: AuthenticationService) {
    this.naampje = this.naampje.replace(/"/g, "");
  }

  logout() {
    this.authenticationService.logout();
  }


  ngOnInit() {
    this.getProfile();
    this.getRecenteTweet();
    this.getTweetsByUserId();
    this.getFollowingUsers();
    this.getStatistics();
    console.log('Stored User Id ' + localStorage.getItem('userId') + ' Stored User name ' + localStorage.getItem('currentUser') + ' Stored token ' + localStorage.getItem('token'));
  }

  getStatistics(): void {
    this.apiSerivce.getStatistics(this.naampje).subscribe(data => {
      console.log('DATA::::::::::: ' + data);
      this._statisticssArray = data;
      console.log('DATA::::::::::: ' + this._statisticssArray.username + ', ' + this._statisticssArray.tweetsCount);
    });
  }

  getProfile(): void {
    this.apiSerivce.getProfile(this.naampje)
      .subscribe(
        resultArray => this.profilearray = resultArray,
        error => console.log("Error : " + error)
      );
  }

  getRecenteTweet(): void {
    this.apiSerivce.getRecent(this.idtje)
      .subscribe(
        resultArray => this.tweetArray = resultArray,
        error => console.log("Error :: " + error)
      );
    this.getStatistics();
  }

  remove(idd): void {
    this.apiSerivce.removeTweetWithObservable(idd)
      .subscribe( tweett => {
          this.namee = "Admin";
          tweett.id = idd;
          console.log('HET GESELECTEERDE ID' + idd);
          this.id = tweett.id;
          this.getStatistics();
          this.getTweetsByUserId();
        },
        error => this.errorMessage = <any>error);
  }

  getFollowingUsers(): void {
    this.apiSerivce.getFollowing(this.idtje)
      .subscribe(
        resultArray => this.stringsArray = resultArray,
        error => console.log("Error :: " + error)
      );
    this.getStatistics();
  }

  getTweetsByUserId(): void {
    this.apiSerivce.getByUserId(this.idtje)
      .subscribe(
        resultArray => this._postsArray = resultArray,
        error => console.log("Error :: " + error)
      );
    this.getStatistics();
  }

  editProfileName(string: any): void  {
    this.apiSerivce.editProfileNameWithObservable(this.idtje, string)
      .subscribe( profilee => {
          profilee.name = string;
          this.namee = profilee.name;
        },
        error => this.errorMessage = <any>error);
  }

  editProfileWeb(string: any): void  {
    this.apiSerivce.editProfileWebWithObservable(this.idtje, string)
      .subscribe( profilee => {
          profilee.web = string;
          this.web = profilee.web;
        },
        error => this.errorMessage = <any>error);
  }

  editProfilePicture(string: any): void  {
    this.apiSerivce.editProfilePictureWithObservable(this.idtje, string)
      .subscribe( profilee => {
          profilee.web = string;
          this.web = profilee.web;
        },
        error => this.errorMessage = <any>error);
  }

  unFollowUser(string: any): void {
    this.apiSerivce.unfollowUserWithObservable(this.idtje, string)
      .subscribe( user => {
          this.getFollowingUsers();
          this.getStatistics();
        },
        error => this.errorMessage = <any>error);
    this.getFollowingUsers();
  }

  editProfileLocatie(string: any): void  {
    this.apiSerivce.editProfileLocatieWithObservable(this.idtje, string)
      .subscribe( profilee => {
          profilee.location = string + ', Netherlands';
          this.location = profilee.location;
        },
        error => this.errorMessage = <any>error);
  }

  editProfileBio(string: any): void  {
    this.apiSerivce.editProfileBiographyWithObservable(this.idtje, string)
      .subscribe( profilee => {
          profilee.bio = string;
          this.bio = profilee.bio;
        },
        error => this.errorMessage = <any>error);
  }
}
