import { Directive, OnInit, ElementRef, Input, Renderer2  } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit {
  private _autofocus;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this._autofocus || typeof this._autofocus === 'undefined') {
      this.el.nativeElement.focus();
      this.renderer.addClass(this.el.nativeElement, 'focused');
    }
  }

  @Input()
  set appFocus(condition: boolean) {
    this._autofocus = condition !== false;
  }
}
