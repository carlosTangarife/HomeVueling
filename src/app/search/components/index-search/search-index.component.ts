import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-index-search',
  templateUrl: './search-index.component.html'
})
export class IndexSearchComponent implements OnInit {
  isFlight: boolean;
  ischeckIn: boolean;
  isReservation: boolean;
  showOverlay: boolean;

  constructor() {
    this.isFlight = true;
    this.ischeckIn = false;
    this.isReservation = false;
    this.showOverlay = false;
  }

  ngOnInit() {
  }

  stateTag(isFlight: boolean, ischeckIn: boolean, isReservation: boolean) {
    this.isFlight = isFlight;
    this.ischeckIn = ischeckIn;
    this.isReservation = isReservation;
  }

  toggleClassOverlay() {
      this.showOverlay = !this.showOverlay;
  }

}
