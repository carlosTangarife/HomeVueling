import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { MarketList } from './marketList';
import { STATION_INFO } from './stationInfo';
import { STATION_RESENT } from './stationResent';

@Injectable()
export class DestinationsService {

  constructor() { }

  getStationsOrigin() {
    return Observable.of(STATION_INFO.stationInfo.StationList);
  }

  getStationsDestination(iata: string) {
    return Observable.of(MarketList[iata]);
  }

  getRecentSearch() {
    return Observable.of(STATION_RESENT.stationResent);
  }

  getStationFilter(key: string) {
    key = key.toUpperCase();
    const stationsTemp = [];
    STATION_INFO.stationInfo.StationList.map((data) => {
      if (data.iataName.toUpperCase().indexOf(key) >= 0 || data.iataCode.toUpperCase().indexOf(key) >= 0 || data.countryCode.toUpperCase().indexOf(key) >= 0 || data.countryName.toUpperCase().indexOf(key) >= 0) {
        stationsTemp.push(data);
      }
    });
    if (stationsTemp.length > 0) {
     return Observable.of(stationsTemp);
    }
    return null;
  }
}
