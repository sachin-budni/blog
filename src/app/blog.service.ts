import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { reduce } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private afDB: AngularFireDatabase,private route:Router) { }
  blogData(){
    return this.afDB.list("blogs");
  }

  getBlogData(id){
    return this.afDB.object(`blogs/${id}`);
  }
}
