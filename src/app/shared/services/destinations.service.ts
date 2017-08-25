import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsEnumerable  } from 'linq-es2015';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { destinations } from './destinations';
// import { MARKETS } from 'app/search/services/destinations2';
import { MarketList } from './marketList';
import { IStationInfo } from 'app/shared/model/stationInfo.model';



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
        name: 'Pereira',
        code: 'PER',
        country: 'Colombia'
      },
      {
        macCode: '',
        name: 'Barranquilla',
        code: 'BAR',
        country: 'Colombia'
      }
    ];

  }

  getStationsOrigin() {
    return Observable.of(destinations);
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
