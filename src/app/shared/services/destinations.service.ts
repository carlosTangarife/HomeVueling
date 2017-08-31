import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { ResourcesService } from './resources.service';
import { MarketList } from './marketList';
import { STATION_RESENT } from './stationResent';
import { Http } from '@angular/http';
import { IStation, IMarket, IDestination } from '../../search/components/flight/flight.model';

@Injectable()
export class DestinationsService {
  constructor(private _http: Http, private _resourcesService: ResourcesService) { }

  getStationsOrigin(key?: string): Observable<IStation[]> {
    if (key && key.length > 0) {
      key = key.toUpperCase();
    }

    const reg = new RegExp(key);
    return this._resourcesService.getStations()
      .map(data => data.StationList)
      .map((stations: IStation[]) => key ? stations
        .filter(station => station.name.toUpperCase().match(key)
          || station.code.toUpperCase().match(key)
          || station.countryCode.toUpperCase().match(key)
          || station.countryName.toUpperCase().match(key)) : stations);
  }

  getStationsDestination(iata: string): Observable<IMarket[]> {
    return this._resourcesService.getMarketsByIata(iata)
      .mergeMap((destination: IDestination) => {
        let stations$ = this._resourcesService.getStations()
          .map(data => data.StationList)
          .map((stations: IStation[]) => stations
              .filter(station => station.code === destination.destination));

        return Observable.forkJoin(stations$, (station) => {
          let result: IMarket = {
              station: {
                name: station[0].name,
                code: station[0].code
              },
              market: destination
          };
          return result;
        });
      }).toArray();
  }

  getRecentSearch() {
    return Observable.of(STATION_RESENT.stationResent);
  }
}
