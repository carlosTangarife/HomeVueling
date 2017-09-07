import { Injectable, Inject } from '@angular/core';
import { CookiesWrapper } from './cookies-wrapper.service';
import { LastStationsSelected, StationSelected } from '../models/last-search.model';
import { NUM_RECENT_SEARCHES } from '../consts/injections';

@Injectable()
export class StationService {

    constructor(private _cookiesWrapper: CookiesWrapper, @Inject(NUM_RECENT_SEARCHES) private _numRecentSearches: number) { }

    saveStation(stationCode: string, key: string) {
        let stations: LastStationsSelected = {
            lastStationsSelected: []
        };
        let stationSelected: StationSelected = {
            iataCode: stationCode,
            date: new Date()
        };
        let cookie = this._cookiesWrapper.getCookie(key);

        if (cookie) {
            stations = this.orderStations(cookie, stationSelected);
        } else {
            stations.lastStationsSelected.push(stationSelected);
        }
        this._cookiesWrapper.setCookie(key, stations);
    }

    orderStations(listStations: LastStationsSelected, station: StationSelected): LastStationsSelected {
        let exist = listStations.lastStationsSelected.find(function (s) { return s.iataCode === station.iataCode });
        if (exist) {
            exist.date = new Date();
        } else if (listStations.lastStationsSelected.length < this._numRecentSearches) {
            listStations.lastStationsSelected.push(station);
        } else {
            let minStation = listStations.lastStationsSelected.reduce(function (prev, curr) { return prev.date < curr.date ? prev : curr; });
            listStations.lastStationsSelected.splice(listStations.lastStationsSelected.indexOf(minStation), 1, station);
        }
        return listStations;
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
}
