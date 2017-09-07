import { Component, OnInit, Input, EventEmitter, Output, AfterContentInit } from '@angular/core';
import { ITypePassengerList, IPassenger } from './type-passenger.model';
import { TypePassengerService } from './type-passenger.service';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: "app-type-passenger",
  templateUrl: "./type-passenger.component.html"
})
export class TypePassengerComponent implements OnInit, AfterContentInit {

  @Input() typePassengerList: ITypePassengerList;

  @Output() eventPassengers = new EventEmitter<IPassenger>();

  constructor(public _tp: TypePassengerService) {}

  ngOnInit() {

  }

  ngAfterContentInit() {
    this._tp.passenger$.subscribe(passengers => {
      this.eventPassengers.next(passengers);
    });
  }
}
