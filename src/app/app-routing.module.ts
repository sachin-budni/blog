import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoryComponent } from './components/category/category.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {path:'',component:BlogsComponent},
  {path:'contact',component:ContactComponent},
  {path:'blog/:id',component:BlogComponent},
  {path:'admin', loadChildren:()=>import('./components/admin/admin.module').then(m=>m.AdminModule),canLoad:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'category/:id',component:CategoryComponent},
  {path:'register',component:RegisterComponent},
//   {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
//   // {path:'admin', loadChildren:'./admin/admin.module#AdminModule',canActivate:[AuthGuard]},
  // {path:'',redirectTo:'',pathMatch:'full'},
  {path:'**',redirectTo:'',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
