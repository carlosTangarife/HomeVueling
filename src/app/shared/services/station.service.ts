import { Injectable } from '@angular/core';
import { CookiesWrapper } from './cookies-wrapper.service';
import { ConfigService } from './config.service';
import { LastStationsSelected, StationSelected } from '../models/last-search.model';

@Injectable()
export class StationService {
    configStations: any;
    numRecentSearchesOrigin: number;
    numRecentSearchesDestination: number;

    constructor(private _cookiesWrapper: CookiesWrapper, private _configService: ConfigService) {
        this.configStations = this._configService.getConfigStations();
        this.numRecentSearchesOrigin = this.configStations.RecentSearches.InOrigin;
        this.numRecentSearchesDestination = this.configStations.RecentSearches.InDestination;
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

    showErase(): boolean {
        return this.configStations.RecentSearches.DeleteOptionEnabled;
    }

    showMapLink(): boolean {
        return this.configStations.DestinationsMapLinkEnabled;
    }

    private orderStations(listStations: LastStationsSelected, station: StationSelected, numStations: number): LastStationsSelected {
        let exist = listStations.lastStationsSelected.find(s => s.iataCode === station.iataCode);
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
