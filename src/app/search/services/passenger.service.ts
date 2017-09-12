import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../shared/services/config.service';
import { IRulesPassenger, IMaxAndMinRule } from '../models/rules-passenger.model';
import { IPassengers, ITypePassenger } from '../models/passenger.model';
import { TYPE_PAX_LIST, TYPE_PASSENGER } from '../consts/passenger';

@Injectable()
export class PassengerService {
  private values: any;
  private configPassenger: IRulesPassenger;
  private typePassengerList: ITypePassenger[];

  private typePassengerListSubject: BehaviorSubject<ITypePassenger[]>;
  public typePassengerList$: Observable<ITypePassenger[]>;

  private adultsSubject: BehaviorSubject<number>;
  public adults$: Observable<number>;

  private childrenSubject: BehaviorSubject<number>;
  public children$: Observable<number>;

  private infantsSubject: BehaviorSubject<number>;
  public infants$: Observable<number>;

  private extraSeatSubject: BehaviorSubject<number>;
  public extraSeat$: Observable<number>;

  constructor(private _configService: ConfigService) {
    this.configPassenger = this._configService.getConfigPassengers();
    this.typePassengerList = TYPE_PAX_LIST;

    this.adultsSubject = new BehaviorSubject<number>(this.configPassenger.adults.min);
    this.adults$ = this.adultsSubject.asObservable();

    this.childrenSubject = new BehaviorSubject<number>(this.configPassenger.children.min);
    this.children$ = this.childrenSubject.asObservable();

    this.infantsSubject = new BehaviorSubject<number>(this.configPassenger.infants.min);
    this.infants$ = this.infantsSubject.asObservable();

    this.extraSeatSubject = new BehaviorSubject<number>(this.configPassenger.extras.min);
    this.extraSeat$ = this.extraSeatSubject.asObservable();

    this.typePassengerListSubject = new BehaviorSubject<ITypePassenger[]>(this.typePassengerList);
    this.typePassengerList$ = this.typePassengerListSubject.asObservable();

    this.values = {
      adults: { subject: this.adultsSubject, observer: this.adults$ },
      children: { subject: this.childrenSubject, observer: this.children$ },
      infants: { subject: this.infantsSubject, observer: this.infants$ },
      extraSeat: { subject: this.extraSeatSubject, observer: this.extraSeat$ },
    }
  }

  validatePassenger(passenger: IPassengers) {
    this.ruleAdults(passenger, this.configPassenger.adults);
    this.ruleChildren(passenger, this.configPassenger.children);
    this.ruleInfants(passenger, this.configPassenger.infants);
    this.ruleExtraSeat(passenger, this.configPassenger.extras);
    this.rulePassenger(passenger);
  }

  private ruleAdults(passenger: IPassengers, rule: IMaxAndMinRule) {
    this.ruleValidate(passenger.adults, rule.min, rule.max, TYPE_PASSENGER.adults.toString());
  }

  private ruleChildren(passenger: IPassengers, rule: IMaxAndMinRule) {
    let max = (rule.maxWhenAdults && passenger.adults > 0) ? rule.maxWhenAdults : rule.max;
    this.ruleValidate(passenger.children, rule.min, max, TYPE_PASSENGER.children.toString());
  }

  private ruleInfants(passenger: IPassengers, rule: IMaxAndMinRule) {
    let max = this.getRuleMax(passenger, rule);
    this.ruleValidate(passenger.infants, rule.min, max, TYPE_PASSENGER.infants.toString());
  }

  private ruleExtraSeat(passenger: IPassengers, rule: IMaxAndMinRule) {
    let max = this.getRuleMax(passenger, rule);
    this.ruleValidate(passenger.extraSeat, rule.min, max, TYPE_PASSENGER.extraSeat.toString());
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

  private getRuleMax(passenger: IPassengers, rule: IMaxAndMinRule): number {
    let pax = rule.max + 1;
    if (rule.dependent) {
      pax = 0;
      rule.dependent.forEach(type => {
        pax += passenger[type];
      });
    }
    return (pax > rule.max) ? rule.max : pax;
  }
}
