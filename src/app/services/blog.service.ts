import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private afDb:AngularFireDatabase,private afAuth : AngularFireAuth) { }

  getblogs(){
    return this.afDb.list('blogs',ref=>ref.limitToLast(12));
  }
  getCategories(){
    return this.afDb.list('category').valueChanges();
  }
  
  getCategoryWiseBlogs(chipName){
    return this.afDb.list('blogs').snapshotChanges().pipe(
      map(d=>{
        let blogs =  d.filter(b=>{
          let payload = b.payload.val();
            if(payload && payload["category"].includes(chipName)){
              return {key:b.key,...payload}
            }
        })
        return blogs.map(b=>{return {key:b.key,...b.payload.val()}});
      })
    );
  }

  getBlog(blogId){
    return this.afDb.object(`blogs/${blogId}`).valueChanges();
  }

  getPageViews(id){
    return this.afDb.object(`views/${id}`);
  }

  updateLikes(id){
    let data = {};
    if(this.afAuth.auth.currentUser && this.afAuth.auth.currentUser.uid){
      data[this.afAuth.auth.currentUser.uid] = true
    }else{
      // data[this.uuidv4] = true;
      alert("Please Login")
    }
    return this.afDb.object(`likes/${id}`).update(data)
  }

  get uuidv4() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getLikes(blogId){
    return this.afDb.object(`likes/${blogId}`).snapshotChanges();
  }
  
  get getSocialMedia(){
    let socialShare = [
      {
        name:"facebook",
        link:`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${window.location.href}`
      },
      {
        name:"whatsapp",
        link:`https://wa.me/?text=${window.location.href}`
      },
      {
        name:"twitter",
        link:`https://twitter.com/share?url=${window.location.href}`
      }
    ]
    return socialShare;
  }

  recentPosts(){
    return this.afDb.list('blogs',ref=>ref.limitToLast(3)).snapshotChanges();
  }
}
