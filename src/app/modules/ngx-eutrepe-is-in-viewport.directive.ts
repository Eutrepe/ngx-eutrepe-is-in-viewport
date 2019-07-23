import { Directive, Output, HostBinding, AfterViewInit, OnDestroy, OnInit, ElementRef, EventEmitter, Input } from '@angular/core';

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
  @Input() eutrepeInvokeOnce                                          : boolean             = true;
  @Input() eutrepeInvokeOnceCallbacks                                 : boolean             = true;
  @Input('ngxEutrepeIsInViewport') eutrepeIntersectionConfig          : IIntersectionConfig = {};

  @Output() eutrepeViewportChange: EventEmitter<IViewportEvent> = new EventEmitter();

  observer             : IntersectionObserver  = null;

  private wasActived   : boolean = false;
  private isInVewport  : boolean = false;
  private settings     : IIntersectionConfig = null;

  private defaultConfig: IIntersectionConfig = {
    root      : null,
    rootMargin: '0px',
    threshold : [0]
  };

  // @HostBinding('class.in-viewport')
  // get getActiveClass(): boolean {
  //   console.log(this.isInVewport);
  //   return this.isInVewport;
  // }

  // @HostBinding('class.out-viewport')
  // get getUnactiveClass(): boolean {
  //   console.log(this.isInVewport);
  //   return !this.isInVewport;
  // }

  constructor(
    private el: ElementRef
  ) { }


  ngOnInit() {
    this.settings = {...this.defaultConfig, ...this.eutrepeIntersectionConfig};
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
     (entries: Array<IntersectionObserverEntry>) => {
        entries.forEach( (entry: any) => {

          // console.log(entry.isIntersecting)

          if (entry.isIntersecting) {
            if (this.eutrepeInvokeOnce && this.observer) {
              this.observer.unobserve(this.el.nativeElement);
            }

            // console.log('a')
            entry.target.classList.add('in-viewport');

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
            // console.log('b')
            entry.target.classList.remove('in-viewport');

            if (this.wasActived && this.eutrepeOnUnactiveCallback && typeof(this.eutrepeOnUnactiveCallback) === 'function') {
              this.eutrepeOnUnactiveCallback(...this.eutrepeOnUnactiveCallbackParams);
            }
          }


          // this.isInVewport = entry.intersectionRatio > 0;

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
