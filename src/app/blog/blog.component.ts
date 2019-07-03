import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


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

  data=[];
  blogData :Observable<any>;
  _popularBlog :Observable<any>;
  _recentlyPosts :Observable<any>;
  constructor(private blogService:BlogService,private route:ActivatedRoute) { }


//   @ViewChild("video",{static: false}) public video: ElementRef;
// d  @ViewChild("canvas",{static: false})
//   public canvas: ElementRef;

//   public captures: Array<any> = [];


//   public ngAfterViewInit() {
//       if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//           navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
//               this.video.nativeElement.src = window.URL.createObjectURL(stream);
//               this.video.nativeElement.play();
//           });
//       }
//   }

//   public capture() {
//       var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
//       this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
//   }


  ngOnInit() {
    // for (let index = 0; index < 4; index++) {
    //   const element = this.values.question[index];
    //   this.data.push(element);
    // }
    this.route.params.subscribe(e=>{
      // console.log(e.id)
      this.blogData = this.getBlog(e.id);
      this.blogData.subscribe(d=>{
        console.log(d)
      });
      this._popularBlog = this.getPopularBlogs();
      this._recentlyPosts = this.getRecentlyPosts();
    })
  }

  ngOnDestroy(): void {
    this.route.params.subscribe(e=>{
      this.blogData.subscribe(d=>this.blogService.updateBlog(e.id,d.view+1));
    });
  }

  getRecentlyPosts(){
    return this.blogService.getRecentlyPosts();
  }

  getPopularBlogs(){
    return this.blogService.getPopularBlogs();
  }

  getBlog(id){
    return this.blogService.getBlogData(id);
  }

  values = 
    {
      header:"what is google",
      subHeader:"",
      question:[
        {
          id:"sdjisjdks",
          image:"assets/BLOG1.jpg",
          data:`[Jobs Roundup] Foodtech Startups are hungry for new talent. Do you have what it takes to ‘deliver’?`,
          name:"Shrishail"
        },
        {
          id:"nzjhjer",
          image:"https://images.yourstory.com/cs/2/60409080-2d6d-11e9-aa97-9329348d4c3e/flattummies_founders1557501179545.png?fm=png&auto=format&h=400&w=800&crop=entropy&fit=crop",
          data:`How this bootstrapped clothing startup is eyeing success by marrying Indian ethnic fashion with international trends`,
          name:"Somashekar"
        },
        {
          id:"nlziejr",
          image:"https://images.yourstory.com/cs/2/2d86ed30-b282-11e8-b2e7-114aea10c711/WhatsApp_Image_2019-03-12_at_71557491356312.47?fm=png&auto=format",
          data:"How “mothers” have helped this homegrown startup get an edge over international competition",
          name:"Shridhar"
        },
        {
          id:"neskjde",
          image:"https://images.yourstory.com/cs/2/a054f130-2d6c-11e9-aa97-9329348d4c3e/booking_booster1557548852374.jpg?fm=png&auto=format",
          data:"Meet the 10 startups that are working on sustainable tourism, and won Booking.com grants",
          name:"Mahadev"
        },
        {
          id:"ocidmekr",
          image:"https://images.yourstory.com/cs/wordpress/2018/02/Uber-Express-POOL.jpg?fm=png&auto=format",
          data:"Uber IPO: Bumpy ride for Uber in its trading debut",
          name:"Akash"
        },
        {
          id:"nlsdijfd",
          image:"https://images.yourstory.com/cs/2/60409080-2d6d-11e9-aa97-9329348d4c3e/Skillmatics_Dhvanil1557486199721.png?fm=png&auto=format",
          data:"This Mumbai startup is the first Indian brand to sell across Hamleys globally",
          name:"Shrikant"
        },
        {
          id:"oienmkds",
          image:"https://images.yourstory.com/cs/2/a054f130-2d6c-11e9-aa97-9329348d4c3e/booking_booster1557548852374.jpg?fm=png&auto=format",
          data:"Meet the 10 startups that are working on sustainable tourism, and won Booking.com grants",
          name:"Mahadev"
        },
        {
          id:"isduifd",
          image:"https://images.yourstory.com/cs/wordpress/2018/02/Uber-Express-POOL.jpg?fm=png&auto=format",
          data:"Uber IPO: Bumpy ride for Uber in its trading debut",
          name:"Akash"
        },
        {
          id:"kfjdskjf",
          image:"https://images.yourstory.com/cs/2/60409080-2d6d-11e9-aa97-9329348d4c3e/Skillmatics_Dhvanil1557486199721.png?fm=png&auto=format",
          data:"This Mumbai startup is the first Indian brand to sell across Hamleys globally",
          name:"Shrikant"
        }
      ]
    }

}
