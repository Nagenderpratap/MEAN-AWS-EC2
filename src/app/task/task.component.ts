import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
declare var $ ;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  
  constructor(public formBuilder:FormBuilder, private elementRef: ElementRef) { }

  addressForm  : FormGroup;
  otpForm  : FormGroup;
  submitted=false;
  reqs_id : number = 0 ;
  countries : any = [{"name": ''},{"name": 'India'},{"name": 'USA'},{"name": 'Australia'},{"name": 'UAE'}]
  cities : any = [{"name": 'delhi'}]
  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      country: ['',Validators.required],
      city: this.formBuilder.array([
        this.formBuilder.control('',Validators.required)
      ]), 
    });
    
    this.otpForm = this.formBuilder.group({
      OtpUserInput1: new FormControl(
        { value:'', disabled: false },
    [ Validators.required,
       Validators.maxLength(1),
      Validators.pattern('[0-9]*') ]),
      OtpUserInput2: new FormControl(
        { value:'', disabled: false },
    [ Validators.required,
      Validators.maxLength(1),
      Validators.pattern('[0-9]*') ]),
      OtpUserInput3: new FormControl(
        { value:'', disabled: false },
    [ Validators.required,
      Validators.maxLength(1),
      Validators.pattern('[0-9]*') ]),
      OtpUserInput4: new FormControl(
        { value:'', disabled: false },
    [ Validators.required,
       Validators.maxLength(1),
      Validators.pattern('[0-9]*') ])
    });
 
  }

  public onSubmit(){
    this.submitted=true;
    if(this.addressForm.valid)
    console.warn(this.addressForm.value);
  }
 
 

  public addField(){
  //  this.cities.push({"name": data})
  this.city.push(this.formBuilder.control('', Validators.required));
 }

 get city() {
  return this.addressForm.get('city') as FormArray;
}

public removeField(index){
  this.city.removeAt(index);
}

//-------------------------------------- second task ------------------------------

dataloops=[
  { "name":"csdn" , "url":"www.runoob.com" }, 
  { "name":"google" , "url":"www.google.com" }, 
  { "name":"ifeng" , "url":"www.weibo.com" }
  ]

  keytab(event,d,otpDigit){
    const eventCode = d.which || d.keyCode;
    if(eventCode != 8)
     {
    console.log(d.target.value);
    let otp = d.target.value;

    let element = document.getElementById(event.id);
    console.log(element);
     if(element != null && otp != null && otp != '' && !isNaN(parseInt(otp)))  // check if its null
     element.focus();    
    else{
      if(otpDigit == 1){
       this.otpForm.controls['OtpUserInput1'].setValue(null);
      }else if(otpDigit == 2){
        this.otpForm.controls['OtpUserInput2'].setValue(null);
      }else if(otpDigit == 3){
        this.otpForm.controls['OtpUserInput3'].setValue(null);
      }else if(otpDigit == 4){
        this.otpForm.controls['OtpUserInput4'].setValue(null);
      }

      return;
    }
  }else{
    if(otpDigit == 1){
      let element = document.getElementById('otp1');
      element.focus();    
     }else if(otpDigit == 2){
      let element = document.getElementById('otp1');
      element.focus(); 
     }else if(otpDigit == 3){
      let element = document.getElementById('otp2');
      element.focus(); 
     }else if(otpDigit == 4){
      let element = document.getElementById('otp3');
      element.focus(); 
     }
  }
}
   public submitOTP(){
   console.log(this.otpForm.value);
   let finalOTP = this.otpForm.controls['OtpUserInput1'].value + this.otpForm.controls['OtpUserInput2'].value +this.otpForm.controls['OtpUserInput3'].value + this.otpForm.controls['OtpUserInput4'].value ;
    console.log(parseInt(finalOTP));
    alert('OTP = '+finalOTP);
   }
 
}
