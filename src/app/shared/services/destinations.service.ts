import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsEnumerable  } from 'linq-es2015';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { STATIONS } from './destinations';
// import { MARKETS } from 'app/search/services/destinations2';
import { MarketList } from './marketList';
import { IStationInfo } from 'app/shared/models/stationInfo.model';



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
    return Observable.of(STATIONS);
    // return Observable.of(this.stationInfo);
  }

  getStationsDestination(iata: string) {
    debugger;
    return Observable.of(MarketList[iata]);
  }

  getRecentSearch() {
    return Observable.of(this.stationResent);
  }
}
