import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {Tweet} from "./tweet";
import {User} from './User';
import { Headers, RequestOptions } from '@angular/http';
import {Profile} from './Profile';

@Injectable()
export class ApiService {

  private _postsURL = "http://localhost:8080/Kwetter/resources/tweets";
  private addURL = "http://localhost:8080/Kwetter/resources/tweets/post?name=Admin&content=";
  private getMentionsUrl = "http://localhost:8080/Kwetter/resources/tweets/mentionname?name=Admin";
  private getUser = "http://localhost:8080/Kwetter/resources/users/single?name=Admin";
  private flagTweet = "http://localhost:8080/Kwetter/resources/tweets/flag?name=Admin&tweetId=1";
  private likeTweet = "http://localhost:8080/Kwetter/resources/tweets/like?name=Admin&tweetId=1";
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

  addLikeWithObservable(tweet: Tweet): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.likeTweet, tweet, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addFlagWithObservable(tweet: Tweet): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.flagTweet, tweet, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addTweetWithObservable(tweet: Tweet): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addURL + tweet.content, tweet, options)
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

  editProfilePictureWithObservable(profile: Profile): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.editPicture + profile.picture, profile, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileNameWithObservable(profile: Profile): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.editUsername + profile.name, profile, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileWebWithObservable(profile: Profile): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.editWeb + profile.web, profile, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileLocatieWithObservable(profile: Profile): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.editLocatie + profile.location, profile, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileBiographyWithObservable(profile: Profile): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.editBio + profile.bio, profile, options)
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
