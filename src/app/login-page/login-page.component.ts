import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../model/login-model';
import { RegistrationService } from '../services/registration.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  login = new LoginModel();

  constructor(public register: RegistrationService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  public loginUser() {
    this.register.userLogin(this.login).subscribe(res => {
      const data = res;
      if (res['statusCode'] === 'S100') {
        let userData = res['data'];
        sessionStorage.setItem('userID', userData[0]._id);
        this.toastr.success('User login successfully..!', 'Done!',
          { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
        this.router.navigateByUrl('/tweet');
      } else if (res['statusCode'] === 'E100') {
        this.toastr.error('Password does not correct', 'Error!',
          { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
      }
    }, err => {
      this.toastr.error('Something went wrong..!', 'Error!',
        { progressBar: true, timeOut: 3000, progressAnimation: 'decreasing', positionClass: 'toast-bottom-right' });
    });
  }
}
