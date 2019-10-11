import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './component/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminService } from './service/admin.service';
import { QuillModule } from 'ngx-quill';
<<<<<<< HEAD
=======
import { CropImageComponent } from '../crop-image/crop-image.component';

>>>>>>> blog data
const routes:Routes = [
  {path:"",component:AdminComponent}
]

@NgModule({
<<<<<<< HEAD
  declarations: [AdminComponent],
=======
  declarations: [AdminComponent, CropImageComponent],
>>>>>>> blog data
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
<<<<<<< HEAD
    QuillModule
  ],
  providers:[AdminService]
=======
    QuillModule.forRoot()
  ],
  entryComponents: [CropImageComponent],
  providers: [AdminService]
>>>>>>> blog data
})
export class AdminModule { }
