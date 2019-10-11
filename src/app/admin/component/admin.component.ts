import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
=======
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
>>>>>>> blog data
import { AdminService } from '../service/admin.service';
import { Admin } from '../model/admin';
import { Observable } from 'rxjs';
import { QuillConfig } from 'ngx-quill';
<<<<<<< HEAD
=======
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
>>>>>>> blog data

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

<<<<<<< HEAD
  constructor(private fb: FormBuilder,private adminSerivce:AdminService) { }
=======
  constructor(private fb: FormBuilder,private adminSerivce: AdminService, private dialog: MatDialog,private router:Router) { }
>>>>>>> blog data

  selectedValue: number = 0;
  selectedCar: string;

  quillConfig:QuillConfig ={
    modules:{
      toolbar:{
        container:[
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
<<<<<<< HEAD
          ['clean'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
=======
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          ['blockquote', 'code-block'],            // custom button values
          [{ 'header': [1,2,3,4,5,6,false] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['clean']
>>>>>>> blog data
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
<<<<<<< HEAD
  
=======

>>>>>>> blog data
  productForm: FormGroup;
  adminForm:FormGroup;


  jsonFormate = { "title": "sachin", "authorName": "shiva", "content": [ { "paragraph": "gsgdfgdfgfd" }, { "image": "" }, { "link": "" }, { "image": "" } ] }
<<<<<<< HEAD

  ngOnInit() {

    // this.productForm = this.fb.group({
    //   title: [],
    //   selling_points: this.fb.array([this.fb.group({point:''})])
    // })
    this.adminForm = this.fb.group({
      title:['',[Validators.required,Validators.minLength(5)]],
      authorName:['',[Validators.required,Validators.minLength(5)]],
=======
  
  ngOnInit() {
    let authName = this.adminSerivce.authData().displayName;
    console.log(authName)
    this.adminForm = this.fb.group({
      title:['',[Validators.required,Validators.minLength(5)]],
      authorName:[authName,[Validators.required,Validators.minLength(2)]],
>>>>>>> blog data
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
<<<<<<< HEAD
    this.selectedValue = this.contentForm.length; 
  }

  update(){
    // this.contentForm.setValue(this.jsonFormate.content);
    // this.adminForm.setValue(this.jsonFormate);
    // this.adminForm.controls["content"].setValue(this.jsonFormate.content)
=======
    this.selectedValue = this.contentForm.length;
  }

  update(){
>>>>>>> blog data
    this.jsonFormate.content.forEach(element => {
      let f1 = this.fb.group(element);
      this.contentForm.push(f1);
    });
  }
<<<<<<< HEAD
  
  images:string= "";
  uplaod(event:Event,name,index){
    this.adminSerivce.uploadImages(event.srcElement["files"]).then(e=>{
      if(index){
        this.contentForm.controls[index]["controls"]["image"].setValue(e as string)
      }else{
=======
  images:string ='';

  uplaod(event: Event, name, index) {
    this.adminSerivce.uploadImages(event.srcElement["files"]).then(e => {
      if (index || index == 0) {
        this.contentForm.controls[index]["controls"]["image"].setValue(e as string);
      } else {
>>>>>>> blog data
        this.adminForm.controls[name].setValue(e as string);
      }
    });
  }

<<<<<<< HEAD
  allData:Observable<any>;
  getData(item){
    this.allData = this.adminSerivce.getDataDB();
  }

  onSubmit(value:Admin){
    console.log(this.adminForm);

    this.adminSerivce.addBlog(value)
=======
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
>>>>>>> blog data
  }

  deleteSellingPoint(index) {
    this.contentForm.removeAt(index);
  }


}
