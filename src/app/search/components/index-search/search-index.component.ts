import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-index-search',
  templateUrl: './search-index.component.html'
})
export class IndexSearchComponent implements OnInit {
  isFlight: boolean;
  ischeckIn: boolean;
  isReservation: boolean;

  @ViewChild('overlay') overlay: ElementRef;
  constructor(private renderer: Renderer2) {
    this.isFlight = true;
    this.ischeckIn = false;
    this.isReservation = false;
  }

  ngOnInit() {
  }

  stateTag(isFlight: boolean, ischeckIn: boolean, isReservation: boolean) {
    this.isFlight = isFlight;
    this.ischeckIn = ischeckIn;
    this.isReservation = isReservation;
  }

  toggleClassOverlay(state: boolean) {
    if (state) {
      this.renderer.addClass(this.overlay.nativeElement, 'show');
    }else {
      this.renderer.removeClass(this.overlay.nativeElement, 'show');
    }
  }

}
