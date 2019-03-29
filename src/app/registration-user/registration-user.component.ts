import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Registration} from '../../model/registration.model';
import {RegistrationService} from '../services/registration.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: ['./registration-user.component.css']
})
export class RegistrationUserComponent implements OnInit {

   user_Info  = new Registration();
   @ViewChild('fileInput') fileInput: ElementRef;
   form: FormGroup;

  constructor(public register: RegistrationService, private toastr: ToastrService, private  router: Router) { }

  ngOnInit() {
  }


  public  userRegister() {

      let fileBrowser = this.fileInput.nativeElement;
      let len = fileBrowser.files.length;
      const formData = new FormData();
      let file = fileBrowser.files[0];
        formData.append("file", file);

        // let fileBrowser = this.fileInput.nativeElement;
        // let len = fileBrowser.files.length;
        // let file = fileBrowser.files[0];
        // const formData = new FormData();
    
        // formData.append("user_image", file);
        // formData.append("user_Name", this.user_Info.user_Name);
        // formData.append("user_Email", this.user_Info.user_Email);
        // formData.append("user_Password", this.user_Info.user_Password);
        // formData.append("user_Mobile", this.user_Info.user_Mobile);
        // formData.append("user_confirmEmail", this.user_Info.user_confirmEmail);
    

    // console.log(JSON.stringify(this.user_Info));
    // console.log(JSON.stringify(file));
    // console.log(JSON.stringify(this.fileInput));

    this.register.userRegister(this.user_Info).subscribe(res => {
      const data = res;
       if (res['statusCode'] === 'S100') {
    this.toastr.success('User register successfully..!', 'Done!',
                  {progressBar : true, timeOut : 3000, progressAnimation : 'decreasing', positionClass : 'toast-bottom-right'});
            this.router.navigateByUrl('login');
       }
    }, err => {

    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      // this.form.get('avatar').setValue(file);

      console.log(event.target.files[0]);
      console.log('file'+file);
      console.log('readers'+JSON.stringify(reader));

      reader.onload = () => {
        
          this.user_Info.user_Image.fileValue = reader.result.split(',')[1];
          this.user_Info.user_Image.fileName = file.name;
          this.user_Info.user_Image.fileSize = file.size;
          this.user_Info.user_Image.fileType = file.type;
      };
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('name', this.form.get('name').value);
    input.append('avatar', this.form.get('avatar').value);
    return input;
  }
  
}
