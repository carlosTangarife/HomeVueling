import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IMulti } from '../../models/flight.model';

@Component({
  selector: '[app-multicity]',
  templateUrl: './multicity.component.html'
})
export class MulticityComponent implements OnInit {
  @Input()
  dataFlight: IMulti;

  @Output()
  stateOverlay = new EventEmitter<void>();

  @Output()
  removeMulticity = new EventEmitter<boolean>();

  public isFocusedOrigin: boolean;
  public isFocusedDestination: boolean;

  constructor() { }

  ngOnInit() {
  }

  clickInput() {
    this.stateOverlay.emit();
  }

  clickMulticity() {
    this.removeMulticity.emit(false);
  }
}
