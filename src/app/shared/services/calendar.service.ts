import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { ResourcesService } from '../../shared/services/resources.service';

@Injectable()
export class CalendarService {
    public fligthDisabledDays: Array<string>;
    public isGoing = true;
    public isComeBack = false;
    public isMulti = false;
    private isOneWay = true;
    private isRoundTrip = false;
    private isShowDatePicker = false;
    public isCheckIn: string;
    // Observable boolean sources
    private subjectIsOneWay = new BehaviorSubject<boolean>(this.isOneWay);
    private subjectIsRoundTrip = new BehaviorSubject<boolean>(this.isRoundTrip);

    private subjectIsGoing = new BehaviorSubject<boolean>(this.isGoing);
    private subjectIsComeBack = new BehaviorSubject<boolean>(this.isComeBack);
    private subjectIsMulti = new BehaviorSubject<boolean>(this.isMulti);

    private subjectIsShowDatePicker = new BehaviorSubject<boolean>(this.isShowDatePicker);
    private subjectisCheckIn = new BehaviorSubject<string>('false');

    // Observable boolean streams
    isOneWay$ = this.subjectIsOneWay.asObservable();
    isRoundTrip$ = this.subjectIsRoundTrip.asObservable();

    isGoing$ = this.subjectIsGoing.asObservable();
    isComeBack$ = this.subjectIsComeBack.asObservable();
    isMulti$ = this.subjectIsMulti.asObservable();

    isShowDatePicker$ = this.subjectIsShowDatePicker.asObservable();

    isCheckIn$ = this.subjectisCheckIn.asObservable();

    constructor(private resourcesService: ResourcesService) {
      this.fligthDisabledDays = [];
      this.isCheckIn = 'false';
    }

    // Service message states
    oneWay() {
      if (this.isComeBack) {
        this.toggleShowDatePicker();
      }
      this.toggleModel();
    }

    roundTrip() {
      this.toggleModel();
    }

    private toggleModel() {
      this.isOneWay = !this.isOneWay;
      this.isRoundTrip = !this.isRoundTrip;

      this.subjectIsOneWay.next(this.isOneWay);
      this.subjectIsRoundTrip.next(this.isRoundTrip);
    }

    onGoing() {
      this.isGoing = true;
      this.isComeBack = false;
      this.isMulti = false;
      this.subjectIsGoing.next(this.isGoing);
      this.subjectIsComeBack.next(this.isComeBack);
      this.subjectIsMulti.next(this.isMulti);
      this.toggleShowDatePicker();
    }

    onCheckIn() {
      this.isCheckIn = 'true';
      this.subjectisCheckIn.next(this.isCheckIn);
    }

    ofCheckIn() {
      this.isCheckIn = 'false';
      this.subjectisCheckIn.next(this.isCheckIn);
    }

    onMulti() {
      this.isComeBack = false;
      this.isGoing = false;
      this.isMulti = true;
      this.subjectIsGoing.next(this.isGoing);
      this.subjectIsComeBack.next(this.isComeBack);
      this.subjectIsMulti.next(this.isMulti);
      this.toggleShowDatePicker();
    }

    onComeBack() {
      this.isComeBack = true;
      this.isGoing = false;
      this.isMulti = false;
      this.subjectIsGoing.next(this.isGoing);
      this.subjectIsComeBack.next(this.isComeBack);
      this.subjectIsMulti.next(this.isMulti);
      this.toggleShowDatePicker();
    }

    toggleShowDatePicker() {
      this.isShowDatePicker = !this.isShowDatePicker;
      this.subjectIsShowDatePicker.next(this.isShowDatePicker);
    }

    /**
     * Method that performs a get request to the
     * [API] (https://fetch.spec.whatwg.org/#requestinit))
     * to obtain the flight disable days, it receives an argument of type RequestOptions
     * @param {string} origin
     * @param {string} destination
     * @returns {*}
     * @memberof SelectorService
    */
    getFlightDisabledDays(origin: string, destination: string): any {
        /**
         * only do the request if the source and destination exists as parameter.
         */
        this.fligthDisabledDays = [];
        if (origin && destination) {
            let key = origin + '_' + destination;
            let currentDate: Date = new Date();
            let fullYear: string = currentDate.getFullYear().toString();
            let month: string = (currentDate.getMonth() + 1).toString();
            let queryString = new URLSearchParams();

            queryString.set('departure', origin);
            queryString.set('arrival', destination);
            queryString.set('year', fullYear);
            queryString.set('month', month);
            queryString.set('monthsRange', '5');
            queryString.set('callback', 'JSONP_CALLBACK');

            const headers = new Headers();
            headers.set('Content-Type', 'text/html');
            headers.set('Content-Type', 'application/xhtml+xml');
            headers.set('Content-Type', 'application/xml');

            let options = new RequestOptions({
                headers: headers,
                params: queryString
            });

            this.resourcesService.getFlightDisabledDays(options, key).subscribe((data) => {
                data.Calendar.map((yearAndMonth) => {
                    const fecha = yearAndMonth.Year + '-' + yearAndMonth.Month;
                    yearAndMonth.BlankDays.map((day) => {
                        this.fligthDisabledDays.push(`${fecha}-${day}`)
                    })
                });
            }, (error) => {
                console.log(error);
            });
        }
    }
}
