import { Injectable } from '@angular/core';
import { ConfigService } from '../../../shared/services/config.service';
import { StationService } from '../../../shared/services/station.service';
import { IStation, IMarket, IFlight, IStationList } from '../../components/flight/flight.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FlightService {
  public markets: any;
  public marketsIata: IMarket[];
  public stations: IStationList;
  public filteredOrigins: IStation[];
  public filteredDestinations: IMarket[];

  private subjectStations = new BehaviorSubject<IStation[]>(this.filteredOrigins);
  public sourceRecent$ = this.subjectStations.asObservable();

  private subjectStationsCurrent = new BehaviorSubject<IStation[]>(this.filteredOrigins);
  public sourceCurrent$ = this.subjectStationsCurrent.asObservable();

  constructor(private _configService: ConfigService, private _stationService: StationService) {
    this.stations = this._configService.environment['stations'];
    this.markets = this._configService.environment['markets'];
  }

  getStations() {
    let recentOrigins = this.getRecentOrigins();
    this.filteredOrigins = this.stations.StationList
      .map(station => {
        station.isRecent = recentOrigins.includes(station);
        station.order = recentOrigins.indexOf(station);
        return station;
      });
  }

  recent() {
    let filterRecent = this.filteredOrigins.filter(opt => opt.isRecent === true).sort((a, b) => a.order - b.order);
    this.subjectStations.next(filterRecent);
  }

  current() {
    let filterCurrent = this.filteredOrigins.filter(opt => opt.isRecent === false);
    this.subjectStationsCurrent.next(filterCurrent);
  }

  filterStations(key?: string) {
    this.filteredOrigins = key ? this.filterGeneralStations(this.stations.StationList, key) : this.stations.StationList;
    this.subjectStationsCurrent.next(this.filteredOrigins);
  }

  filterDestinationsByRecent(isRecent: boolean) {
    let filtered = this.filteredDestinations.filter(opt => opt.isRecent === isRecent);
    return isRecent ? filtered.sort((a, b) => a.order - b.order) : filtered;
  }

  private filterGeneralStations(data: any, key?: string) {
    return data.filter(opt => opt.name.toLowerCase().match(key.toLowerCase())
    || opt.code.toLowerCase().match(key.toLowerCase())
    || opt.countryCode.toLowerCase().match(key.toLowerCase())
    || opt.countryName.toLowerCase().match(key.toLowerCase()))
  }

  private filterDestinations(key?: string) {
    this.filteredDestinations = key ? this.filterGeneralStations(this.marketsIata, key) : this.marketsIata;
  }

  private getRecentOrigins(): IStation[] {
    let cookie = this._stationService.getOriginsStations();
    return cookie
                .map(val => this.stations.StationList
                .find(station => station.code === val.iataCode));
  }

  private getRecentDestinations(): IMarket[] {
    let cookie = this._stationService.getDestinationsStations();
    return cookie
                .map(val => this.marketsIata
                .find(station => station.code === val.iataCode))
                .filter(Boolean);
  }

  getDestinations() {
    let recentDestinations = this.getRecentDestinations();
    this.filteredDestinations = this.marketsIata.map(station => {
      station.isRecent = recentDestinations.includes(station);
      station.order = recentDestinations.indexOf(station);
      return station;
    });

    this.recent();
    this.current();
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
      })
      .filter(Boolean) : this.marketsIata = [];
  }

  private deleteOrigins() {
    this._stationService.removeOriginsStations();
    // this.clearInputOrigin();
  }

  private deleteDestinations() {
    this._stationService.removeDestinationsStations();
    // this.clearInputDestination();
  }

  saveSearch(dataFlight: IFlight) {
    this._stationService.saveStationOrigin(dataFlight.origin.code);
    this._stationService.saveStationDestination(dataFlight.destination.code);
  }
}
