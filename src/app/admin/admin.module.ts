import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './component/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminService } from './service/admin.service';
import { QuillModule } from 'ngx-quill';
const routes:Routes = [
  {path:"",component:AdminComponent}
]

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule
  ],
  providers:[AdminService]
})
export class AdminModule { }
