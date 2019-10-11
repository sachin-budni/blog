import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup:FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) { 
    this.loginFormGroup = this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
    })
  }

  ngOnInit() {
  }

  onSubmit(value){
    this.authService.login(value).catch(err=>console.log(err)).then(user=>{
      this.router.navigate([''])
    })
  }

}
