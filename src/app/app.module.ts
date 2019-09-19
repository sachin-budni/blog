import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthGuard } from './core/auth.guard';
import { DemoMaterialModule } from './material.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment.prod';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BlogService } from './blog.service';
import { SafePipe } from './safe.pipe';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from './core/login.service';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './core/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    BlogComponent,
    SafePipe,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    DemoMaterialModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,AngularFireAuthModule,AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [AuthGuard,BlogService,LoginService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
