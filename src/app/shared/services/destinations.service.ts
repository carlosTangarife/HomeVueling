import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { MarketList } from './marketList';
import { STATION_RESENT } from './stationResent';
import { Http } from '@angular/http';
import { IStation } from '../../search/components/flight/flight.model';

@Injectable()
export class DestinationsService {
  constructor(private _http: Http) { }

  getStationsOrigin(key?: string): Observable<IStation[]> {
    if (key && key.length > 0) {
      key = key.toUpperCase();
    }

    const reg = new RegExp(key);
    const url = 'https://vueling-json.herokuapp.com/index.php/stations';
    return this._http
      .get(url)
      .map( (data) => data.json().StationList)
      .map( (stations: IStation[]) => stations.filter( (station) => {
        if (station.name.toUpperCase().match(key) || station.code.toUpperCase().match(key) || station.countryCode.toUpperCase().match(key) || station.countryName.toUpperCase().match(key)) {
          return station;
        }else {
          return null;
        }
      })
    );
  }

  getStationsDestination(iata: string) {
    return Observable.of(MarketList[iata]);
  }

  getRecentSearch() {
    return Observable.of(STATION_RESENT.stationResent);
  }
}
