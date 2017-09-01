import { Injectable, OnInit, Optional } from '@angular/core';
import { CookiesWrapper } from './cookies-wrapper.service';
import { LastStationsSelected, StationSelected } from '../models/last-search.model';

@Injectable()
export class StationService {
    private keyOrigin = 'lastSearchOrigin';
    private keyDestination = 'lastSearchDestination';

    constructor(private _cookiesWrapper: CookiesWrapper, @Optional() private numRecentSearches: number) { }

    saveStationOrigin(origin: string) {
        let stationSelected: StationSelected = {
            iataCode: origin,
            date: new Date()
        };
        this.saveStations(stationSelected, this.keyOrigin);
    }

    saveStationDestination(destination: string) {
        let stationSelected: StationSelected = {
            iataCode: destination,
            date: new Date()
        };
        this.saveStations(stationSelected, this.keyDestination);
    }

    saveStations(stationSelected: StationSelected, key: string) {
        let stations: LastStationsSelected = {
            lastStationsSelected: []
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
        } else if (listStations.lastStationsSelected.length < this.numRecentSearches) {
            listStations.lastStationsSelected.push(station);
        } else {
            let minStation = listStations.lastStationsSelected.reduce(function (prev, curr) { return prev.date < curr.date ? prev : curr; });
            listStations.lastStationsSelected.splice(listStations.lastStationsSelected.indexOf(minStation), 1, station);
        }
        return listStations;
    }

    getOriginsStations(): StationSelected[] {
        return this.getCookieStations(this.keyOrigin);
    }

    getDestinationsStations(): StationSelected[] {
        return this.getCookieStations(this.keyDestination);
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
}
