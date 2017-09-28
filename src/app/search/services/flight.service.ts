import { Injectable } from '@angular/core';

/*Models using interface */
import { IFlight } from './../models/flight.model';
import { ICheckIn } from '../models/check-in.model';
import { IReservation } from '../models/reservation.model';

/*Local Services */
import { LoginService } from './../../shared/services/login.service';
import { CookiesWrapper } from './../../shared/services/cookies-wrapper.service';


/*Environment */
import { environment } from '../../../environments/environment';

@Injectable()
export class FlightService {
  public dataFlight: IFlight;
  public dataCheckIn: ICheckIn;
  public dataReservation: IReservation;
  public isLoged: boolean;

  constructor(private cookiesWrapper: CookiesWrapper, private loginService: LoginService
  ) {
    this.dataCheckIn = { date: null };
    this.dataReservation = { date: null };
    this.dataFlight = {};

    /* user status, can be true/false */
    this.isLoged = this.loginService.isLoged('testBad@gmail.com');
  }

  initFlight() {

    /* get dataFligth from cookie */
    let dataFlight = this.cookiesWrapper.getCookie(environment.keylastSearchFlight);

    /* Cookies, unknown user */
    if (dataFlight && !this.isLoged) {
      this.dataFlight = dataFlight;

      /* converts the text of the date returned the cookie into Date format */
      this.dataFlight.multi.going = new Date(dataFlight.multi.going);
      this.dataFlight.going = new Date(dataFlight.going);
      this.dataFlight.return = new Date(dataFlight.return);

      /* Data Default, unknown user*/
    } else {
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
  }

  initCheckInOnline( ) {
    let dataCheckInOnline = this.cookiesWrapper.getCookie(environment.keyCheckInCookie);
    if (dataCheckInOnline && !this.isLoged) {
      /**
       * TODO
       */
    } else {
      this.dataCheckIn.checkInWithEmail = false;
      this.dataCheckIn.checkInWithOriginDestination = true;
    }
  }

  initReservation( ) {
    let dataReservation = this.cookiesWrapper.getCookie(environment.keyReservation);
    if (dataReservation && !this.isLoged) {
      /**
       * TODO
       */
    } else {
      this.dataReservation.checkInWithEmail = true;
      this.dataReservation.checkInWithOriginDestination = false;
    }
  }
}
