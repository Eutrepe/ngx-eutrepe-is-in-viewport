import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { WINDOW } from './modules/windowToken/window-token';
import { NgxEutrepeIsInViewportModule } from './modules/ngx-eutrepe-is-in-viewport.module';
import { NgxEutrepeIsInViewportService } from './modules/ngx-eutrepe-is-in-viewport.service';

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
      NgxEutrepeIsInViewportService
    ],
    bootstrap: [ AppComponent ],
    exports: []
})
export class AppModule {
}

