import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  blogs:Observable<any>;
  constructor(private route:ActivatedRoute,private blogService:BlogService) {
    this.route.params.subscribe(routes=>{
      let id = routes.id;
      this.getCategoryBlogs(id);
    })
  }

  ngOnInit() {
  }

  getCategoryBlogs(chipName){
    this.blogs = this.blogService.getCategoryWiseBlogs(chipName);
  }

}
