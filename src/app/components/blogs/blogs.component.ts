import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class BlogModel{
  authorName:string;
  category:string[];
  id:string;
  title:string;
  titleImage:string;
}

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs:Observable<any>;
  categories:Observable<any>;
  socialMedia = [];
  constructor(private blogService:BlogService) { 
    this.socialMedia = this.blogService.getSocialMedia;
    this.blogs = this.blogService.getblogs().snapshotChanges().pipe(
      map(blogs=>{
        return blogs.map(blog=>{
          return {key:blog.key,...blog.payload.val()}
        })
      })
    );
  }

  ngOnInit() {
  }

  openLink(link:string,key:string){
    window.open(link+"blog/"+key,'_blank','toolbar=yes,top=500,left=500,width=400,height=400');
  }


}
