import { Injectable } from '@angular/core';
import { Http, Jsonp, RequestOptions } from '@angular/http';

/*Local Services */
import { StorageService } from './storage.service';
import { LoggerService } from './logger.service'

/*third-party library*/
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResourcesService {
    private keyStations = 'stations';
    private keyMarkets = 'markets';
    private keyTexts = 'texts';
    private keyConfiguration = 'configuration';
    private keyContactPhones = 'contactphones';
    private keyDisabledDays = 'disabledDays';

    constructor(private logger: LoggerService, private storageService: StorageService, private http: Http, private jsonp: Jsonp) { }

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

    getContactPhones() {
        const url = 'https://vueling-json.herokuapp.com/index.php/GetContactPhones';
        return this.retrieveResource(this.keyContactPhones, url);
    }

    /**
     * Method that performs a get request to the
     * [API] (https://fetch.spec.whatwg.org/#requestinit))
     * to obtain the flight disable days, it receives an argument of type RequestOptions
     * @param {RequestOptions} options
     * @param {string} key
     * @returns {Observable<any>}
     * @memberof ResourcesService
     */
    getFlightDisabledDays(options: RequestOptions, key: string): Observable<any> {
      const url = 'https://pubcache.vueling.com/Vueling.Cache.WCF.REST.WebService/BlankDaysService.svc/Get';
      return this.retrieveResourceJsonp(key, url, options);
    }

    private retrieveResource(key: string, url: string): Observable<any> {
        const self = this;
        const resource = this.storageService.getLocalStorage(key);
        if (resource) {
            return of(resource);
        } else {
            return this.http.get(url).map(response => {
                self.storageService.setLocalStorage(key, response.json());
                return response.json();
            });
        }
    }

    private retrieveResourceJsonp(key: string, url: string, options?: RequestOptions): Observable<any> {
      const resource = this.storageService.getLocalStorage(key);
      if (resource) {
          return of(resource);
      } else {
          return this.jsonp.get(url, options)
          .map((response) => {
              this.storageService.setLocalStorage(key, response.json());
              return response.json();
          })
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }
  }

}
