import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { StorageService } from './storage.service';
import { LoggerService } from './logger.service'
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResourcesService {
    private keyStations = 'stations';
    private keyMarkets = 'markets';
    private keyTexts = 'texts';
    private keyConfiguration = 'configuration';
    private keyContactPhones = 'contactphones';

    constructor(private _logger: LoggerService, private _storageService: StorageService, private _http: Http) { }

    getStations() {
        const url = 'https://vueling-json.herokuapp.com/index.php/stations';
        return this.retrieveResource(this.keyStations, url);
    }

    getMarkets() {
        const url = 'https://vueling-json.herokuapp.com/index.php/markets';
        return this.retrieveResource(this.keyMarkets, url);
    }

    getTexts() {
        // const url = 'http://local.vuelingtest.com/umbraco/api/configuration/GetSearcherTexts';
        const url = 'https://vueling-json.herokuapp.com/index.php/GetSearcherTexts';
        return this.retrieveResource(this.keyTexts, url);
    }

    getConfiguration() {
        // const url = 'http://local.vuelingtest.com/umbraco/api/configuration/GetConfigurationSearch/1177';
        const url = 'https://vueling-json.herokuapp.com/index.php/GetConfigurationSearch';
        return this.retrieveResource(this.keyConfiguration, url);
    }

    getContactPhones(){
        const url = 'https://vueling-json.herokuapp.com/index.php/GetContactPhones';
        return this.retrieveResource(this.keyContactPhones, url);
    }

    private retrieveResource(key: string, url: string): Observable<any> {
        const self = this;
        const resource = this._storageService.getLocalStorage(key);
        if (resource) {
            return of(resource);
        } else {
            return this._http.get(url).map(response => {
                self._storageService.setLocalStorage(key, response.json());
                return response.json();
            });
        }
    }
}
