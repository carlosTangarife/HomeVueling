import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsEnumerable  } from 'linq-es2015';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { MarketList } from './marketList';
import { STATION_INFO } from './stationInfo';
import { STATION_RESENT } from './stationResent';
import { IStation, IStations } from '../../search/components/flight/flight.model'

@Injectable()
export class DestinationsService {
  public stationResent$: IStation[];
  public stations$: IStation[];
  constructor() {
    this.stationResent$ = STATION_RESENT.stationResent;
    this.stations$ = STATION_INFO.stationInfo.StationList;
  }

  getStationsOrigin() {
    return Observable.of(this.stations$);
  }

  getStationsDestination(iata: string) {
    return Observable.of(MarketList[iata]);
  }

  getRecentSearch() {
    return Observable.of(this.stationResent$);
  }
}
