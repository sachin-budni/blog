import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase/app";
import { AngularFireDatabase } from 'angularfire2/database';
import { Signup } from './auth';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
// const firebase = require('firebase/app');  

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth:AngularFireAuth,private afDb:AngularFireDatabase,private route:Router,private authService:AuthService,
    private ngZone:NgZone) { }

  login(email,password){
    return this.auth.auth.signInWithEmailAndPassword(email,password).then(auth=>{
      this.authService.currentUser(auth.user);
    }).finally(()=>this.ngZone.run(()=>this.route.navigate(["blog"])));
  }

  oAuthLogin(provider){
    return this.auth.auth.signInWithPopup(provider).then(auth=>{
      this.authService.currentUser(auth.user);
      this.updaGoogleProfile(auth.user)
    }).finally(()=>this.ngZone.run(()=>this.route.navigate(["blog"])));
  }

  google(){
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  signWithEmailAndPassword(data:Signup){
    return this.auth.auth.createUserWithEmailAndPassword(data.email,data.password).then(auth=>{
      // const verify = this.verifyEmail(auth.user)
      // verify.then(d=>{
      //   console.log(d)
      // })
      auth.user.updateProfile({
        displayName:data.firstName+" "+data.lastName,
        photoURL:"assets/profile.png"
      }).then(a=>{
        this.authService.currentUser(auth.user);
        this.updateAuthProfile(auth.user,data);
      });
    }).finally(()=>this.ngZone.run(()=>this.route.navigate(['blog']))).catch(err=>alert(err.message))
  }

  updaGoogleProfile(auth:firebase.User){
    const user ={
      uid:auth.uid,
      Name: auth.displayName,
      email:auth.email,
      profile:auth.photoURL,
      verify:auth.emailVerified
    }
    this.route.navigate(["/blog"])
    this.afDb.object(`users/${auth.uid}`).set(user);
  }

  // verifyEmail(auth:firebase.User){
  //   return this.auth.auth.
  // }


  updateAuthProfile(auth:firebase.User,data:Signup){
      const user ={
        uid:auth.uid,
        name: auth.displayName,
        mobileNo:data.mobileNo,
        email:auth.email,
        profile:auth.photoURL,
        verify:auth.emailVerified,
    }
    this.afDb.object(`users/${auth.uid}`).set(user);
    this.route.navigate(["blog"])
  }


  getUserLogin(){
    return new Promise<any>((resolve, reject) => {
      const currentUser = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  
}
