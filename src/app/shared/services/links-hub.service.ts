import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { ICheckIn } from './../../search/models/check-in.model';

@Injectable()
export class LinksHubService {
  public url: string;
  constructor() {
    this.url = 'https://skysales-bilbo.vueling.com/LinksHub.ashx?';
  }

  linkReservation(checkInWithEmail: boolean, dataCheckIn: ICheckIn) {
    let queryString = new URLSearchParams();
    if (checkInWithEmail) {
        queryString.set('email', dataCheckIn.email);
      } else {
        queryString.set('origin', dataCheckIn.originOrDestinationCode);
        queryString.set('day', dataCheckIn.date.getDate().toString());
        queryString.set('month', (dataCheckIn.date.getMonth() + 1).toString());
        queryString.set('year', dataCheckIn.date.getFullYear().toString());
      }
      queryString.set('pnr', dataCheckIn.codeBooking);
      queryString.set('event', 'change');
      queryString.set('flow', 'c3');
      queryString.set('culture', 'es-ES');

      let newHref = this.url + queryString.toString();

      // <- This is what makes it open in a new window.
      window.open(newHref, '_blank' );
  }

  linkCheckInOnline(checkInWithEmail: boolean, dataCheckIn: ICheckIn) {
    let queryString = new URLSearchParams();

    if (checkInWithEmail) {
      queryString.set('email', dataCheckIn.email);
    } else {
      queryString.set('origin', dataCheckIn.originOrDestinationCode);
      queryString.set('day', dataCheckIn.date.getDate().toString());
      queryString.set('month', (dataCheckIn.date.getMonth() + 1).toString());
      queryString.set('year', dataCheckIn.date.getFullYear().toString());
    }
    queryString.set('pnr', dataCheckIn.codeBooking);
    queryString.set('event', 'checkin');
    queryString.set('flow', 'c3');
    queryString.set('culture', 'es-ES');

    let newHref = this.url + queryString.toString();

    // <- This is what makes it open in a new window.
    window.open(newHref, '_blank' );
  }

  linkSearchFligth() {}
}
