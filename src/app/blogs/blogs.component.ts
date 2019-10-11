import { Component, OnInit, Input } from '@angular/core';
<<<<<<< HEAD
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogService } from '../blog.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Admin } from '../admin/model/admin';
=======
import { BlogService } from '../blog.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireList } from 'angularfire2/database';
>>>>>>> blog data

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

<<<<<<< HEAD
  data = [0,1,2,3,4,5,6,7,8,9]
  typesOfShoes = ['Pepper','Salt','Paprika'];
  flag:boolean = true;
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
    
  constructor(private blog: BlogService) {
  }
  allData : Observable<any>;
  ngOnInit() {
    this.allData = this.blog.getDataDataBase().snapshotChanges().pipe(
      map((e:[])=>{
        e.forEach((data)=>{
          let payload:DataSnapshot = data["payload"];
          console.log(payload.val())
          console.log(payload.toJSON())
          // console.log(data.val())
          // console.log(data.exists())
        })
      })
    )

    this.blog.getDataDataBase().valueChanges().subscribe(d=>{
      console.log(d)
    })

    this.blog.getDataDataBase().stateChanges().pipe(
      map(e=>{
        console.log(e);
      })
    )
  }

}
=======
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
>>>>>>> blog data
