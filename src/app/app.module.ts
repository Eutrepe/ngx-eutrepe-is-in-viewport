import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NgxEutrepeIsInViewportModule } from './modules/ngx-eutrepe-is-in-viewport.module';
import { WINDOW } from './modules/windowToken/window-token';

@NgModule({
    declarations: [
      AppComponent
    ],
    imports:      [
        BrowserModule,
        BrowserAnimationsModule,
        NgxEutrepeIsInViewportModule
    ],
    providers: [
      {provide: WINDOW, useValue: window},
    ],
    bootstrap: [ AppComponent ],
    exports: []
})
export class AppModule { }
