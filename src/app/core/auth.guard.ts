import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
=======
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { first } from 'rxjs/operators';
>>>>>>> willntrix.v1

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private loginService:LoginService,private route:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise<any>((resolve,reject)=>{
        this.loginService.getUserLogin()
        .then(user=>{
          return resolve(true);
        },err=>{
          this.route.navigate(["login"]);
          return resolve(false);
        });
      });
    // return true;
  }
  canActivateChild(
=======
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService:AuthService,private router:Router){

  }
  canActivate(
>>>>>>> willntrix.v1
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
<<<<<<< HEAD
      return new Promise<any>((resolve,reject)=>{
        this.loginService.getUserLogin()
        .then(user=>{
          return resolve(true);
        },err=>{
          this.route.navigate(["login"]);
          return resolve(false);
        });
      });
=======
    return this.usersData();
  }

  usersData():Promise<any>{
    let promise = new Promise((res,rej)=>{
      this.authService.authState.pipe(first()).toPromise().then(user=>{
        if(user){
          return res(true);
        }else{
          this.router.navigate(['login'])
          return rej(false)
        }
      })
    })
    return promise;
>>>>>>> willntrix.v1
  }
}
