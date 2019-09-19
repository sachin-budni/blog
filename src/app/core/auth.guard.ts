import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
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
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise<any>((resolve,reject)=>{
        this.loginService.getUserLogin()
        .then(user=>{
          return resolve(true);
        },err=>{
          this.route.navigate(["login"]);
          return resolve(false);
        });
      });
  }
}
