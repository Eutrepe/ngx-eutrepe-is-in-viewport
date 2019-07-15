import { NgModule } from '@angular/core';
import { NgxEutrepeIsInViewportComponent } from './ngx-eutrepe-is-in-viewport.component';
import { IsInViewportDirective } from './is-in-viewport.directive';
import { NgxEutrepeIsInViewportDirective } from './ngx-eutrepe-is-in-viewport.directive';

@NgModule({
  declarations: [NgxEutrepeIsInViewportComponent, IsInViewportDirective, NgxEutrepeIsInViewportDirective],
  imports: [
  ],
  exports: [NgxEutrepeIsInViewportComponent]
})
export class NgxEutrepeIsInViewportModule { }
