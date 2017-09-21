import { URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

/*Local Services */
import { environment } from '../../../environments/environment';
import { ResourcesService } from './resources.service';
import { StationService } from './station.service';
import { ConfigService } from './config.service';

/*third-party library*/
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*Models using interface */
import { IContactPhonesType, IContactPhones } from '../../search/models/contact-phones.model';
import { IStation, IMarket, IStationList } from '../models/station.model';
import { IFlight } from '../../search/models/flight.model';
import { IIcon } from '../models/commons.model';

@Injectable()
export class SelectorService {
    public stations: IStationList;
    public markets: any;
    public marketsIata: IMarket[];
    public listStations: any;
    public filteredStations: any;
    public viewPopup = false;
    public iconGeo: IIcon;
    public iconRecent: IIcon;
    public contactPhones: IContactPhonesType;
    public contact: any;

    private subjectRecentStations = new BehaviorSubject<any>(this.filteredStations);
    public recentStations$ = this.subjectRecentStations.asObservable();

    private subjectListStations = new BehaviorSubject<any>(this.filteredStations);
    public listStations$ = this.subjectListStations.asObservable();

    constructor(private _configService: ConfigService, private _stationService: StationService, private _resourcesService: ResourcesService) {
        this.stations = this._configService.environment['stations'];
        this.markets = this._configService.environment['markets'];
        this.marketsIata = [];
        this.iconGeo = this._configService.getIconGeo();
        this.iconRecent = this._configService.getIconRecent();
        this.contact = this._configService.environment['contactphones'];
    }

    loadContactPhones(iata: string) {
        let cont = this.contact.phonesServices.find(x => x.CountryCode === iata)
        if (cont) {
            let result: IContactPhones = {
                CountryCode: cont.CountryCode,
                TextPhoneInfo: {
                    phoneNumber: cont.TextPhoneInfo.phoneNumber,
                    phoneInfoFirst: cont.TextPhoneInfo.phoneInfoFirst,
                    phoneInfoLast: cont.TextPhoneInfo.phoneInfoLast
                }
            };
            console.log(result);
             return result;
        }
    }

    loadStations() {
        this.filteredStations = this.stations.StationList;
        this.subjectListStations.next(this.filteredStations);
    }

    loadListStations(isOrigin: boolean) {
        this.listStations = isOrigin ? this.stations.StationList : this.marketsIata;
        this.getStations(isOrigin);
    }

    getStations(isOrigin: boolean) {
        let recentStations = this.getRecentStations(isOrigin);
        this.filteredStations = this.listStations.map(station => {
            station.isRecent = false;
            if (recentStations.includes(station)) {
                station.isRecent = true;
                station.icon = this.iconRecent;
            }
            station.order = recentStations.indexOf(station);
            return station;
        });
        this.filterStations(true);
        this.filterStations(false);
    }

    isResidentsFamily(iata: string): any {
        let destination = this.marketsIata.find(market => market.code === iata);
        if (destination) {
            return {
                isResident: destination.residents,
                isLargeFamily: destination.largefamily
            };
        } else if (this.marketsIata && this.marketsIata.length > 0) {
            return {
                isResident: this.marketsIata.some(market => market.residents),
                isLargeFamily: this.marketsIata.some(market => market.largefamily)
            };
        } else {
            return {
                isResident: false,
                isLargeFamily: false
            };
        }
    }

    filterStations(byRecent: boolean) {
        let filtered = this.filteredStations.filter(opt => opt.isRecent === byRecent);
        if (byRecent) {
            filtered.sort((a, b) => a.order - b.order);
            this.subjectRecentStations.next(filtered);
        } else {
            this.subjectListStations.next(filtered);
        }
    }

    private getRecentStations(isOrigin: boolean): any {
        let keyCookie = isOrigin ? environment.keyLastSearchOriginCookie : environment.keyLastSearchDestinationCookie;
        let cookie = this._stationService.getCookieStations(keyCookie);
        return cookie.map(val => this.listStations.find(station => station.code === val.iataCode));
    }

    getMarketsByIata(iata: string) {
        this.marketsIata = iata && this.markets[iata] ? this.markets[iata]
            .map(market => {
                let station: IStation = this.stations.StationList.find(s => s.code === market.destination);
                if (station) {
                    let result: IMarket = {
                        code: market.destination,
                        countryCode: station.countryCode,
                        countryName: station.countryName,
                        macCode: station.macCode,
                        name: station.name,
                        connection: market.connection,
                        residents: market.residents,
                        largefamily: market.largefamily
                    };
                    return result;
                }
            }).filter(Boolean) : this.marketsIata = [];
    }

    filterStationsByKey(isOrigin: boolean, key?: string) {
        this.showPopup();
        this.filteredStations = key ? this.listStations.filter(opt => this.existOption(opt, key.toLowerCase())) : this.listStations;
        this.filterStations(true);
        this.filterStations(false);
    }

    existOption(opt: any, key: string): boolean {
        return opt.name.toLowerCase().match(key)
            || opt.code.toLowerCase().match(key)
            || opt.countryCode.toLowerCase().match(key)
            || opt.countryName.toLowerCase().match(key);
    }

    hasRecentStations(): boolean {
        return this.filteredStations.some(x => x.isRecent);
    }

    deleteStations(isOrigin: boolean) {
        let keyCookie = isOrigin ? environment.keyLastSearchOriginCookie : environment.keyLastSearchDestinationCookie;
        this._stationService.removeStations(keyCookie);
    }

    togglePopup() {
        this.viewPopup = !this.viewPopup;
    }

    hidePopup() {
        this.viewPopup = false;
    }

    showPopup() {
        this.viewPopup = true;
    }

    showErase(): boolean {
        return this._stationService.showErase();
    }

    showMapLink(): boolean {
        return this._stationService.showMapLink();
    }

    showMulticity(): boolean {
        return this._configService.multicityEnabled();
    }

    /**
     * Method that performs a get request to the
     * [API] (https://fetch.spec.whatwg.org/#requestinit))
     * to obtain the flight disable days, it receives an argument of type RequestOptions
     * @param {IFlight} dataFlight
     * @returns {*}
     * @memberof SelectorService
    */
    getFlightDisabledDays(dataFlight: IFlight): any {

      /**
       * only do the request if the source and destination exists as parameter.
       */
      if (dataFlight.origin.code && dataFlight.destination.code) {
        let key = dataFlight.origin.code + '_' + dataFlight.destination.code;
        let currentDate: Date = new Date();
        let fullYear: string = currentDate.getFullYear().toString();
        let month: string = (currentDate.getMonth() + 1).toString();
        let queryString = new URLSearchParams();

        queryString.set('departure', dataFlight.origin.code);
        queryString.set('arrival', dataFlight.destination.code);
        queryString.set('year', fullYear);
        queryString.set('month', month);
        queryString.set('monthsRange', '24');
        queryString.set('callback', 'JSONP_CALLBACK');

        const headers = new Headers();
        headers.set('Content-Type', 'text/html');
        headers.set('Content-Type', 'application/xhtml+xml');
        headers.set('Content-Type', 'application/xml');

        let options = new RequestOptions({
          headers: headers,
          params: queryString
        });

        this._resourcesService.getFlightDisabledDays(options, key).subscribe(
          (prueba) => {
            console.log(prueba);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
}
