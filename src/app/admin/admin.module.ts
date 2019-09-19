import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './component/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminService } from './service/admin.service';
import { QuillModule } from 'ngx-quill';
import { CropImageComponent } from '../crop-image/crop-image.component';

const routes:Routes = [
  {path:"",component:AdminComponent}
]

@NgModule({
  declarations: [AdminComponent, CropImageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  entryComponents: [CropImageComponent],
  providers: [AdminService]
})
export class AdminModule { }
