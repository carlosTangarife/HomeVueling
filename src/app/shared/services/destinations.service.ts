import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { MarketList } from './marketList';
import { STATION_RESENT } from './stationResent';
import { prueba } from './stationInfo';
import { Http, Headers, RequestOptions } from '@angular/http';
import { IStation } from '../../search/components/flight/flight.model';

@Injectable()
export class DestinationsService {
  public url = 'https://vueling-json.herokuapp.com/index.php/stations';
  constructor(private _http: Http) { }

  getStationsOrigin(): Observable<IStation[]> {
    return this._http.get(this.url).map((data) => {
      return data.json().StationList;
    });
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
    this.getStationsOrigin().map( (res) => {
      return res.map((data) => {
        if (data.name.toUpperCase().indexOf(key) >= 0 || data.code.toUpperCase().indexOf(key) >= 0 || data.countryCode.toUpperCase().indexOf(key) >= 0 || data.countryName.toUpperCase().indexOf(key) >= 0) {
          stationsTemp.push(data);
        }
      })
    });

    if (stationsTemp.length > 0) {
     return Observable.of(stationsTemp);
    }
    return null;
  }
}
