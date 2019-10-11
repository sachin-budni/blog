import { Injectable } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../core/auth.service';
import { HttpClient } from '@angular/common/http';

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


  constructor(private afDB:AngularFireDatabase,private afStorage:AngularFireStorage,
    private authService:AuthService,private http:HttpClient) {
  }

  getBolgs(){
    return this.afDB.list('blogs');
  }


  addBlog(value){
    value["date"] = new Date().toString();
    return this.afDB.list("blogs").push(value);
  }

  get authData(){
    return this.authService.authState;
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

  fetchCategoryData(){
    let categories = new Promise((resolve,reject)=>{
      this.afDB.list('category').valueChanges().subscribe(data=>{
        resolve(data);
      },err=>reject(err));
    });
    return categories;
  }

  addChips(chips){
    this.afDB.object("category/chips").set(chips)
  }

  deleteImage(){

  }
}


