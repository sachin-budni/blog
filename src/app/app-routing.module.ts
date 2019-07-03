import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'blog',component:BlogsComponent},
  {path:'blog/:id',component:BlogComponent},
  {path:'admin', loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule),canActivate:[AuthGuard]},
  // {path:'admin', loadChildren:'./admin/admin.module#AdminModule',canActivate:[AuthGuard]},
  {path:'',redirectTo:'blog',pathMatch:'full'},
  {path:'**',redirectTo:'blog',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
