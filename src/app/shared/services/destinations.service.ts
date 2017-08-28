import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsEnumerable  } from 'linq-es2015';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { MarketList } from './marketList';
import { IStationInfo } from 'app/shared/model/stationInfo.model';
import { STATION_INFO } from './stationInfo';

@Injectable()
export class DestinationsService {
  stationInfo: IStationInfo[];
  stationResent: IStationInfo[];
  constructor() {
    this.stationInfo = [
      {
        macCode: '',
        name: 'Manizales',
        code: 'MAL',
        country: 'Colombia'
      },
      {
        macCode: '',
        name: 'Medellin',
        code: 'MED',
        country: 'Colombia'
      }
    ];

    this.stationResent = [
      {
        macCode: '',
        name: 'Ginebra',
        code: 'GVA',
        country: 'Suiza'
      },
      {
        macCode: '',
        name: 'Granada',
        code: 'GRX',
        country: 'España'
      },
      {
        macCode: '',
        name: 'Ibiza',
        code: 'IBZ',
        country: 'España'
      }
    ];
  }

  getStationsOrigin() {
    return Observable.of(STATION_INFO);
    // return Observable.of(this.stationInfo);
  }

  getStationsDestination(iata: string) {
    return Observable.of(MarketList[iata]);
  }

  getRecentSearch() {
    return Observable.of(this.stationResent);
  }
}
