import { Injectable } from '@angular/core';
import { ResourcesService } from './resources.service';

@Injectable()
export class ConfigService {
    environment = {};
    constructor(private _resourcesService: ResourcesService) { }

    load(): Promise<any> {
        let loadStations = this._resourcesService.getStations()
            .map(res => this.environment['stations'] = res).share();
        let loadMarkets = this._resourcesService.getMarkets()
            .map(res => this.environment['markets'] = res).share();

        return loadStations.toPromise() && loadMarkets.toPromise();
    }
}
