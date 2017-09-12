import { Injectable } from '@angular/core';
import { ConfigService } from '../../../shared/services/config.service';
import { IRulesPassenger } from '../../../shared/models/rules-passenger.model';
import { ITypePassenger } from '../flight/flight.model';
import { IPassengers } from '../flight/flight.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PassengerService {
  private configPassenger: IRulesPassenger;
  private values: any;
  private typePassengerList: ITypePassenger[];
  private typePassengerListSubject = new BehaviorSubject<ITypePassenger[]>(this.typePassengerList);
  public typePassengerList$ = this.typePassengerListSubject.asObservable();
  private adultsSubject = new BehaviorSubject<number>(1);
  public adults$ = this.adultsSubject.asObservable();
  private childrenSubject = new BehaviorSubject<number>(0);
  public children$ = this.childrenSubject.asObservable();
  private infantsSubject = new BehaviorSubject<number>(0);
  public infants$ = this.infantsSubject.asObservable();
  private extraSeatSubject = new BehaviorSubject<number>(0);
  public extraSeat$ = this.extraSeatSubject.asObservable();

  constructor(private _configService: ConfigService) {
    this.configPassenger = this._configService.getConfigPassengers();

    this.typePassengerList = [
      {label: 'adults', rulAge: 'adultCaption', type: 'adults'},
      {label: 'children', rulAge: 'childrenCaption', type: 'children'},
      {label: 'infants', rulAge: 'infantCaption', type: 'infants'},
      {label: 'extraseat', rulAge: 'plusMoreInfo', type: 'extraSeat'}
    ]

    this.values = {
      adults: { subject: this.adultsSubject, observer: this.adults$ },
      children: { subject: this.childrenSubject, observer: this.children$ },
      infants: { subject: this.infantsSubject, observer: this.infants$ },
      extraSeat: { subject: this.extraSeatSubject, observer: this.extraSeat$ },
    }
  }

  validatePassenger(passenger: IPassengers) {
    this.ruleAdults(passenger);
    this.ruleChildren(passenger);
    this.ruleInfants(passenger);
    this.ruleExtraSeat(passenger);
    this.rulePassenger(passenger);
  }

  private ruleAdults(passenger: IPassengers) {
    this.ruleValidate(passenger.adults, this.configPassenger.adults.min, this.configPassenger.adults.max, 'adults');
  }

  private ruleChildren(passenger: IPassengers) {
    let max = (passenger.adults > 0) ? this.configPassenger.children.maxWhenAdults : this.configPassenger.children.max;

    this.ruleValidate(passenger.children, this.configPassenger.children.min, max, 'children');
  }

  private ruleInfants(passenger: IPassengers) {
    let maxInfants = this.configPassenger.infants.max;
    let max = (passenger.adults > maxInfants) ? maxInfants : passenger.adults;

    this.ruleValidate(passenger.infants, this.configPassenger.infants.min, max, 'infants');
  }

  private ruleExtraSeat(passenger: IPassengers) {
    let maxExtraSeat = this.configPassenger.extras.max;
    let pax = passenger.adults + passenger.children;
    let max = (pax > maxExtraSeat) ? maxExtraSeat : pax;

    this.ruleValidate(passenger.extraSeat, this.configPassenger.extras.min, max, 'extraSeat');
  }

  private rulePassenger(passenger) {
    passenger.totalPassengers = passenger.adults + passenger.children;

    if (passenger.totalPassengers > this.configPassenger.max) {
      window.location.href = this.configPassenger.urlmax;
    }
  }

  private ruleValidate(value: number, min: number, max: number, key: string) {
    let index = this.typePassengerList.findIndex(x => x.type === key);
    value = (value > max) ? max : value;
    this.values[key].subject.next(value);
    this.typePassengerList[index].data = {
      minus : value > min,
      plus: value < max,
      value: this.values[key].observer
    };
    this.typePassengerListSubject.next(this.typePassengerList);
  }
}
