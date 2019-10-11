import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';
<<<<<<< HEAD
import { AuthGuard } from './auth.guard';
=======
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
>>>>>>> blog data

const routes: Routes = [
  {path:'blog',component:BlogsComponent},
  {path:'blog/:id',component:BlogComponent},
<<<<<<< HEAD
  {path:'admin', loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule),canActivate:[AuthGuard]},
=======
  {path:'admin', loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule),canLoad:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
>>>>>>> blog data
  // {path:'admin', loadChildren:'./admin/admin.module#AdminModule',canActivate:[AuthGuard]},
  {path:'',redirectTo:'blog',pathMatch:'full'},
  {path:'**',redirectTo:'blog',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
