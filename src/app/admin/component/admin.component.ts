import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { Admin } from '../model/admin';
import { Observable } from 'rxjs';
import { QuillConfig } from 'ngx-quill';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private fb: FormBuilder,private adminSerivce: AdminService, private dialog: MatDialog,private router:Router) { }

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

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  productForm: FormGroup;
  adminForm:FormGroup;


  jsonFormate = { "title": "sachin", "authorName": "shiva", "content": [ { "paragraph": "gsgdfgdfgfd" }, { "image": "" }, { "link": "" }, { "image": "" } ] }
  
  ngOnInit() {
    let authName = this.adminSerivce.authData().displayName;
    console.log(authName)
    this.adminForm = this.fb.group({
      title:['',[Validators.required,Validators.minLength(5)]],
      authorName:[authName,[Validators.required,Validators.minLength(2)]],
      titleImage:['',[Validators.required,Validators.minLength(5)]],
      category:["steak-0",[Validators.required]],
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


  onSubmit(value: Admin) {
    if(this.adminForm.valid){
      value.id = this.adminSerivce.authData().uid;
      console.log(value)
      this.adminSerivce.addBlog(value).then(data=>{
        this.router.navigate(['blog']);
      }).catch(err=>{
        console.log(err);
      })
    }
  }

  deleteSellingPoint(index) {
    this.contentForm.removeAt(index);
  }


}
