import { Component, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { BlogService } from './services/blog.service';
import { map } from 'rxjs/operators';
import { SearchComponent } from './components/search/search.component';
import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortalDirective, Portal } from '@angular/cdk/portal';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  categories:Observable<any>;
  recentlyPosts:Observable<any>;
  date= new Date();
  isMenuOpen:boolean = false;
  $User:Observable<User>;
  
  @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<Portal<any>>;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private blogService:BlogService,private dialog:MatDialog,public overlay: Overlay,
    private authService:AuthService,private router:Router){
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('/assets/facebook.svg'));
    iconRegistry.addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('/assets/twitter.svg'));
    iconRegistry.addSvgIcon('instagram', sanitizer.bypassSecurityTrustResourceUrl('/assets/instagram.svg'));
    iconRegistry.addSvgIcon('whatsapp', sanitizer.bypassSecurityTrustResourceUrl('/assets/whatsapp.svg'));
    this.$User = this.authService.authState;
    this.categories =this.blogService.getCategories().pipe(
      map(data=>{
        return data.map(d=>{
          return d;
        })
      })
    )
    this.recentlyPosts = this.blogService.recentPosts().pipe(
      map(blogs=>{
        return blogs.map(blog=>{
          return {key:blog.key,...blog.payload.val()}
        })
      })
    );
  }

  openSearchDailog(){
      const dialogRef = this.dialog.open(SearchComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }
  Logout(){
    this.authService.signOut()
  }
}
