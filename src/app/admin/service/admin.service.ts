import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Admin } from '../model/admin';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;


  constructor(private afDB:AngularFireDatabase,private afStorage:AngularFireStorage,private afAuth:AngularFireAuth) { }

  getBolgs(){
    return this.afDB.list('blogs');
  }

  addBlog(value:Admin){
    return this.afDB.list("blogs").push(value);
  }

  authData(){
    return this.afAuth.auth.currentUser;
  }

  uploadImages(files:FileList):Promise<any>{

    let promise = new Promise((resolve,reject)=>{
      let file = new FileReader();
      file.onload = (e)=>{
        resolve(e.srcElement["result"]);
      }
      file.readAsDataURL(files.item(0));
    })
    return promise;

    // let promise = new Promise((resove,reject)=>{
    //   let ref = this.afStorage.ref(files.item(0).name);
    //   let task = ref.put(files.item(0));
    //   this.percentage = task.percentageChanges();
    //   let value = this.percentage.toPromise().then(e=>{return e});
    //   value.then(e=>{
    //     if(e == 100){
    //       resove(ref.getDownloadURL().toPromise())
    //     }
    //   })
    // })
    // return promise;
  }

  getDataDB(){
    return this.afDB.list('blogs').valueChanges();
  }

  deleteImage(){

  }
}
