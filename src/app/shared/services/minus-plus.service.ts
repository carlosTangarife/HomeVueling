import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MinusPlusService {
  public value: number;
  private subjectValue = new Subject<number>();
  public value$ = this.subjectValue.asObservable();
  // private subjectTotalPassenger = new Subject<IPassengers>();
  // public passenger$ = this.subjectTotalPassenger.asObservable();

  constructor() {}

  initService(value: number) {
    this.value = value;
    this.setSubjectValue();
    // this.totalPassenger();
  }

  increase() {
    this.value += 1;
    this.setSubjectValue();
  }

  decrease() {
    this.value -= 1;
    this.setSubjectValue();
  }

  private setSubjectValue() {
    this.subjectValue.next(this.value);
  }

  // totalPassenger() {
  //   this.passenger.totalPassengers = this.passenger.adult + this.passenger.infants + this.passenger.children;
  //   this.subjectTotalPassenger.next(this.passenger);

  //   if (this.passenger.totalPassengers && this.passenger.totalPassengers > 25) {
  //     window.location.href = 'https://groupsnew.vueling.com/web';
  //   }
  // }
}
