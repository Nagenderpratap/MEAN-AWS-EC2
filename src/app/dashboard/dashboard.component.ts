import { Component, OnInit, TemplateRef } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public register: RegistrationService, private modalService: BsModalService, private toastr: ToastrService, private router: Router) { }

  modalRef: BsModalRef;
  public userData : any = {};
  ngOnInit() {
    this.getUserDetail();
  }

  public getUserDetail(){
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
