import { Injectable } from '@angular/core';

/*Models using interface */
import { IFlight } from './../models/flight.model';
import { ICheckIn } from '../models/check-in.model';
import { IReservation } from '../models/reservation.model';


/*Local Services */
import { CookiesWrapper } from './../../shared/services/cookies-wrapper.service';

/*Environment */
import { environment } from '../../../environments/environment';

@Injectable()
export class FlightService {
  private dataFlight: IFlight;
  public dataCheckIn: ICheckIn;
  public dataReservation: IReservation;
  constructor(private cookiesWrapper: CookiesWrapper) { }

  initFlight(): IFlight {
    let dataFlight = this.cookiesWrapper.getCookie(environment.keylastSearchFlight);
    if (dataFlight) {
      this.dataFlight = dataFlight;
      /* converts the text of the date returned the cookie into Date format */
      this.dataFlight.multi.going = new Date(dataFlight.multi.going);
      this.dataFlight.going = new Date(dataFlight.going);
      this.dataFlight.return = new Date(dataFlight.return);
    }else {
      let today = new Date();
      today.setHours(0, 0, 0, 0);

      this.dataFlight = {
      origin: {
        code: 'ALC',
        name: 'Alicante'
      },
      destination: {
        code: '',
        name: ''
      },
      multi: {
        isActive: false,
        origin: {
          code: '',
          name: ''
        },
        destination: {
          code: '',
          name: ''
        },
        going: null
      },
      passengers: {
        Adults : 1,
        Infants : 0,
        Children: 0,
        ExtraSeat: 0,
        TotalPassengers: 1
      },
      discount: {
        value: ''
      },
      going: new Date(today.getTime()),
      return: new Date(today.getDate() + 7)
      };
    }
    return this.dataFlight
  }

  initCheckInOnline( ): ICheckIn {
    let dataCheckInOnline = this.cookiesWrapper.getCookie(environment.keyCheckInCookie);
    if (dataCheckInOnline) {
    }else {
      this.dataCheckIn.checkInWithEmail = true;
    }
    return this.dataCheckIn;
  }

  initReservation( ): IReservation {
    let dataReservation = this.cookiesWrapper.getCookie(environment.keyReservation);
    if (dataReservation) {
    }else {
      this.dataReservation.checkInWithEmail = true;
    }
    return this.dataReservation;
  }
}
