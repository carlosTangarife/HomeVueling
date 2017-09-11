import { IRulesPassenger } from '../../../shared/models/rules-passenger.model';
import { ITypePassenger } from '../flight/flight.model';
import { IPassengers } from '../flight/flight.model';
import { ConfigService } from '../../../shared/services/config.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PassengerService {
  private configPassenger: IRulesPassenger;
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
    this.ruleAdults(passenger);
    this.ruleChildren(passenger);
    this.ruleInfants(passenger);
    this.ruleExtraSeat(passenger);
    this.rulePassenger(passenger);
  }

  private ruleAdults(passenger: IPassengers) {
    if (passenger.adults > this.configPassenger.adults.min && passenger.adults < this.configPassenger.adults.max) {
      this.typePassengerList[0].data = {
        minus : true,
        plus: true,
        value: passenger.adults
      }
    }else if (passenger.adults === this.configPassenger.adults.min) {
      this.typePassengerList[0].data = {
        minus : false,
        plus: true,
        value: passenger.adults
      }
    }
  }

  private ruleChildren(passenger: IPassengers) {
    let max = (passenger.adults > 0) ? this.configPassenger.children.maxWhenAdults : this.configPassenger.children.max;

    if (passenger.children > this.configPassenger.children.min && passenger.children < max) {
      this.typePassengerList[1].data = {
        minus : true,
        plus: true,
        value: passenger.children
      }
    }else if (passenger.children === this.configPassenger.children.min) {
      this.typePassengerList[1].data = {
        minus : false,
        plus: true,
        value: passenger.children
      }
    }else if (passenger.children === max) {
      this.typePassengerList[1].data = {
        minus : true,
        plus: false,
        value: passenger.children
      }
    }
  }

  private ruleInfants(passenger: IPassengers) {
    let maxInfants = this.configPassenger.infants.max;
    let max = (passenger.adults > maxInfants) ? maxInfants : passenger.adults;

    if (passenger.infants > this.configPassenger.infants.min && passenger.infants < max) {
      this.typePassengerList[2].data = {
        minus : true,
        plus: true,
        value: passenger.infants
      }
    }else if (passenger.infants === this.configPassenger.infants.min) {
      this.typePassengerList[2].data = {
        minus : false,
        plus: true,
        value: passenger.infants
      }
    }else if (passenger.infants === max) {
      this.typePassengerList[2].data = {
        minus : true,
        plus: false,
        value: passenger.infants
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
