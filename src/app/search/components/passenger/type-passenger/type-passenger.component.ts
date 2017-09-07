import { Component, OnInit, Input, EventEmitter, Output, AfterContentInit } from '@angular/core';
import { ITypePassengerList, IPassenger } from './type-passenger.model';
import { TypePassengerService } from './type-passenger.service';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: '[app-type-passenger]',
  templateUrl: './type-passenger.component.html'
})
export class TypePassengerComponent implements OnInit {

  @Input() typePassengerList: ITypePassengerList;

  @Output() eventPassengers = new EventEmitter<IPassenger>();

  constructor(public _tp: TypePassengerService) { }

  ngOnInit() {

    // this will call the service and subscribe and detect all the changes that occurred in the passenger data model
    this._tp.passenger$.subscribe(passengers => {
      this.eventPassengers.next(passengers);
    });

    // this method initializes the data contract and calls the observer to emit the real state of the data model of passangers
    this._tp.initService();
  }
}
