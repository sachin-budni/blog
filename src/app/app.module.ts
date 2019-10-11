import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
<<<<<<< HEAD
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
<<<<<<< HEAD
import { AuthGuard } from './auth.guard';
import { DemoMaterialModule } from './material.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
=======
import { AuthGuard } from './core/auth.guard';
import { DemoMaterialModule } from './material.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment.prod';
>>>>>>> blog data
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BlogService } from './blog.service';
import { SafePipe } from './safe.pipe';
<<<<<<< HEAD

=======
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from './core/login.service';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './core/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HeaderComponent } from './header/header.component';
>>>>>>> blog data
=======
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DemoMaterialModule } from './material.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment.prod';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpClientModule } from '@angular/common/http';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { VideoPipe } from './pipes/video.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TermComponent } from './components/term/term.component';
import { SearchComponent } from './components/search/search.component';
import { CategoryComponent } from './components/category/category.component';
import { AuthGuard } from './core/auth.guard';
>>>>>>> willntrix.v1
@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
<<<<<<< HEAD
    BlogComponent,
<<<<<<< HEAD
    SafePipe
=======
    SafePipe,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    HeaderComponent,
>>>>>>> blog data
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    DemoMaterialModule,
    MDBBootstrapModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,AngularFireAuthModule,AngularFireStorageModule
  ],
  providers: [AuthGuard,BlogService],
=======
=======
    ContactComponent,
    BlogComponent,
    VideoPipe,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    TermComponent,
    SearchComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
>>>>>>> willntrix.v1
    FormsModule,
    DemoMaterialModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,AngularFireAuthModule,AngularFireStorageModule,
<<<<<<< HEAD
    AngularFirestoreModule
  ],
  providers: [AuthGuard,BlogService,LoginService,AuthService],
>>>>>>> blog data
=======
    AngularFirestoreModule,
    HttpClientModule
  ],
  entryComponents:[TermComponent,SearchComponent],
  providers: [AuthGuard],
>>>>>>> willntrix.v1
  bootstrap: [AppComponent]
})
export class AppModule { }
