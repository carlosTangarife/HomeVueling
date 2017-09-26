import { Injectable } from '@angular/core';
import { URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { ResourcesService } from './resources.service';

@Injectable()
export class FlightDatesService {
    constructor(private resourcesService: ResourcesService) { }

    /**
     * Method that performs a get request to the
     * [API] (https://fetch.spec.whatwg.org/#requestinit))
     * to obtain the flight disable days, it receives an argument of type RequestOptions
     * @param {string} origin
     * @param {string} destination
     * @returns {*}
     * @memberof SelectorService
    */
    getFlightDisabledDays(origin: string, destination: string): Array<string> {
        /**
         * only do the request if the source and destination exists as parameter.
         */
        let flightDisabledDays = new Array<string>();
        if (origin && destination) {
            let key = 'calendarDays-' + origin + '_' + destination;
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
                        flightDisabledDays.push(`${fecha}-${day}`)
                    })
                });
            }, (error) => {
                console.log(error);
            });
        }
        return flightDisabledDays;
    }
}
