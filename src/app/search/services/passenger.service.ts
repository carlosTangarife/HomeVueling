import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../shared/services/config.service';
import { IPassengerRules, IMaxAndMinRule } from '../models/rules-passenger.model';
import { IPassengers, ITypePassenger } from '../models/passenger.model';
import { TYPE_PAX_LIST } from '../consts/passenger';
import { TYPE_PASSENGER } from '../enums/type-passenger.enum'
import { RulesPax } from 'app/search/services/rules';

@Injectable()
export class PassengerService {
  private values: any;
  private configPassenger: IPassengerRules;
  private typePassengerList: ITypePassenger[];
  private rulePax: RulesPax.IRulePassenger;

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
    this.initTypePassengers();
    this.initObservables();
    this.initValues();
  }

  validatePassenger(passenger: IPassengers) {
    this.typePassengerList.forEach(type => {
      let name = type.type + 'Rule';
      this.rulePax = new RulesPax[name];
      let data = this.rulePax.validate(passenger, this.configPassenger[type.type]);
      this.values[type.type].subject.next(data.value);
      type.data = {
        minus : data.minus,
        plus: data.plus,
        value: this.values[type.type].observer
      };
      this.typePassengerListSubject.next(this.typePassengerList);
    });
    this.rulePassenger(passenger);
  }

  private initTypePassengers() {
    this.typePassengerList = TYPE_PAX_LIST;
    if (!this.configPassenger.ExtraSeatEnabled) {
      let index = this.typePassengerList.findIndex(x => x.type === TYPE_PASSENGER[TYPE_PASSENGER.ExtraSeat]);
      this.typePassengerList.splice(index, 1);
    }
  }

  private initObservables() {
    this.adultsSubject = new BehaviorSubject<number>(this.configPassenger.Adults.Min);
    this.adults$ = this.adultsSubject.asObservable();

    this.childrenSubject = new BehaviorSubject<number>(this.configPassenger.Children.Min);
    this.children$ = this.childrenSubject.asObservable();

    this.infantsSubject = new BehaviorSubject<number>(this.configPassenger.Infants.Min);
    this.infants$ = this.infantsSubject.asObservable();

    this.extraSeatSubject = new BehaviorSubject<number>(this.configPassenger.ExtraSeat.Min);
    this.extraSeat$ = this.extraSeatSubject.asObservable();

    this.typePassengerListSubject = new BehaviorSubject<ITypePassenger[]>(this.typePassengerList);
    this.typePassengerList$ = this.typePassengerListSubject.asObservable();
  }

  private initValues() {
    this.values = {
      Adults: { subject: this.adultsSubject, observer: this.adults$ },
      Children: { subject: this.childrenSubject, observer: this.children$ },
      Infants: { subject: this.infantsSubject, observer: this.infants$ },
      ExtraSeat: { subject: this.extraSeatSubject, observer: this.extraSeat$ },
    };
  }

  private rulePassenger(passenger) {
    passenger.TotalPassengers = passenger.Adults + passenger.Children;
    if (passenger.TotalPassengers > this.configPassenger.Max) {
      window.location.href = this.configPassenger.UrlMax;
    }
  }
}
