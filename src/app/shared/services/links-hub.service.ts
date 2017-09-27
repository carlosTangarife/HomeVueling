import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
@Injectable()
export class LinksHubService {
  public url: string;
  constructor() {
    this.url = 'https://skysales-bilbo.vueling.com/LinksHub.ashx?';
  }

  linkReservation(checkInWithEmail: boolean) {
    let queryString = new URLSearchParams();
    if (checkInWithEmail) {
        queryString.set('email', 'estefania.marin@newshore.es');
      } else {
        queryString.set('origin', 'AMS');
        queryString.set('day', '19');
        queryString.set('month', '4');
        queryString.set('year', '2017');
      }
      queryString.set('pnr', 'LYM1SD');
      queryString.set('event', 'change');
      queryString.set('flow', 'c3');
      queryString.set('culture', 'es-ES');

      let newHref = this.url + queryString.toString();

      // <- This is what makes it open in a new window.
      window.open(newHref, '_blank' );
  }

  linkCheckInOnline(checkInWithEmail: boolean) {
    let queryString = new URLSearchParams();

    if (checkInWithEmail) {
      queryString.set('email', 'estefania.marin@newshore.es');
    } else {
      queryString.set('origin', 'AMS');
      queryString.set('day', '19');
      queryString.set('month', '4');
      queryString.set('year', '2017');
    }
    queryString.set('pnr', 'LYM1SD');
    queryString.set('event', 'checkin');
    queryString.set('flow', 'c3');
    queryString.set('culture', 'es-ES');

    let newHref = this.url + queryString.toString();

    // <- This is what makes it open in a new window.
    window.open(newHref, '_blank' );
  }

  linkSearchFligth() {}
}
