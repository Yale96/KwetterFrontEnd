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
  pictur: string;
  errorMessage: string;
  name: string;
  web: string;
  location: string;
  bio: string;
  profilearray: Profile[];
  constructor(private apiSerivce: ApiService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.apiSerivce.getProfile()
      .subscribe(
        resultArray => this.profilearray = resultArray,
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
