import { Injectable } from '@angular/core';
import { StationService } from './station.service';
import { ConfigService } from './config.service';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';
import { StationsSelectorService } from './stations-selector.service';
import { IStation, IMarket, IStationList } from '../../search/components/flight/flight.model';

@Injectable()
export class SelectorService {
    public stations: IStationList;
    public markets: any;
    public marketsIata: IMarket[];
    public listStations: any;
    public filteredStations: any;
    public viewPopup = false;

    private subjectRecentStations = new Subject<any>();
    public recentStations$ = this.subjectRecentStations.asObservable();

    private subjectListStations = new Subject<any>();
    public listStations$ = this.subjectListStations.asObservable();

    constructor(private _configService: ConfigService, private _stationService: StationService) {
        this.stations = this._configService.environment['stations'];
        this.markets = this._configService.environment['markets'];
        this.marketsIata = [];
    }

    loadListStations(isOrigin: boolean) {
        this.listStations = isOrigin ? this.stations.StationList : this.marketsIata;
        this.getStations(isOrigin);
    }

    getStations(isOrigin: boolean) {
        let recentStations = this.getRecentStations(isOrigin);
        this.filteredStations = this.listStations.map(station => {
            station.isRecent = recentStations.includes(station);
            station.order = recentStations.indexOf(station);
            return station;
        });
        this.filterStations(true);
        this.filterStations(false);
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
                        connection: market.connection,
                        residents: market.residents,
                        largefamily: market.largefamily,
                        countryCode: station.countryCode,
                        countryName: station.countryName,
                        macCode: station.macCode,
                        name: station.name
                    };
                    return result;
                }
            }).filter(Boolean) : this.marketsIata = [];
    }

    filterStationsByKey(isOrigin: boolean, key?: string) {
        this.showPopup();
        this.filteredStations = key ? this.listStations.filter(opt => this.existOption(opt, key)) : this.listStations;
        this.filterStations(true);
        this.filterStations(false);
    }

    existOption(opt: any, key: string): boolean {
        return opt.name.toLowerCase().match(key)
            || opt.code.toLowerCase().match(key)
            || opt.countryCode.toLowerCase().match(key)
            || opt.countryName.toLowerCase().match(key);
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
}
