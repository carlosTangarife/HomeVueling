import { ITypePassenger } from '../flight/flight.model';
import { IPassengers } from '../flight/flight.model';
import { ConfigService } from '../../../shared/services/config.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PassengerService {
  private configPassenger: any;
  public typePassengerList: Array<ITypePassenger>;

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
    this.ruleAdults(passenger.adults);
    this.ruleInfants(passenger.infants, passenger.adults);
    this.ruleChildren(passenger.children, passenger.adults);
    this.ruleExtraSeat(passenger);
    this.rulePassenger(passenger);
  }

  private ruleAdults(adult: number) {
    if (adult > this.configPassenger.adults.min && adult < this.configPassenger.adults.max) {
      this.typePassengerList[0].data = {
        minus : true,
        plus: true,
        value: adult
      }
    }else if (adult === this.configPassenger.adults.min) {
      this.typePassengerList[0].data = {
        minus : false,
        plus: true,
        value: adult
      }
    }
  }

  private ruleInfants(infants: number, adult: number) {
    let maxInfants = this.configPassenger.infants.max;
    let max = (adult > maxInfants) ? maxInfants : adult;

    if (infants > this.configPassenger.infants.min && infants < max) {
      this.typePassengerList[2].data = {
        minus : true,
        plus: true,
        value: infants
      }
    }else if (infants === this.configPassenger.infants.min) {
      this.typePassengerList[2].data = {
        minus : false,
        plus: true,
        value: infants
      }
    }else if (infants === max) {
      this.typePassengerList[2].data = {
        minus : true,
        plus: false,
        value: infants
      }
    }
  }

  private ruleChildren(children: number, adult: number) {
    let max = (adult > 0) ? this.configPassenger.children.maxWhenAdults : this.configPassenger.children.max;

    if (children > this.configPassenger.children.min && children < max) {
      this.typePassengerList[1].data = {
        minus : true,
        plus: true,
        value: children
      }
    }else if (children === this.configPassenger.children.min) {
      this.typePassengerList[1].data = {
        minus : false,
        plus: true,
        value: children
      }
    }else if (children === max) {
      this.typePassengerList[1].data = {
        minus : true,
        plus: false,
        value: children
      }
    }
  }

  private ruleExtraSeat(passenger: IPassengers) {
    let maxExtraSeat = this.configPassenger.extras.max;
    let pax = passenger.adults + passenger.children;
    let max = (pax > maxExtraSeat) ? maxExtraSeat : pax;

    if (passenger.extraSeat > this.configPassenger.extras.min && passenger.extraSeat < max) {
      this.typePassengerList[3].data = {
        minus : true,
        plus: true,
        value: passenger.extraSeat
      }
    }else if (passenger.extraSeat === this.configPassenger.extras.min) {
      this.typePassengerList[3].data = {
        minus : false,
        plus: true,
        value: passenger.extraSeat
      }
    }else if (passenger.extraSeat === max) {
      this.typePassengerList[3].data = {
        minus : true,
        plus: false,
        value: passenger.extraSeat
      }
    }
  }

  private rulePassenger(passenger) {
    passenger.totalPassengers = passenger.adults + passenger.children;

    if (passenger.totalPassengers > this.configPassenger.max) {
      window.location.href = this.configPassenger.urlmax;
    }
  }
}
