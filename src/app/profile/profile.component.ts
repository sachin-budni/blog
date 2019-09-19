import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/login.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser:firebase.User;
  constructor(private loginService:LoginService,private authService:AuthService) { }

  ngOnInit() {
    this.loginService.getUserLogin().then(user=>this.currentUser= user);
  }

  logout(){
    this.authService.logout();
  }
  verifyEmail(currentUser:firebase.User){
    currentUser.sendEmailVerification();
  }
  uplaod(event:Event){
    this.authService.updateImage(event.srcElement["files"])
  }
}
