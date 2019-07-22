# NgxEutrepeIsInViewport

* Directive for Angular 4 based on Intersection observe to detect element in viewport.

## Installation

`npm i --save @eutrepe/is-in-viewport@4`

You also need polyfill

`npm i --save intersection-observer`

and add this in your `src/polyfills.ts` file

`import 'intersection-observer';`

# API

#### Directive:

| Input                               | Type                 | Required                              | Description                                                            |
| ----------------------------------- | -------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| [ngxEutrepeNgxEutrepeIsInViewport]  | IIntersectionConfig  | **YES** , default config below table  | Run the plugin with user configuration or default configuration        |
| [eutrepeInvokeOnce]                 | boolean              | Optional, default: true               | If true directive invoke just once                                     |
| [eutrepeOnActiveCallback]           | Function             | Optional, default: null               | The function is started when element is in viewport                    |
| [eutrepeOnUnactiveCallback]         | Function             | Optional, default: null               | The function is started when element is out viewport                   |
| [eutrepeOnActiveCallbackParams]     | Array                | Optional, default: []                 | Array of custom argumments for onActive callback                       |
| [eutrepeOnUnactiveCallbackParams]   | Array                | Optional, default: []                 | Array of custom argumments for onUnactive callback                     |


```typescript
const defaultConfig: IIntersectionConfig = {
    root      : null,
    rootMargin: '0px',
    threshold : [0]
  }
```

<br />

# Usage

### 1) Register the `NgxEutrepeIsInViewportModule` in your app module.
 > `import { NgxEutrepeScrollToDirective } from '@eutrepe/is-in-viewport'`

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NgxEutrepeIsInViewportModule } from '@eutrepe/is-in-viewport';

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
```
 <br /><br />

 ### 2) Use the directive `(ngxEutrepeNgxEutrepeIsInViewport)`

 If element is visible in viewport the directive add `in-viewport` class to the element, otherwise add `out-viewport`

#### Basic

 ```html
<section class="section1" ngxEutrepeNgxEutrepeIsInViewport>
  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, facere.</p>
</section>
```

#### Advanced

 ```html
<section class="section1"
    [ngxEutrepeNgxEutrepeIsInViewport]="{threshold: [0, 0.5, 1]}"
    [eutrepeOnActiveCallback]="onActive.bind(this)"
    [eutrepeOnUnactiveCallback]="onUnactive.bind(this)"
    [eutrepeOnActiveCallbackParams]="['some_text', 1, true]"
    [eutrepeOnUnactiveCallbackParams]="[100, false]"
    [eutrepeInvokeOnce]="false"
    (eutrepeViewportChange)="onChanage($event)"
    >
  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, facere.</p>
</section>

<!-- Use .bind(this) for callbacks if you want use scoped variables -->

```


# Interfaces

### eutrepeViewportChange event:

```typescript
export interface IIntersectionConfig  {
  root?: HTMLElement;
  rootMargin?: string;
  threshold?: Array<number>
}
```

### ngxEutrepeNgxEutrepeIsInViewport config:

```typescript
export interface IViewportEvent  {
  el: HTMLElement;
  status: boolean;
}
```