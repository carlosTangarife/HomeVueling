import { Injectable } from '@angular/core';
import { ResourcesService } from './resources.service';
import * as _ from 'lodash';

@Injectable()
export class ConfigService {
  environment = {};
  constructor(private resourcesService: ResourcesService) {}

  load(): Promise<any> {
    let loadStations = this.resourcesService
      .getStations()
      .map(res => (this.environment['stations'] = res))
      .share();
    let loadMarkets = this.resourcesService
      .getMarkets()
      .map(res => (this.environment['markets'] = res))
      .share();
    let loadTexts = this.resourcesService
      .getTexts()
      .map(res => (this.environment['texts'] = res))
      .share();
    let loadConfiguration = this.resourcesService
      .getConfiguration()
      .map(res => (this.environment['configuration'] = res))
      .share();
    let loadContactPhones = this.resourcesService
      .getContactPhones()
      .map(res => (this.environment['contactphones'] = res))
      .share();

    return (Promise.all([
      loadConfiguration.toPromise(),
      loadTexts.toPromise(),
      loadStations.toPromise(),
      loadMarkets.toPromise(),
      loadContactPhones.toPromise()
    ]));
  }

  getDictionary(key: string): string {
    let dictionary = this.environment['texts'].find(dic => dic.Key === key);
    return dictionary ? dictionary.Value : '';
  }

  getConfiguration(): any {
    return _.cloneDeep(this.environment['configuration']);
  }

  getConfigStations(): any {
    return this.environment['configuration'].FlightSearch.Stations;
  }

  getConfigPassengers(): any {
    return this.environment['configuration'].FlightSearch.Pax;
  }

  getConfigCalendar(key: string): any {
    return this.environment['configuration'][key].Calendar;
  }

  getConfigDiscount(): any {
    return this.environment['configuration'].FlightSearch.Discount;
  }

  getIconGeo(): any {
    let config = this.environment['configuration'].FlightSearch.Stations;
    return config.IconGeolocalization;
  }

  getIconRecent(): any {
    let config = this.getConfigStations();
    return config.RecentSearches.Icon;
  }

  multicityEnabled(): boolean {
    return this.environment['configuration'].FlightSearch.MultiCityEnabled;
  }
}
