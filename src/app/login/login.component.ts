import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { LoginService } from '../core/login.service';
import { Login } from '../core/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  flag:boolean = true;
  loginFormGroup:FormGroup;
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  constructor(private fBuilder : FormBuilder,private authService:LoginService,private activeRoute:ActivatedRoute,
    private route:Router,private ngZone:NgZone) { }

  ngOnInit() {
    let passwordRegex: RegExp = /((?=.*\d)(?=.*[a-zA-Z]).{8,20})/ 
    this.loginFormGroup = this.fBuilder.group({
      email:[null,[Validators.required,Validators.pattern(this.emailregex)]],
      password:[null,[Validators.required,Validators.pattern(passwordRegex)]]
    })
  }

  getErrorEmail() {
    return this.loginFormGroup.get('email').hasError('required') ? 'Field is required' :
    this.loginFormGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :'';
  }

  getErrorPassword() {
    return this.loginFormGroup.get('password').hasError('required') ? 'Field is required' :
    this.loginFormGroup.get('password').hasError('pattern') ? 'Not a valid password' :'';
  }

  onSubmit(data:Login){
    this.authService.login(data.email,data.password);
  }

  GoogleLogin(){
    this.authService.google().then(auth=>{
    }).finally(()=>this.ngZone.run(()=>this.route.navigate(["/blog"])))
  }

}
