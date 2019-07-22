import { Component } from '@angular/core';

@Component({
  selector: 'eutrepe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  onActive(arg1, arg2, arg3) {
    console.log(arg1); // 'some_text'
    console.log(arg2); // 1
    console.log(arg3); // true
  }

  onUnactive(arg1, arg2) {
    console.log(arg1); // 100
    console.log(arg2); // false
  }

  onChanage(event: boolean) {
    console.log('Current status: ', event);
  }
}