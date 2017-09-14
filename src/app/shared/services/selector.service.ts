import { Injectable } from '@angular/core';
import { StationService } from './station.service';
import { ConfigService } from './config.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';
import { IStation, IMarket, IStationList } from '../models/station.model';
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

    private subjectRecentStations = new BehaviorSubject<any>(this.filteredStations);
    public recentStations$ = this.subjectRecentStations.asObservable();

    private subjectListStations = new BehaviorSubject<any>(this.filteredStations);
    public listStations$ = this.subjectListStations.asObservable();

    constructor(private _configService: ConfigService, private _stationService: StationService) {
        this.stations = this._configService.environment['stations'];
        this.markets = this._configService.environment['markets'];
        this.marketsIata = [];
        this.iconGeo = this._configService.getIconGeo();
        this.iconRecent = this._configService.getIconRecent();
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
}
