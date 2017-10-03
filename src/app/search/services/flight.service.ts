import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/*Models using interface */
import { IFlight } from './../models/flight.model';
import { ICheckIn } from '../models/check-in.model';
import { IReservation } from '../models/reservation.model';
import { stateTab } from '../../search/enums/state-tab.enum';
import { IStation } from './../../shared/models/station.model';


/*Local Services */
import { LoginService } from './../../shared/services/login.service';
import { ConfigService } from './../../shared/services/config.service';
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
  public isLoged: boolean;
  public stateTab: string;
  public subjectStateTab: Subject<string>;
  public stateTab$: Observable<string>;
  public dataCheckInOnline: any;
  public dataBooking: any;

  constructor(
    private cookiesWrapper: CookiesWrapper,
    private loginService: LoginService,
    private http: Http,
    private jsonp: Jsonp,
    private configService: ConfigService
  ) {
    this.dataCheckIn = { date: null };
    this.dataReservation = { date: null };
    this.dataFlight = {};
    this.subjectStateTab = new Subject<string>();
    this.stateTab$ = this.subjectStateTab.asObservable();
    this.baseUrl = 'https://vueling-json.herokuapp.com/index.php/';
    this.mockUser = 'test1@gmail.com';
    this.dataCheckInOnline = this.cookiesWrapper.getCookie(environment.keyCheckInCookie);
    this.dataBooking = this.cookiesWrapper.getCookie(environment.keyReservation);
  }

  initFlight() {
    this.initFlightData();
    /* user status, can be true/false */
    this.loginService.isLoged(this.mockUser).subscribe(
    (isLoged) => {
      this.isLoged = isLoged;
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
            origin: this.getDifaultStation(),
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

  initCheckInOnline() {
    if (!this.isLoged) {
      if (this.dataCheckInOnline) {
        this.stateTab = stateTab[stateTab.Checkin];
        this.subjectStateTab.next(this.stateTab);
      }
    } else {
      this.dataCheckIn.checkInWithEmail = true;
      this.dataCheckIn.checkInWithOriginDestination = false;

      const method = 'getReservation/' + this.mockUser;
      this.http.get(this.baseUrl + method).map((response) => response.json()).subscribe(
        (response) => {
          if (response && !response.checkIn) {
            this.stateTab = stateTab[stateTab.Checkin];
            this.subjectStateTab.next(this.stateTab);
          }
        },
        (error) => {
          console.log(error);
        });
    }
  }

  initReservation() {
    if (!this.isLoged) {
      if (this.dataBooking) {
        this.stateTab = stateTab[stateTab.YourBooking];
        this.subjectStateTab.next(this.stateTab);
      }
    } else {
      this.dataReservation.checkInWithEmail = true;
      this.dataReservation.checkInWithOriginDestination = false;

      const method = 'getReservation/' + this.mockUser;
      this.http.get(this.baseUrl + method).map((response) => response.json()).subscribe(
        (response) => {
          if (response && response.checkIn) {
            this.stateTab = stateTab[stateTab.YourBooking];
            this.subjectStateTab.next(this.stateTab);
          }
        },
        (error) => {
          console.log(error);
        });
    }
  }

  getAirport(): Observable<any> {
    let urlOriginWhitGeolocation = 'https://apps-aragorn.vueling.com/Vueling.GeoLocalization.WCF.REST.WebService/WCFService/GetNearlyAirportAndCountry';
    return this.http.get(urlOriginWhitGeolocation + '?ip=181.143.244.83')
    .map((response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getMyIp(): Observable<any> {
    let urlIp = 'http://freegeoip.net/json/';
    return this.http.get(urlIp)
    .map((response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getDifaultStation(): IStation {
    return {name: 'Alicante', code: 'ALC'}
  }
}
