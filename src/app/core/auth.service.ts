import { Injectable } from '@angular/core';
import { CurrentUser } from './auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { User } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserData:CurrentUser;
  constructor(private afAuth:AngularFireAuth,private storage:AngularFireStorage,private route:Router) {
  }

  currentUser(auth:User){
    let user = new CurrentUser();
    user.uid = auth.uid;
    user.verify = auth.emailVerified;
    user.profile = auth.photoURL;
    user.name = auth.displayName;
    user.email = auth.email;
    this.currentUserData = user;
  }

  user(){
    return this.afAuth.auth.currentUser;
  }

  currentUserZero(){
    this.currentUserData = undefined;
  }

  get currentUsers():CurrentUser{
    return this.currentUserData;
  }

  updateImage(event:FileList){
    console.log(event.item(0))
      let ref = this.storage.ref(event.item(0).name);
      let task = ref.put(event.item(0));
      let percentage = task.percentageChanges().toPromise().then(e=>{return e});
      percentage.then(e=>{
        if(e == 100){
         console.log(e);
         ref.getDownloadURL().toPromise().then(img=>{
           this.afAuth.auth.currentUser.updateProfile({
             photoURL:img
           })
         })
        }
      })
  }


  logout(){
    this.afAuth.auth.signOut().then(d=>{
      this.currentUserZero();
      this.route.navigate(["/blog"])
    })
  }

}
