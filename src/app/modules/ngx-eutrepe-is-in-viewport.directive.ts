import { Directive, Output, HostBinding, AfterViewInit, OnDestroy, OnInit, ElementRef, EventEmitter, Input } from '@angular/core';

export interface IIntersectionConfig  {
  root?: HTMLElement;
  rootMargin?: string,
  threshold?: Array<number>
}


@Directive({
  selector: '[ngxEutrepeNgxEutrepeIsInViewport]'
})
export class NgxEutrepeIsInViewportDirective implements AfterViewInit, OnDestroy, OnInit {

  @Input() eutrepeOnActiveCallback                                    : Function = () => {console.log('is active')};
  @Input() eutrepeOnUnactiveCallback                                  : Function = () => {console.log('is unactive')};
  @Input() eutrepeOnActiveCallbackParams                              : Array<any> = [];
  @Input() eutrepeOnUnactiveCallbackParams                            : Array<any> = [];
  @Input() eutrepeInvokeOnce                                          : boolean = false;
  @Input('ngxEutrepeNgxEutrepeIsInViewport') eutrepeIntersectionConfig: IIntersectionConfig = {};


  @Output()
  inViewportChange     : EventEmitter<boolean> = new EventEmitter();
  observer             : IntersectionObserver  = null;

  private wasActived   : boolean = false;
  private isInVewport  : boolean = false;
  private settings     : IIntersectionConfig = null;

  private defaultConfig: IIntersectionConfig = {
    root      : null,
    rootMargin: '0px',
    threshold : [0]
  }

  @HostBinding('class.in-viewport')
  get getActiveClass(): boolean {
    return this.isInVewport;
  }

  @HostBinding('class.out-viewport')
  get getUnactiveClass(): boolean {
    return !this.isInVewport;
  }

  constructor(
    private el: ElementRef
  ) { }


  ngOnInit() {
    this.settings = {...this.defaultConfig, ...this.eutrepeIntersectionConfig};
  }


  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
     (entries: Array<IntersectionObserverEntry>) => {
        entries.forEach( (entry: IntersectionObserverEntry) => {

          if (entry.intersectionRatio > 0) {

            if (this.eutrepeInvokeOnce && this.observer) {
              this.observer.unobserve(this.el.nativeElement);
            }

            this.isInVewport = true;
            this.wasActived  = true;
            this.inViewportChange.emit(this.isInVewport);

            if (this.eutrepeOnActiveCallback && typeof(this.eutrepeOnActiveCallback) === 'function') {
              this.eutrepeOnActiveCallback(...this.eutrepeOnActiveCallbackParams);
            }

          } else {
            this.isInVewport = false;
            this.inViewportChange.emit(this.isInVewport);

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
