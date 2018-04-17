import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tweet} from '../Tweet';
import {Profile} from '../Profile';
import {ApiService} from '../ApiService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ApiService]
})
export class ProfileComponent implements OnInit {

  profile = new Profile();
  _postsArray: Tweet[];
  stringsArray: string[];
  pictur: string;
  namesArray: string[];
  errorMessage: string;
  name: string;
  id: number;
  tweet = new Tweet();
  web: string;
  location: string;
  bio: string;
  profilearray: Profile;
  tweetArray: Tweet;
  constructor(private apiSerivce: ApiService) {}

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
          this.name = "Admin";
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

  editProfilePicture(): void  {
    this.apiSerivce.editProfilePictureWithObservable(this.profile)
      .subscribe( profilee => {
          profilee.picture = this.pictur;
        },
        error => this.errorMessage = <any>error);
  }

  editProfileName(): void  {
    this.apiSerivce.editProfileNameWithObservable(this.profile)
      .subscribe( profilee => {
          profilee.name = this.name;
        },
        error => this.errorMessage = <any>error);
  }

  editProfileWeb(): void  {
    this.apiSerivce.editProfileWebWithObservable(this.profile)
      .subscribe( profilee => {
          profilee.web = this.web;
        },
        error => this.errorMessage = <any>error);
  }

  editProfileLocatie(): void  {
    this.apiSerivce.editProfileLocatieWithObservable(this.profile)
      .subscribe( profilee => {
          profilee.location = this.location;
        },
        error => this.errorMessage = <any>error);
  }

  editProfileBio(): void  {
    this.apiSerivce.editProfileBiographyWithObservable(this.profile)
      .subscribe( profilee => {
          profilee.bio = this.bio;
        },
        error => this.errorMessage = <any>error);
  }

  boom(): void {
    this.editProfileBio();
    this.editProfileLocatie();
    this.editProfileName();
    this.editProfileWeb();
    this.editProfilePicture();
  }
}
