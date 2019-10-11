import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  date = new Date();
  $key:string;
  pageView:number;
  likes:Observable<any>
  blogObservable:Observable<any>;
  currentUserUid;
  authState:Observable<User>;
  socialMedia = [];
  
  constructor(private router:Router,private route:ActivatedRoute,private blogService:BlogService,private authService:AuthService) { 
    this.route.params.subscribe(routes=>{
      this.$key = routes.id;
      this.socialMedia = this.blogService.getSocialMedia;
      this.authState = this.authService.getAuthState;
      this.authState.pipe(first()).toPromise().then(user=>{
        this.currentUserUid = user.uid;
      }).catch(err=>console.log(err))
      this.blogObservable = this.blogService.getBlog(this.$key);

      this.pageViews(routes.id).then(view=>{
        this.pageView = view?view + 1:1;
        this.blogService.getPageViews(routes.id).set(this.pageView);
        this.likes = this.getLikes(routes.id);
      });

    })
  }

  ngOnInit() {
  }

  openLink(link:string){

    http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0'

    window.open(link,'_blank','toolbar=yes,top=500,left=500,width=400,height=400');
  }

  getLikes(id){
    return this.blogService.getLikes(id).pipe(
      map(d=>{
        if(!d.payload.val()) return 0;

        return {count:Object.keys(d.payload.val()).length,...d.payload.val()}
      })
    );
  }

  async pageViews(id):Promise<any>{
    return await (this.blogService.getPageViews(id).valueChanges().pipe(first()).toPromise());
  }
  updateLike(){
    this.blogService.updateLikes(this.$key);
  }

}
