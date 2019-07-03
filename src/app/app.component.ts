import { Component } from '@angular/core';
import { MediaChange,MediaObserver } from '@angular/flex-layout';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';
  flag:boolean = false;
  meadia:MediaChange;
  constructor(){
  }
  ngOnInit(){
  }
}
