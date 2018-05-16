import {Injectable} from "@angular/core";
import {Http, Response, ResponseType} from '@angular/http';
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {Tweet} from "./tweet";
import {User} from './User';
import { Headers, RequestOptions } from '@angular/http';
import {Profile} from './Profile';
import {HashTag} from './HashTag';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  private _postsURL = "http://localhost:8080/Kwetter/resources/tweets";
  private checkLike = "http://localhost:8080/Kwetter/resources/tweets/checklike";
  private checkFlag = "http://localhost:8080/Kwetter/resources/tweets/checkflag";
  private checkFollow = "";
  private addURL = "http://localhost:8080/Kwetter/resources/tweets/post?name=Admin&content=";
  private getMentionsUrl = "http://localhost:8080/Kwetter/resources/tweets/mentionname?name=";
  private getUser = "http://localhost:8080/Kwetter/resources/users/single?name=";
  private flagTweet = "http://localhost:8080/Kwetter/resources/tweets/flag?name=Admin&tweetId=";
  private likeTweet = "http://localhost:8080/Kwetter/resources/tweets/like?name=Admin&tweetId=";
  private editProfile = "http://localhost:8080/Kwetter/resources/profiles/edit";
  private editPicture = "http://localhost:8080/Kwetter/resources/profiles/edit/picture?id=1&toEdit=";
  private editUsername = "http://localhost:8080/Kwetter/resources/profiles/edit/name?id=1&toEdit=";
  private editWeb = "http://localhost:8080/Kwetter/resources/profiles/edit/web?id=1&toEdit=";
  private editLocatie = "http://localhost:8080/Kwetter/resources/profiles/locatie/picture?id=1&toEdit=";
  private editBio = "http://localhost:8080/Kwetter/resources/profiles/edit/bio?id=1&toEdit=";
  private getProfileByName = "http://localhost:8080/Kwetter/resources/users/getProfileByName?name=";
  private getRecentTweet = "http://localhost:8080/Kwetter/resources/tweets/userid/recent?id=2";
  private getTweetByUserId = "http://localhost:8080/Kwetter/resources/tweets/userid?id=1";
  private removeTweet = "http://localhost:8080/Kwetter/resources/tweets/remove?id=";
  private getFollowings = "http://localhost:8080/Kwetter/resources/users/getfollowing?id=1";
  private followUser = "http://localhost:8080/Kwetter/resources/users/addFollower?id=2&superName=";
  private getByMatches = "http://localhost:8080/Kwetter/resources/tweets/bycontent?content=";
  private getTags = "http://localhost:8080/Kwetter/resources/hashtags";
  private byname = "http://localhost:8080/Kwetter/resources/users/byname?name=";
  private trends = "http://localhost:8080/Kwetter/resources/hashtags/trends";
  private subscribe = "http://localhost:8080/Kwetter/resources/tweets/register";

  private content: string;



  constructor(private http: Http, private https: HttpClient) {

  }

  getRecent(id: any): Observable<Tweet> {
    return this.http
      .get("http://localhost:8080/Kwetter/resources/tweets/userid/recent?id=" + id)
      .map((response: Response) => {
        return <Tweet>response.json();
      })
      .catch(this.handleError);
  }

  subscribee(): Observable<void> {
    return this.http
      .get(this.subscribe)
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

  getTrendss(): Observable<string[]> {
    return this.http
      .get(this.trends)
      .map((response: Response) => {
        return <string[]>response.json();
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

  getFollowing(id: any): Observable<string[]> {
    return this.http
      .get("http://localhost:8080/Kwetter/resources/users/getfollowing?id=" + id)
      .map((response: Response) => {
        return <string[]>response.json();
      })
      .catch(this.handleError);
  }

  getByUserId(id: any): Observable<Tweet[]> {
    return this.http
      .get("http://localhost:8080/Kwetter/resources/tweets/userid?id=" + id)
      .map((response: Response) => {
        return <Tweet[]>response.json();
      })
      .catch(this.handleError);
  }
  getPostss(): Observable<Tweet[]> {
    const options = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};
    console.log(this.https.get('http://localhost:8080/Kwetter/resources/tweets/gettweetss'));
    return this.https
      .get('http://localhost:8080/Kwetter/resources/tweets/gettweetss', options)
      .map(response => {
        const tweets = response;
        return tweets;
      })
      .catch(this.handleError);
  }

  getPosts(): Observable<Tweet[]> {
    console.log(this.http.get(this._postsURL));
    return this.http
      .get(this._postsURL)
      .map((response: Response) => {
        return <Tweet[]>response.json();
      })
      .catch(this.handleError);
  }

  getPostsOwn(id: any): Observable<Tweet[]> {
    console.log(this.http.get('http://localhost:8080/Kwetter/resources/users/OwnAndOthers?id=' + id));
    return this.http
      .get(this._postsURL)
      .map((response: Response) => {
        return <Tweet[]>response.json();
      })
      .catch(this.handleError);
  }

  getProfile(string: any): Observable<Profile> {
    return this.http
      .get(this.getProfileByName + string)
      .map((response: Response) => {
        return <Profile>response.json();
      })
      .catch(this.handleError);
  }

  getSingle(): Observable<Tweet> {
    const options = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};
    return this.https.get<Tweet>("http://localhost:8080/Kwetter/resources/tweets/highest", options);
  }


  getMentions(string: any): Observable<Tweet[]> {
    return this.http
      .get(this.getMentionsUrl + string)
      .map((response: Response) => {
        return <Tweet[]>response.json();
      })
      .catch(this.handleError);
  }

  getStatistics(string: any): Observable<User> {
    const options = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};
    return this.https.get<User>(this.getUser + string, options);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  removeTweetWithObservable(id: any): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.https.post(this.removeTweet + id, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addLikeWithObservable(string: any, id: any): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.https.post("http://localhost:8080/Kwetter/resources/tweets/like?name=" + string + "&tweetId=" + id, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  followUserWithObservable(id: any, string: any): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.https.post('http://localhost:8080/Kwetter/resources/users/addFollower?id=' + id + '&superName=' + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  unfollowUserWithObservable(id: any, string: any): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.https.post('http://localhost:8080/Kwetter/resources/users/removeFollower?id=' + id + '&superName=' + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addFlagWithObservable(string: any, id: any): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.https.post("http://localhost:8080/Kwetter/resources/tweets/flag?name=" + string + "&tweetId=" + id, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addTweetWithObservable(string: any, test: any): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.https.post("http://localhost:8080/Kwetter/resources/tweets/post?name=" + test + "&content=" + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  checkLikeWithObservable(string: any, id: any): Observable<boolean> {
    return this.http
      .get('http://localhost:8080/Kwetter/resources/tweets/checklike?name=' + string + '&tweetId=' + id)
      .map((response: Response) => {
        return <Tweet>response.json();
      })
      .catch(this.handleError);
  }

  checkFlagWithObservable(string: any, id: any): Observable<boolean> {
    return this.http
      .get('http://localhost:8080/Kwetter/resources/tweets/checkflag?name=' + string + '&tweetId=' + id)
      .map((response: Response) => {
        return <Tweet>response.json();
      })
      .catch(this.handleError);
  }

  addUserWithObservable(name: any, password: any): Observable<Tweet> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.https.post("http://localhost:8080/Kwetter/resources/users/register?username=" + name + "&password=" + password + "", options)
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

  editProfilePictureWithObservable(id: any, string: any): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put("http://localhost:8080/Kwetter/resources/profiles/edit/picture?id=" + id + "&toEdit=" + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileNameWithObservable(id: any, string: any): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put("http://localhost:8080/Kwetter/resources/profiles/edit/name?id=" + id + "&toEdit=" + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileWebWithObservable(id: any, string: any): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put("http://localhost:8080/Kwetter/resources/profiles/edit/web?id=" + id + "&toEdit=" + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileLocatieWithObservable(id: any, string: any): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put("http://localhost:8080/Kwetter/resources/profiles/locatie/picture?id=" + id + "&toEdit=" + string, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  editProfileBiographyWithObservable(id: any, string: any): Observable<Profile> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put("http://localhost:8080/Kwetter/resources/profiles/edit/bio?id=" + id + "&toEdit=" + string, options)
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
