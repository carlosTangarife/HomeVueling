import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/forms';
import { IFlight, IStation, IMarket, IStationList, IDestination } from './flight.model';
import { DestinationsService } from '../../../shared/services/destinations.service';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from 'app/shared/services/config.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',

})
export class FlightComponent implements OnInit {
  public stationResent$: IStation[];
  public stations$: IStation[];
  public destinationsResent$: IStation[];
  public destinations$: IMarket[];
  public dataFlight: IFlight;
  public originPopup = false;
  public destinationPopup = false;
  constructor(private _ds: DestinationsService, private _configService: ConfigService) { }

  ngOnInit() {
    this.dataFlight = {
      origin: {
        code: 'BCN',
        name: 'Barcelona'
      },
      destination: {
        code: 'MAD',
        name: 'Madrid'
      },
      going: new Date(),
      return: new Date(17, 8, 15),
      passenger: {
        adult: 3,
        children: 3,
        babies: 0,
        extraSeat: 0,
        totalPassengers: 6
      }
    };
    this.getStations();
    this.stationResent$ = this._ds.getRecentSearch();
    this.destinationsResent$ = this._ds.getRecentSearch();
  }

  getStations(key?: string) {
    let stations: IStationList = this._configService.environment['stations'];
    this.stations$ = key ? this.filterStations(stations.StationList, key.toLowerCase()) : stations.StationList;
  }

  filterStations(options: IStation[], key: string): IStation[] {
    return options
      .filter(opt => opt.name.toLowerCase().match(key)
        || opt.code.toLowerCase().match(key)
        || opt.countryCode.toLowerCase().match(key)
        || opt.countryName.toLowerCase().match(key));
  }

  filterMarkets(options: IMarket[], key: string): IMarket[] {
    return options
      .filter(opt => opt.name.toLowerCase().match(key)
        || opt.code.toLowerCase().match(key)
        || opt.countryCode.toLowerCase().match(key)
        || opt.countryName.toLowerCase().match(key));
  }

  submit(formFlight: NgForm) {
    console.log(formFlight);
  }

  moreAdults() {
    if (this.dataFlight.passenger.adult < 16) {
      this.dataFlight.passenger.adult += 1;
      this.totalPassenger();
    }
  }

  lessAdults() {
    if (this.dataFlight.passenger.adult > 0) {
      this.dataFlight.passenger.adult -= 1;
      this.totalPassenger();
    }
  }

  moreBabies() {
    if (this.dataFlight.passenger.babies < 16) {
      this.dataFlight.passenger.babies += 1;
      this.totalPassenger();
    }
  }

  lessBabies() {
    if (this.dataFlight.passenger.babies > 0) {
      this.dataFlight.passenger.babies -= 1;
      this.totalPassenger();
    }
  }

  moreChildren() {
    if (this.dataFlight.passenger.children < 16) {
      this.dataFlight.passenger.children += 1;
      this.totalPassenger();
    }
  }

  lessChildren() {
    if (this.dataFlight.passenger.children > 0) {
      this.dataFlight.passenger.children -= 1;
      this.totalPassenger();
    }
  }

  moreExtraSeat() {
    if (this.dataFlight.passenger.extraSeat < 16) {
      this.dataFlight.passenger.extraSeat += 1;
      this.totalPassenger();
    }
  }

  lessExtraSeat() {
    if (this.dataFlight.passenger.extraSeat > 0) {
      this.dataFlight.passenger.extraSeat -= 1;
      this.totalPassenger();
    }
  }

  totalPassenger() {
    this.dataFlight.passenger.totalPassengers = this.dataFlight.passenger.adult + this.dataFlight.passenger.babies + this.dataFlight.passenger.children + this.dataFlight.passenger.extraSeat;
  }

  clearInputDestination() {
    this.dataFlight.destination.code = '';
    this.dataFlight.destination.name = '';
    this.getStationsDestination(this.dataFlight.origin.code)
    this.toggleDestinationPopUp();
  }

  getStationsDestination(iata: string, key?: string): IMarket[] {
    if (!iata) {
      return [];
    }
    let stations: IStationList = this._configService.environment['stations'];
    let marketsIata: IDestination[] = this._configService.environment['markets'][iata];
    let markets: IMarket[] = marketsIata.map(market => {
      let station: IStation = stations.StationList.find(s => s.code === market.destination);
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
    }).filter(Boolean);
    return this.destinations$ = key ? this.filterMarkets(markets, key.toLowerCase()) : markets;
  }

  clearInputOrigin() {
    this.dataFlight.origin.code = '';
    this.dataFlight.origin.name = '';
    this.getStations();
    this.togglePopUp();
  }

  originSelected(originSelected: IStation) {
    this.dataFlight.origin.name = originSelected.name;
    this.dataFlight.origin.code = originSelected.code;
    this.dataFlight.origin.countryName = originSelected.countryName;
    this.togglePopUp();
    this.clearInputDestination();
  }

  destinationSelected(destinationSelected: IStation) {
    this.dataFlight.destination.name = destinationSelected.name;
    this.dataFlight.destination.code = destinationSelected.code;
    this.dataFlight.destination.countryName = destinationSelected.countryName;
    this.toggleDestinationPopUp();
  }

  togglePopUp() {
    this.destinationPopup = false;
    this.originPopup = !this.originPopup;
  }

  toggleDestinationPopUp() {
    if (this.dataFlight.origin.code) {
      this.originPopup = false;
      this.destinationPopup = !this.destinationPopup;
    } else {
      this.togglePopUp();
    }
  }
}
