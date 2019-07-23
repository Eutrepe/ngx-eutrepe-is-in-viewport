import { Directive, Output, HostBinding, AfterViewInit, OnDestroy, OnInit, ElementRef, EventEmitter, Input, Inject } from '@angular/core';

import { WINDOW } from './windowToken/window-token';
import { DOCUMENT } from '@angular/common';

export interface IIntersectionConfig  {
  root?: HTMLElement;
  rootMargin?: string;
  threshold?: Array<number>;
}

export interface IViewportEvent  {
  el: HTMLElement;
  status: boolean;
}

@Directive({
  selector: '[ngxEutrepeIsInViewport]'
})
export class NgxEutrepeIsInViewportDirective implements AfterViewInit, OnDestroy, OnInit {

  @Input() eutrepeOnActiveCallback                                    : Function            = null;
  @Input() eutrepeOnUnactiveCallback                                  : Function            = null;
  @Input() eutrepeOnActiveCallbackParams                              : Array<any>          = [];
  @Input() eutrepeOnUnactiveCallbackParams                            : Array<any>          = [];
  @Input() eutrepeInvokeOnce                                          : boolean             = false;
  @Input() eutrepeActiveClass                                         : string              = 'in-viewport';
  @Input('ngxEutrepeIsInViewport') eutrepeIntersectionConfig          : IIntersectionConfig = {};

  @Output() eutrepeViewportChange: EventEmitter<IViewportEvent> = new EventEmitter();

  observer             : IntersectionObserver  = null;

  private wasActived   : boolean = false;
  private isInVewport  : boolean = false;
  private settings     : IIntersectionConfig = null;

  private defaultConfig: IIntersectionConfig = {
    root      : null,
    rootMargin: '0',
    threshold : [0]
  };


  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef
  ) {
    if (!this.window) {
      this.window = this.document.defaultView;
    }

    this.edgePolyfill();
  }


  private edgePolyfill() {
    if ('IntersectionObserver' in this.window &&
      'IntersectionObserverEntry' in this.window &&
      'intersectionRatio' in this.window['IntersectionObserverEntry']['prototype'] &&
      !('isIntersecting' in IntersectionObserverEntry.prototype)) {

      Object.defineProperty(this.window['IntersectionObserverEntry']['prototype'], 'isIntersecting', {
        get: function () {
          return this.intersectionRatio > 0
        }
      })
    }
  }


  ngOnInit() {
    this.settings = {...this.defaultConfig, ...this.eutrepeIntersectionConfig};
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
     (entries: Array<any>) => {
        entries.forEach( (entry: any) => {

          if (entry.isIntersecting) {
            if (this.eutrepeInvokeOnce && this.observer) {
              this.observer.unobserve(this.el.nativeElement);
            }

            entry.target.classList.add(this.eutrepeActiveClass);

            this.wasActived  = true;
            this.isInVewport = true;
            this.eutrepeViewportChange.emit({
              el: this.el.nativeElement,
              status: this.isInVewport
            });

            if (this.eutrepeOnActiveCallback && typeof(this.eutrepeOnActiveCallback) === 'function') {
              this.eutrepeOnActiveCallback(...this.eutrepeOnActiveCallbackParams);
            }

          } else {
            this.isInVewport = false;
            this.eutrepeViewportChange.emit({
              el: this.el.nativeElement,
              status: this.isInVewport
            });
            entry.target.classList.remove(this.eutrepeActiveClass);

            if (this.wasActived && this.eutrepeOnUnactiveCallback && typeof(this.eutrepeOnUnactiveCallback) === 'function') {
              this.eutrepeOnUnactiveCallback(...this.eutrepeOnUnactiveCallbackParams);
            }
          }
        });
     }, this.settings
    );

    this.observer.observe(this.el.nativeElement);

  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.unobserve(this.el.nativeElement);
    }
  }
}
