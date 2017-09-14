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

  getConfigStations(): any {
    return this.environment['configuration'].FlightSearch.Stations;
  }

  getConfigPassengers(): any {
    return this.environment['configuration'].FlightSearch.Pax;
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
