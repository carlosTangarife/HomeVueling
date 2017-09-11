import { IRulesPassenger } from '../models/rules-passenger.model';
import { Injectable } from '@angular/core';
import { ResourcesService } from './resources.service';

@Injectable()
export class ConfigService {
  environment = {};
  constructor(private _resourcesService: ResourcesService) {}

  load(): Promise<any> {
    let loadStations = this._resourcesService
      .getStations()
      .map(res => (this.environment['stations'] = res))
      .share();
    let loadMarkets = this._resourcesService
      .getMarkets()
      .map(res => (this.environment['markets'] = res))
      .share();
    let loadTexts = this._resourcesService
      .getTexts()
      .map(res => (this.environment['texts'] = res))
      .share();
    let loadConfiguration = this._resourcesService
      .getConfiguration()
      .map(res => (this.environment['configuration'] = res))
      .share();

    return (
      loadStations.toPromise() &&
      loadMarkets.toPromise() &&
      loadTexts.toPromise() &&
      loadConfiguration.toPromise()
    );
  }

  getDictionary(key: string): string {
    let dictionary = this.environment['texts'].find(dic => dic.Key === key);
    return dictionary ? dictionary.Value : '';
  }

  getConfigFlightSearches(isOrigin: boolean): number {
    let config = this.environment['configuration'];
    let result = 3;
    try {
      result = isOrigin
        ? config.Stations.RecentSearches.InOrigin
        : config.Stations.RecentSearches.InDestination;
    } catch (e) {
      console.log((<Error>e).message);
    }
    return result;
  }

  getConfigPassengers(): IRulesPassenger {
    let rulesPassenger: IRulesPassenger = {
      extraSeatEnabled: true,
      residentsLargeFamilyEnabled: true,
      max: 24,
      min: 1,
      urlmax: 'https://groupsnew.vueling.com/web',
      adults: {
        max: 24,
        min: 0
      },
      children: {
        max: 6,
        min: 0,
        maxWhenAdults: 12
      },
      infants: {
        max: 16,
        min: 0
      },
      extras: {
        max: 6,
        min: 0
      }
    }
    return rulesPassenger;
  }
}
