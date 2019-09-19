import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';


export interface Section {
  name: string;
  updated: Date;
}

class Content{
  paragraph?:string;
  image?:string;
  link?:string;
}

export class Blog{
  title:string;
  titleImage:string;
  view?:number;
  category:string;
  authorName:string;
  content?:Array<Content>;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  noData = false;
  spinner = true;
  blogData :Observable<any>;
  constructor(private blogService:BlogService,private afDB: AngularFireDatabase,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(e=>{
      this.blogData = this.blogService.getBlogData(e.id).valueChanges();
      this.blogData.subscribe(d=>{
        if(!d){
          this.spinner =false;
          this.noData = true;
          // this.router.navigate(['/'])
        }else{
          this.spinner = false;
        }
      })
    });
  }
}
