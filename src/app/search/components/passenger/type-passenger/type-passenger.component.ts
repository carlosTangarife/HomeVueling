import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITypePassenger } from '../../../models/passenger.model';
import { IPassengers } from '../../../models/passenger.model';

@Component({
  selector: '[app-type-passenger]',
  templateUrl: './type-passenger.component.html'
})
export class TypePassengerComponent implements OnInit {
  @Input()
  typePassenger: ITypePassenger;

  @Input()
  passengers: IPassengers;

  @Output()
  changePassenger = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  changeValue(value: number) {
    this.passengers[this.typePassenger.type] = value;
    this.changePassenger.emit();
  }

  changeOtherValue(value: number) {
    this.passengers[this.typePassenger.type] = value;
  }

  isExtraSeat(): boolean {
    return this.typePassenger.type === 'extraSeat';
  }
}
