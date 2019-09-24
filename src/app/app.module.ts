import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxEutrepeIsInViewportDirective, WINDOW_IN_VIEWPORT } from 'ngx-eutrepe-is-in-viewport';

@NgModule({
  declarations: [
    AppComponent,
    NgxEutrepeIsInViewportDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide: WINDOW_IN_VIEWPORT, useValue: window}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
