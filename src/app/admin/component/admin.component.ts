import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { Admin } from '../model/admin';
import { Observable } from 'rxjs';
import { QuillConfig } from 'ngx-quill';

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

  constructor(private fb: FormBuilder,private adminSerivce:AdminService) { }

  selectedValue: number = 0;
  selectedCar: string;

  quillConfig:QuillConfig ={
    modules:{
      toolbar:{
        container:[
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          ['clean'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
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

    // this.productForm = this.fb.group({
    //   title: [],
    //   selling_points: this.fb.array([this.fb.group({point:''})])
    // })
    this.adminForm = this.fb.group({
      title:['',[Validators.required,Validators.minLength(5)]],
      authorName:['',[Validators.required,Validators.minLength(5)]],
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
    // this.contentForm.setValue(this.jsonFormate.content);
    // this.adminForm.setValue(this.jsonFormate);
    // this.adminForm.controls["content"].setValue(this.jsonFormate.content)
    this.jsonFormate.content.forEach(element => {
      let f1 = this.fb.group(element);
      this.contentForm.push(f1);
    });
  }
  
  images:string= "";
  uplaod(event:Event,name,index){
    this.adminSerivce.uploadImages(event.srcElement["files"]).then(e=>{
      if(index){
        this.contentForm.controls[index]["controls"]["image"].setValue(e as string)
      }else{
        this.adminForm.controls[name].setValue(e as string);
      }
    });
  }

  allData:Observable<any>;
  getData(item){
    this.allData = this.adminSerivce.getDataDB();
  }

  onSubmit(value:Admin){
    console.log(this.adminForm);

    this.adminSerivce.addBlog(value)
  }

  deleteSellingPoint(index) {
    this.contentForm.removeAt(index);
  }


}
