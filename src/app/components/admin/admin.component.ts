import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { QuillConfig } from 'ngx-quill';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { first } from 'rxjs/operators';
import { User } from 'firebase';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  categoryChips = [];
  selectedCategotyChips = [];
  chip:string = "";
  user:User;
  constructor(private fb: FormBuilder,private adminSerivce: AdminService, private dialog: MatDialog,private router:Router) {
    this.adminSerivce.authData.subscribe(user=>{
      this.user = user;
    })
    this.adminSerivce.fetchCategoryData().then((data:any)=>{
      if(data[0]){
        this.categoryChips = data[0];
      }
    })
  }

  selectedValue: number = 0;
  selectedCar: string;

  quillConfig:QuillConfig ={
    modules:{
      toolbar:{
        container:[
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          ['blockquote', 'code-block'],            // custom button values
          [{ 'header': [1,2,3,4,5,6,false] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['clean']
        ]
      }
    }
  }

  productForm: FormGroup;
  adminForm:FormGroup;


  jsonFormate = { "title": "sachin", "authorName": "shiva", "content": [ { "paragraph": "gsgdfgdfgfd" }, { "image": "" }, { "link": "" }, { "image": "" } ] }
 
  ngOnInit() {
    this.adminForm = this.fb.group({
      title:['',[Validators.required,Validators.minLength(5)]],
      authorName:[this.user!.displayName,[Validators.required,Validators.minLength(2)]],
      titleImage:['',[Validators.required,Validators.minLength(5)]],
      content:this.fb.array([])
    })

  }

  get contentForm() {
    return this.adminForm.get('content') as FormArray;
  }

  addSellingPoint(name) {
    switch (name) {
      case "paragraph":
        this.contentForm.insert(this.selectedValue,this.fb.group({"paragraph":''}));
        break;
      case "image" :
        this.contentForm.insert(this.selectedValue,this.fb.group({"image":''}));
        break;
      case "link"  :
        this.contentForm.insert(this.selectedValue,this.fb.group({"link":''}));
        break;
    }
    this.selectedValue = this.contentForm.length;
  }

  update(){
    this.jsonFormate.content.forEach(element => {
      let f1 = this.fb.group(element);
      this.contentForm.push(f1);
    });
  }
  images:string ='';

  uplaod(event: Event, name, index) {
    this.adminSerivce.uploadImages(event.srcElement["files"]).then(e => {
      if (index || index == 0) {
        this.contentForm.controls[index]["controls"]["image"].setValue(e as string);
      } else {
        this.adminForm.controls[name].setValue(e as string);
      }
    });
  }

  allData: Observable<any>;

  getData(item) {
    this.allData = this.adminSerivce.getDataDB();
  }


  onSubmit(value) {
    if(this.adminForm.valid && this.selectedCategotyChips.length > 0){
      value.id = this.user.uid;
      value.category = this.selectedCategotyChips;
      this.adminSerivce.addBlog(value).then(data=>{
        console.log(data)
      }).catch(err=>{
        console.log(err);
      })
      for(let i=0;i<this.selectedCategotyChips.length; i++){
        if(!this.categoryChips.includes(this.selectedCategotyChips[i])){
          this.categoryChips.push(this.selectedCategotyChips[i]);
        }
      }
      this.addChips(this.categoryChips);
      this.router.navigate(['blog']);
    }
  }
  
  addChips(data){
    this.adminSerivce.addChips(this.categoryChips as any);
  }

  deleteSellingPoint(index) {
    this.contentForm.removeAt(index);
  }

  remove(index:number){
    this.selectedCategotyChips.splice(index,1);
  }

  addChip(chipName:string){
    if(!this.selectedCategotyChips.includes(chipName))
    this.selectedCategotyChips.push(chipName);
  }

  addCatogoryChip(event:KeyboardEvent){
    if(event.target["value"].length >3 && !this.selectedCategotyChips.includes(event.target["value"])){
      this.selectedCategotyChips.push(event.target["value"]);
    }
    event.target["value"] = "";
  }
 
}
