import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tweet-add-list',
  templateUrl: './tweet-add-list.component.html',
  styleUrls: ['./tweet-add-list.component.css']
})
export class TweetAddListComponent implements OnInit {

  tweetMsg: string = "";
  tweetList = {
    msg: '',
    date : new Date()
  };
  totalTweet : number ;
  tweetData  = [];
  userData : any ;
  tweetSearchKey : string = "";
  constructor(public register: RegistrationService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.getTweetList();
    this.getUserDetials();
  }

 public tweet() {
    this.tweetList.msg = this.tweetMsg;
    this.tweetList.date = new Date();
    console.log('date data'+JSON.stringify(this.tweetList));

    this.register.tweetMsg(this.tweetList, sessionStorage.getItem('userID')).subscribe(res => {
      const data = res;
      if (res['statusCode'] === 'S100') {
        this.toastr.success('Tweet successfully..!', 'Done!',
          { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
       this.getTweetList();
      } else if (res['statusCode'] === 'E100') {
        this.toastr.error('Password does not correct', 'Error!',
          { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
      }
    }, err => {
      this.toastr.error('Something went wrong..!', 'Error!',
        { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
    });
  }

  public getTweetList() {
    this.register.tweetListAPI(sessionStorage.getItem('userID')).subscribe(res => {
      const data = res;
      if (res['statusCode'] === 'S100') {
        this.toastr.success('Tweet lISTING successfully..!', 'Done!',
          { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
          let response:any =[];
          this.tweetData = [];
           response =  res['data'];
           this.totalTweet = response.length;
           this.tweetData = response;
         
      } else if (res['statusCode'] === 'E100') {
        this.toastr.error('Password does not correct', 'Error!',
          { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
      }
    }, err => {
      this.toastr.error('Something went wrong..!', 'Error!',
        { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
    });
  }

  public searchTweet(searchData){
    // alert(searchData)
    this.register.tweet_Listing_Search_API(searchData).subscribe(res => {
      const data = res;
      if (res['statusCode'] === 'S100') {
        this.toastr.success('Tweet lISTING successfully..!', 'Done!',
          { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
          let response:any =[];
          this.tweetData = [];
           response =  res['data'];
           this.totalTweet = response.length;
         
      }
    }, err => {
      this.toastr.error('Something went wrong..!', 'Error!',
        { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
    });
  }

  public getUserDetials() {
    this.register.tweetUserDetailAPI(sessionStorage.getItem('userID')).subscribe(res => {
      if (res['statusCode'] === 'S100') {
        this.toastr.success('details of user coming!', 'Done!',
          { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
          let response:any =[]; 
           response =  res['data'];
           console.log('user details'+JSON.stringify(response));
           this.userData = response;
      }
    }, err => {
      this.toastr.error('Something went wrong..!', 'Error!',
        { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
    });
  }

  public goToDashboard(){
    this.router.navigate(['dashboard']);
  }
}
