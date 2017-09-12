import { Injectable } from '@angular/core';
import { ConfigService } from '../../../shared/services/config.service';
import { IRulesPassenger } from '../../../shared/models/rules-passenger.model';
import { ITypePassenger } from '../flight/flight.model';
import { IPassengers } from '../flight/flight.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PassengerService {
  private configPassenger: IRulesPassenger;
  private typePassengerList: ITypePassenger[];
  private typePassengerListSubject = new Subject<ITypePassenger[]>();
  public typePassengerList$ = this.typePassengerListSubject.asObservable();

  constructor(private _configService: ConfigService) {
    this.configPassenger = this._configService.getConfigPassengers();

    this.typePassengerList = [
      {label: 'adults', rulAge: 'adultCaption', type: 'adults'},
      {label: 'children', rulAge: 'childrenCaption', type: 'children'},
      {label: 'infants', rulAge: 'infantCaption', type: 'infants'},
      {label: 'extraseat', rulAge: 'plusMoreInfo', type: 'extraSeat'}
    ]
  }

  validatePassenger(passenger: IPassengers) {
    this.ruleAdults(passenger);
    this.ruleChildren(passenger);
    this.ruleInfants(passenger);
    this.ruleExtraSeat(passenger);
    this.rulePassenger(passenger);

    this.typePassengerListSubject.next(this.typePassengerList);
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
    this.typePassengerList[index].data = {
      minus : value > min,
      plus: value < max,
      value: value
    };
  }
}
