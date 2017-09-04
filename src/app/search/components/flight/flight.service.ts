import { Injectable } from '@angular/core';
import { StationService } from '../../../shared/services/station.service';
import { IStation, IMarket, IFlight } from '../../components/flight/flight.model';

@Injectable()
export class FlightService {
  public marketsIata: IMarket[];
  public filteredOrigins: IStation[];
  public filteredDestinations: IMarket[];
  constructor(private _stationService: StationService) { }

  getStations() {
    let recentOrigins = this.getRecentOrigins();
    this.filteredOrigins = this.stations.StationList.map(station => {
      station.isRecent = recentOrigins.includes(station);
      station.order = recentOrigins.indexOf(station);
      return station;
    });
  }

  filterStationsByRecent(isRecent: boolean) {
    let filtered = this.filteredOrigins.filter(opt => opt.isRecent === isRecent);
    return isRecent ? filtered.sort((a, b) => a.order - b.order) : filtered;
  }

  filterStations(key?: string) {
    this.originPopup = true;
    this.filteredOrigins = key ? this.stations.StationList
      .filter(opt => opt.name.toLowerCase().match(key.toLowerCase())
        || opt.code.toLowerCase().match(key.toLowerCase())
        || opt.countryCode.toLowerCase().match(key.toLowerCase())
        || opt.countryName.toLowerCase().match(key.toLowerCase())) : this.stations.StationList;
  }

  filterDestinationsByRecent(isRecent: boolean) {
    let filtered = this.filteredDestinations.filter(opt => opt.isRecent === isRecent);
    return isRecent ? filtered.sort((a, b) => a.order - b.order) : filtered;
  }

  filterDestinations(key?: string) {
    this.destinationPopup = true;
    this.filteredDestinations = key ? this.marketsIata
      .filter(opt => opt.name.toLowerCase().match(key.toLowerCase())
        || opt.code.toLowerCase().match(key.toLowerCase())
        || opt.countryCode.toLowerCase().match(key.toLowerCase())
        || opt.countryName.toLowerCase().match(key.toLowerCase())) : this.marketsIata;
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

  saveSearch(dataFlight: IFlight) {
    this._stationService.saveStationOrigin(dataFlight.origin.code);
    this._stationService.saveStationDestination(dataFlight.destination.code);
  }
}
