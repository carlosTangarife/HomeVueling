import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*Models using interface */
import { IFlight } from './../models/flight.model';
import { ICheckIn } from '../models/check-in.model';
import { IReservation } from '../models/reservation.model';
import { stateTab } from '../../search/enums/state-tab.enum';


/*Local Services */
import { LoginService } from './../../shared/services/login.service';
import { CookiesWrapper } from './../../shared/services/cookies-wrapper.service';


/*Environment */
import { environment } from '../../../environments/environment';

@Injectable()
export class FlightService {
  public baseUrl: string;
  public mockUser: string;
  public dataFlight: IFlight;
  public dataCheckIn: ICheckIn;
  public dataReservation: IReservation;
  public testReservation: any;
  public isLoged: boolean;
  public stateTab: string;
  public subjectStateTab: BehaviorSubject<string>;
  public stateTab$: Observable<string>;

  constructor(
    private cookiesWrapper: CookiesWrapper,
    private loginService: LoginService,
    private http: Http
  ) {
    this.dataCheckIn = { date: null };
    this.dataReservation = { date: null };
    this.dataFlight = {};
    this.subjectStateTab = new BehaviorSubject<string>('');
    this.stateTab$ = this.subjectStateTab.asObservable();
    this.baseUrl = 'https://vueling-json.herokuapp.com/index.php/';
    this.mockUser = 'test1Bad@gmail.com';
  }

  initFlight() {
    this.initFlightData();
    /* user status, can be true/false */
    this.loginService.isLoged(this.mockUser).subscribe(
    (response) => {
      this.isLoged = response;
      this.initCheckInOnline();
      this.initReservation();
    },
    (error) => {
      console.log(error);
    });
  }

  initFlightData() {
    /* get dataFligth from cookie */
    let dataFlight = this.cookiesWrapper.getCookie(environment.keylastSearchFlight);

    /* Cookies, unknown user */
    if (dataFlight) {
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
    this.stateTab = stateTab[stateTab.FlightSearch];
    this.subjectStateTab.next(this.stateTab);
  }

  initCheckInOnline() {
    if (!this.isLoged) {
      let dataCheckInOnline = this.cookiesWrapper.getCookie(environment.keyCheckInCookie);

      if (dataCheckInOnline) {
        this.stateTab = stateTab[stateTab.Checkin];
        this.subjectStateTab.next(this.stateTab);
      }
    } else {
      this.dataCheckIn.checkInWithEmail = true;
      this.dataCheckIn.checkInWithOriginDestination = false;

      const method = 'getReservation/' + this.mockUser;
      this.http.get(this.baseUrl + method).map((response) => response.json()).subscribe((response) => {
        if (response && !response.checkIn) {
          this.testReservation = response;
          this.stateTab = stateTab[stateTab.Checkin];
          this.subjectStateTab.next(this.stateTab);
        }
      });
    }
  }

  initReservation() {
    if (!this.isLoged) {
      let dataReservation = this.cookiesWrapper.getCookie(environment.keyReservation);

      if (dataReservation) {
        this.stateTab = stateTab[stateTab.YourBooking];
        this.subjectStateTab.next(this.stateTab);
      }
    } else {
      this.dataReservation.checkInWithEmail = true;
      this.dataReservation.checkInWithOriginDestination = false;

      const method = 'getReservation/' + this.mockUser;
      this.http.get(this.baseUrl + method).map((response) => response.json()).subscribe((response) => {
        if (response && response.checkIn) {
          this.testReservation = response;
          this.stateTab = stateTab[stateTab.YourBooking];
          this.subjectStateTab.next(this.stateTab);
        }
      });
    }
  }
}
