import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private afDB: AngularFireDatabase) { }

  getDataDataBase(){
    return this.afDB.list('blogs',e=>e.limitToFirst(15));
  }

  getRecentlyPosts() :Observable<any>{
    return this.afDB.list('blogs',e=>e.limitToLast(5)).valueChanges();
  }

  getBlogData(id){
    return this.afDB.object(`blogs/${id}`).valueChanges();
  }

  getPopularBlogs(){
    return this.afDB.list('blogs',e=>e.orderByChild('view').limitToLast(5)).valueChanges();
  }

  updateBlog(id,viewCount){
    this.afDB.object(`blogs/${id}`).update({view:viewCount})
  }
}
