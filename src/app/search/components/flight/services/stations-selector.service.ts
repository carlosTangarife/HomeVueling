import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../shared/services/config.service';
import { StationService } from '../../../../shared/services/station.service';
import { IStation, IMarket, IStationList } from '../../../components/flight/flight.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StationsSelectorService {

  public stations: IStationList;
  public markets: any;
  public marketsIata: IMarket[];
  public filteredOrigins: IStation[];
  public filteredDestinations: IMarket[];
  public originPopup = false;
  public destinationPopup = false;
  public originSelected: string;

  constructor(private _configService: ConfigService, private _stationService: StationService) {
    this.stations = this._configService.environment['stations'];
    this.markets = this._configService.environment['markets'];
  }

  initStations() {
    this.getStations();
  }

  initDestinations(iata: string) {
    this.getMarketsByIata(iata);
    this.getDestinations();
  }

  getStations() {
    let recentOrigins = this.getRecentOrigins();
    this.filteredOrigins = this.stations.StationList.map(station => {
      station.isRecent = recentOrigins.includes(station);
      station.order = recentOrigins.indexOf(station);
      return station;
    });
  }

  filterOriginsByRecent(isRecent: boolean) {
    let filtered = this.filteredOrigins.filter(opt => opt.isRecent === isRecent);
    return isRecent ? filtered.sort((a, b) => a.order - b.order) : filtered;
  }

  filterOrigins(key?: string) {
    this.originPopup = true;
    this.filteredOrigins = key ? this.stations.StationList
      .filter(opt => this.existOption(opt, key)) : this.stations.StationList;
  }

  existOption(opt: any, key: string): boolean {
    return opt.name.toLowerCase().match(key)
      || opt.code.toLowerCase().match(key)
      || opt.countryCode.toLowerCase().match(key)
      || opt.countryName.toLowerCase().match(key);
  }

  filterDestinationsByRecent(isRecent: boolean) {
    let filtered = this.filteredDestinations.filter(opt => opt.isRecent === isRecent);
    return isRecent ? filtered.sort((a, b) => a.order - b.order) : filtered;
  }

  filterDestinations(key?: string) {
    this.destinationPopup = true;
    this.filteredDestinations = key ? this.marketsIata
      .filter(opt => this.existOption(opt, key)) : this.marketsIata;
  }

  getRecentOrigins(): IStation[] {
    let cookie = this._stationService.getOriginsStations();
    return cookie.map(val => this.stations.StationList
      .find(station => station.code === val.iataCode));
  }

  getRecentDestinations(): IMarket[] {
    let cookie = this._stationService.getDestinationsStations();
    return cookie.map(val => this.marketsIata
      .find(station => station.code === val.iataCode)).filter(Boolean);
  }

  getDestinations() {
    let recentDestinations = this.getRecentDestinations();
    this.filteredDestinations = this.marketsIata.map(station => {
      station.isRecent = recentDestinations.includes(station);
      station.order = recentDestinations.indexOf(station);
      return station;
    });
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

  deleteOrigins() {
    this._stationService.removeOriginsStations();
    this.clearInputOrigin();
  }

  deleteDestinations() {
    this._stationService.removeDestinationsStations();
    this.clearInputDestination();
  }

  clearInputOrigin() {
    this.getStations();
    this.clearInputDestination();
  }

  clearInputDestination(el?) {
    this.getMarketsByIata(this.originSelected)
    this.toggleDestinationPopUp(el ? el : null);
  }

  selectOrigin(iata: string) {
    this.originSelected = iata;
    this.togglePopUp();
    this.clearInputDestination();
  }

  selectDestination() {
    this.toggleDestinationPopUp();
  }

  togglePopUp() {
    this.destinationPopup = false;
    this.originPopup = !this.originPopup;
  }

  toggleDestinationPopUp(el?) {
    if (this.originSelected) {
      this.originPopup = false;
      this.destinationPopup = !this.destinationPopup;
    } else {
      if (el) {
        el.focus();
      }
      this.togglePopUp();
    }
  }
}
