import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../blog.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  datas:AngularFireList<any>;
  // items = values.question;
  items = [];
  constructor(private blogService:BlogService){

  }

  ngOnInit(){
    this.data();
  }
  
   data(){
    this.datas = this.blogService.blogData();
    this.datas.snapshotChanges().subscribe(action=>{
      action.forEach(data=>{
        this.items.push({key:data.key,...data.payload.val()})
      })
    })
  }
}