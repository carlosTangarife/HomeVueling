import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { StationService } from './station.service';
import { IStation, IMarket, IStationList } from '../../search/components/flight/flight.model';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';

@Injectable()
export class StationsSelectorService {
  public stations: IStationList;
  public markets: any;
  public marketsIata: IMarket[];
  public filteredStations: any;
  public viewPopup = false;

  private subjectRecentStations = new Subject<IStation[]>();
  public recentStations$ = this.subjectRecentStations.asObservable();

  private subjectListStations = new Subject<IStation[]>();
  public listStations$ = this.subjectListStations.asObservable();

  constructor(private _configService: ConfigService, private _stationService: StationService) {
    this.stations = this._configService.environment['stations'];
    this.markets = this._configService.environment['markets'];
  }

  initStations() {
    this.getStations(true);
  }

  initDestinations(iata: string) {
    this.getMarketsByIata(iata);
    this.getStations(false);
  }

  getStations(isOrigins: boolean) {
    let listStations = isOrigins ? this.stations.StationList : this.marketsIata;
    let recentStations = this.getRecentStations(isOrigins);
    this.filteredStations = listStations.map(station => {
      station.isRecent = recentStations.includes(station);
      station.order = recentStations.indexOf(station);
      return station;
    });
    this.filterStations(true);
    this.filterStations(false);
  }

  filterStations(byRecent: boolean) {
    let filtered = this.filteredStations.filter(opt => opt.isRecent === byRecent);
    if (byRecent) {
      filtered.sort((a, b) => a.order - b.order);
      this.subjectRecentStations.next(filtered);
    } else {
      this.subjectListStations.next(filtered);
    }
  }

  private getRecentStations(isOrigins: boolean): any {
    let keyCookie = isOrigins ? environment.keyLastSearchOriginCookie : environment.keyLastSearchDestinationCookie;
    let listStations = isOrigins ? this.stations.StationList : this.marketsIata;
    let cookie = this._stationService.getCookieStations(keyCookie);
    return cookie.map(val => listStations.find(station => station.code === val.iataCode));
  }

  filterStationsByKey(type: string, key?: string) {
    this.viewPopup = true;
    let listStations = type === 'origin' ? this.stations.StationList : this.marketsIata;
    this.filteredStations = key ? listStations.filter(opt => this.existOption(opt, key)) : listStations;
    this.filterStations(true);
    this.filterStations(false);
  }

  existOption(opt: any, key: string): boolean {
    return opt.name.toLowerCase().match(key)
      || opt.code.toLowerCase().match(key)
      || opt.countryCode.toLowerCase().match(key)
      || opt.countryName.toLowerCase().match(key);
  }

  getMarketsByIata(iata: string) {
    this.marketsIata = iata && this.markets[iata] ? this.markets[iata]
      .map(market => {
        let station: IStation = this.stations.StationList.find(s => s.code === market.destination);
        if (station) {
          let result: IMarket = {
            code: market.destination,
            connection: market.connection,
            residents: market.residents,
            largefamily: market.largefamily,
            countryCode: station.countryCode,
            countryName: station.countryName,
            macCode: station.macCode,
            name: station.name
          };
          return result;
        }
      }).filter(Boolean) : this.marketsIata = [];
  }

  deleteStations(isOrigins: boolean) {
    let keyCookie = isOrigins ? environment.keyLastSearchOriginCookie : environment.keyLastSearchDestinationCookie;
    this._stationService.removeStations(keyCookie);
  }

  togglePopup() {
    this.viewPopup = !this.viewPopup;
  }

  hidePopup() {
    this.viewPopup = false;
  }

  showPopup() {
    this.viewPopup = true;
  }

  // clearInputOrigin() {
  //   this.originSelected = '';
  //   this.getStations();
  //   this.clearInputDestination();
  // }

  // clearInputDestination() {
  //   this.getMarketsByIata(this.originSelected)
  //   this.toggleDestinationPopup();
  // }

  // selectOrigin(iata: string) {
  //   this.originSelected = iata;
  //   this.togglePopup();
  //   this.clearInputDestination();
  // }

  // selectDestination() {
  //   this.toggleDestinationPopup();
  // }

  // toggleDestinationPopup() {
  //   if (this.originSelected) {
  //     this.originPopup = false;
  //     this.destinationPopup = !this.destinationPopup;
  //   } else {
  //     this.togglePopup();
  //   }
  // }
}
