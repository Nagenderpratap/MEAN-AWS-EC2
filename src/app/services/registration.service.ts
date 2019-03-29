import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient?: HttpClient ) { }

  userRegister(data: any) {
        const url = '/api/userRegister';
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json; charset=utf-8');
        return  this.httpClient.post(url, data, {headers: headers});
  }

  userLogin(data: any) {
        const url = '/api/userLogin';
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json; charset=utf-8');
        return  this.httpClient.post(url, data, {headers: headers});
  }

  tweetMsg(data: any,Id) {
    const url = '/api/userTweet/' + Id;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return  this.httpClient.post(url, data, {headers: headers});
}

 tweetListAPI(Id){
  const url = '/api/TweetList/' + Id;
  const headers = new HttpHeaders();
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return  this.httpClient.get(url, {headers: headers});
 }

 tweet_Listing_Search_API(searchKey){
  const url = '/api/TweetListSearch/' + searchKey;
  const headers = new HttpHeaders();
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return  this.httpClient.get(url, {headers: headers});
 }
}

