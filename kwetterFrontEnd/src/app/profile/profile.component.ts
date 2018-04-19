import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tweet} from '../Tweet';
import {Profile} from '../Profile';
import {ApiService} from '../ApiService';
import {AuthenticationService} from '../AuthenticationService';

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
  profilearray: Profile;
  tweetArray: Tweet;
  constructor(private apiSerivce: ApiService, private authenticationService: AuthenticationService) {
  }

  logout() {
    this.authenticationService.logout();
  }


  ngOnInit() {
    this.getProfile();
    this.getRecenteTweet();
    this.getTweetsByUserId();
    this.getFollowingUsers();
  }

  getProfile(): void {
    this.apiSerivce.getProfile()
      .subscribe(
        resultArray => this.profilearray = resultArray,
        error => console.log("Error :: " + error)
      );
  }

  getRecenteTweet(): void {
    this.apiSerivce.getRecent()
      .subscribe(
        resultArray => this.tweetArray = resultArray,
        error => console.log("Error :: " + error)
      );
  }

  remove(idd): void {
    this.apiSerivce.removeTweetWithObservable(this.tweet)
      .subscribe( tweett => {
          this.namee = "Admin";
          tweett.id = idd;
          console.log('HET GESELECTEERDE ID' + idd);
          this.id = tweett.id;
        },
        error => this.errorMessage = <any>error);
  }

  getFollowingUsers(): void {
    this.apiSerivce.getFollowing()
      .subscribe(
        resultArray => this.stringsArray = resultArray,
        error => console.log("Error :: " + error)
      );
  }

  getTweetsByUserId(): void {
    this.apiSerivce.getByUserId()
      .subscribe(
        resultArray => this._postsArray = resultArray,
        error => console.log("Error :: " + error)
      );
  }

  editProfilePicture(string: any): void  {
    this.apiSerivce.editProfilePictureWithObservable(string)
      .subscribe( profilee => {
          profilee.picture = string;
          this.picture = profilee.picture;
        },
        error => this.errorMessage = <any>error);
  }

  editProfileName(string: any): void  {
    this.apiSerivce.editProfileNameWithObservable(string)
      .subscribe( profilee => {
          profilee.name = string;
          this.namee = profilee.name;
        },
        error => this.errorMessage = <any>error);
  }

  editProfileWeb(string: any): void  {
    this.apiSerivce.editProfileWebWithObservable(string)
      .subscribe( profilee => {
          profilee.web = string;
          this.web = profilee.web;
        },
        error => this.errorMessage = <any>error);
  }

  editProfileLocatie(string: any): void  {
    this.apiSerivce.editProfileLocatieWithObservable(string)
      .subscribe( profilee => {
          profilee.location = string + ', Netherlands';
          this.location = profilee.location;
        },
        error => this.errorMessage = <any>error);
  }

  editProfileBio(string: any): void  {
    this.apiSerivce.editProfileBiographyWithObservable(string)
      .subscribe( profilee => {
          profilee.bio = string;
          this.bio = profilee.bio;
        },
        error => this.errorMessage = <any>error);
  }
}
