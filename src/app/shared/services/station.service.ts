import { Injectable } from '@angular/core';
import { CookiesWrapper } from './cookies-wrapper.service';
import { ConfigService } from './config.service';
import { LastStationsSelected, StationSelected } from '../models/last-search.model';

@Injectable()
export class StationService {
    numRecentSearchesOrigin: number;
    numRecentSearchesDestination: number;

    constructor(private _cookiesWrapper: CookiesWrapper, private _configService: ConfigService) {
        this.numRecentSearchesOrigin = this._configService.getConfigFlightSearches(true);
        this.numRecentSearchesDestination = this._configService.getConfigFlightSearches(false);
    }

    saveStation(stationCode: string, key: string, isOrigin: boolean) {
        let stations: LastStationsSelected = {
            lastStationsSelected: []
        };
        let stationSelected: StationSelected = {
            iataCode: stationCode,
            date: new Date()
        };
        let cookie = this._cookiesWrapper.getCookie(key);

        if (cookie) {
            let numStations = isOrigin ? this.numRecentSearchesOrigin : this.numRecentSearchesDestination;
            stations = this.orderStations(cookie, stationSelected, numStations);
        } else {
            stations.lastStationsSelected.push(stationSelected);
        }
        this._cookiesWrapper.setCookie(key, stations);
    }

    getCookieStations(key: string): StationSelected[] {
        let cookie: LastStationsSelected = this._cookiesWrapper.getCookie(key);
        if (cookie) {
            return cookie.lastStationsSelected.sort((a, b) =>
                Date.parse(b.date.toString()) - Date.parse(a.date.toString()));
        } else {
            return [];
        }
    }

    removeStations(key: string) {
        this._cookiesWrapper.removeCookie(key);
    }

    private orderStations(listStations: LastStationsSelected, station: StationSelected, numStations: number): LastStationsSelected {
        let exist = listStations.lastStationsSelected.find(function (s) { return s.iataCode === station.iataCode });
        if (exist) {
            exist.date = new Date();
        } else if (listStations.lastStationsSelected.length < numStations) {
            listStations.lastStationsSelected.push(station);
        } else {
            let minStation = listStations.lastStationsSelected.reduce(function (prev, curr) { return prev.date < curr.date ? prev : curr; });
            listStations.lastStationsSelected.splice(listStations.lastStationsSelected.indexOf(minStation), 1, station);
        }
        return listStations;
    }
}
