import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NgxEutrepeIsInViewportModule } from './modules/ngx-eutrepe-is-in-viewport.module';

@NgModule({
    declarations: [
      AppComponent
    ],
    imports:      [
        BrowserModule,
        BrowserAnimationsModule,
        NgxEutrepeIsInViewportModule
    ],
    providers: [ ],
    bootstrap: [ AppComponent ],
    exports: []
})
export class AppModule { }
