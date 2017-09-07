import { Injectable } from '@angular/core';
import { ITypePassengerList, IPassenger } from './type-passenger.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypePassengerService {
  public passenger: IPassenger;
  private subjectTotalPassenger = new Subject<IPassenger>();
  public passenger$ = this.subjectTotalPassenger.asObservable();

  constructor() {
    this.passenger = {
      adult : 1,
      babies : 0,
      children: 0,
      extraSeat: 0,
      totalPassengers: 0
    }
  }

  morePassenger(typePassenger?: string) {
    this.passenger[typePassenger] += 1;
    this.totalPassenger();
  }

  lessPassenger(typePassenger?: string) {
    this.passenger[typePassenger] -= 1;
    this.totalPassenger();
  }

  totalPassenger() {
    this.passenger.totalPassengers = this.passenger.adult + this.passenger.babies + this.passenger.children;
    this.subjectTotalPassenger.next(this.passenger);

    if (this.passenger.totalPassengers && this.passenger.totalPassengers > 25) {
      window.location.href = 'https://groupsnew.vueling.com/web';
    }
  }
}
