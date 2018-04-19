import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {Tweet} from "./tweet";
import {User} from './User';
import { Headers, RequestOptions } from '@angular/http';
import {Profile} from './Profile';
import {HashTag} from './HashTag';

@Injectable()
export class ApiService {

  private _postsURL = "http://localhost:8080/Kwetter/resources/tweets";
  private addURL = "http://localhost:8080/Kwetter/resources/tweets/post?name=Admin&content=";
  private getMentionsUrl = "http://localhost:8080/Kwetter/resources/tweets/mentionname?name=Admin";
  private getUser = "http://localhost:8080/Kwetter/resources/users/single?name=Admin";
  private flagTweet = "http://localhost:8080/Kwetter/resources/tweets/flag?name=Admin&tweetId=";
  private likeTweet = "http://localhost:8080/Kwetter/resources/tweets/like?name=Admin&tweetId=";
  private editProfile = "http://localhost:8080/Kwetter/resources/profiles/edit";
  private editPicture = "http://localhost:8080/Kwetter/resources/profiles/edit/picture?id=1&toEdit=";
  private editUsername = "http://localhost:8080/Kwetter/resources/profiles/edit/name?id=1&toEdit=";
  private editWeb = "http://localhost:8080/Kwetter/resources/profiles/edit/web?id=1&toEdit=";
  private editLocatie = "http://localhost:8080/Kwetter/resources/profiles/locatie/picture?id=1&toEdit=";
  private editBio = "http://localhost:8080/Kwetter/resources/profiles/edit/bio?id=1&toEdit=";
  private getProfileByName = "http://localhost:8080/Kwetter/resources/users/getProfileByName?name=Admin";
  private getRecentTweet = "http://localhost:8080/Kwetter/resources/tweets/userid/recent?id=2";
  private getTweetByUserId = "http://localhost:8080/Kwetter/resources/tweets/userid?id=1";
  private removeTweet = "http://localhost:8080/Kwetter/resources/tweets/remove?id=";
  private getFollowings = "http://localhost:8080/Kwetter/resources/users/getfollowing?id=1";
  private followUser = "http://localhost:8080/Kwetter/resources/users/addFollower?id=2&superName=";
  private getByMatches = "http://localhost:8080/Kwetter/resources/tweets/bycontent?content=";
  private getTags = "http://localhost:8080/Kwetter/resources/hashtags";
  private byname = "http://localhost:8080/Kwetter/resources/users/byname?name=";

  private content: string;

  constructor(private http: Http) {

  }

  getRecent(): Observable<Tweet> {
    return this.http
      .get(this.getRecentTweet)
      .map((response: Response) => {
        return <Tweet>response.json();
      })
      .catch(this.handleError);
  }

  getTagss(): Observable<HashTag[]> {
    return this.http
      .get(this.getTags)
      .map((response: Response) => {
        return <HashTag[]>response.json();
      })
      .catch(this.handleError);
  }

  getMatches(string: any): Observable<Tweet[]> {
    return this.http
      .get(this.getByMatches + string)
      .map((response: Response) => {
        return <Tweet[]>response.json();
      })
      .catch(this.handleError);
  }

  getFollowing(): Observable<string[]> {
    return this.http
      .get(this.getFollowings)
      .map((response: Response) => {
        return <string[]>response.json();
      })
      .catch(this.handleError);
  }

  getByUserId(): Observable<Tweet[]> {
    return this.http
      .get(this.getTweetByUserId)
      .map((response: Response) => {
        return <Tweet[]>response.json();
      })
      .catch(this.handleError);
  }


  getPosts(): Observable<Tweet[]> {
    return this.http
      .get(this._postsURL)
      .map((response: Response) => {
        return <Tweet[]>response.json();
      })
      .catch(this.handleError);
  }

  getProfile(): Observable<Profile> {
    return this.http
      .get(this.getProfileByName)
      .map((response: Response) => {
        return <Profile>response.json();
      })
      .catch(this.handleError);
  }

  getMentions(): Observable<Tweet[]> {
    return this.http
      .get(this.getMentionsUrl)
      .map((response: Response) => {
        return <Tweet[]>response.json();
      })
      .catch(this.handleError);
  }

  getStatistics(): Observable<User> {
    return this.http
      .get(this.getUser)
      .map((response: Response) => {
        return <User>response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  removeTweetWithObservable(tweet: Tweet): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.removeTweet + tweet.id, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addLikeWithObservable(id: any): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.likeTweet + id, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  followUserWithObservable(string: any): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.followUser + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addFlagWithObservable(id: any): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.flagTweet + id, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addTweetWithObservable(string: any, test: any): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://localhost:8080/Kwetter/resources/tweets/post?name=" + test + "&content=" + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileWithObservable(profile: Profile): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.editProfile, profile, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfilePictureWithObservable(string: any): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.editPicture + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileNameWithObservable(string: any): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.editUsername + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileWebWithObservable(string: any): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.editWeb + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileLocatieWithObservable(string: any): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.editLocatie + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileBiographyWithObservable(string: any): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.editBio + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  private handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

}
