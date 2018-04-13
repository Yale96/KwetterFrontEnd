import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {Tweet} from "./tweet";
import {User} from './User';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ApiService {

  private _postsURL = "http://localhost:8080/Kwetter/resources/tweets";
  private addURL = "http://localhost:8080/Kwetter/resources/tweets/post?name=Yale96&content=";
  private getMentionsUrl = "http://localhost:8080/Kwetter/resources/tweets/mentionname?name=Admin";
  private getUser = "http://localhost:8080/Kwetter/resources/users/single?name=Admin";
  private flagTweet = "http://localhost:8080/Kwetter/resources/tweets/flag?name=Admin&tweetId=1";
  private likeTweet = "http://localhost:8080/Kwetter/resources/tweets/like?name=Admin&tweetId=1";

  constructor(private http: Http) {
  }

  getPosts(): Observable<Tweet[]> {
    return this.http
      .get(this._postsURL)
      .map((response: Response) => {
        return <Tweet[]>response.json();
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

  getStatistics(): Observable<User[]> {
    return this.http
      .get(this.getUser)
      .map((response: Response) => {
        return <User[]>response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  addLikeWithObservable(tweet:Tweet): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.likeTweet + tweet.id, tweet, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addFlagWithObservable(tweet:Tweet): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.flagTweet + tweet.id, tweet, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addTweetWithObservable(tweet:Tweet): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addURL + tweet.content, tweet, options)
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
