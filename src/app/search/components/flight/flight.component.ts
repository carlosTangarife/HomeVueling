import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/forms';
import { IFlight, IStation, IMarket } from './flight.model';
import { DestinationsService } from '../../../shared/services/destinations.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',

})
export class FlightComponent implements OnInit {
  public stationResent$: Observable<IStation[]>;
  public stations$: Observable<IStation[]>;
  public destinationsResent$: Observable<IMarket[]>;
  public destinations$: Observable<IMarket[]>;
  public dataFlight: IFlight;
  public originPopup = false;
  public destinationPopup = false;
  constructor( public _ds: DestinationsService) { }

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
        adult: 1,
        children: 1,
        babies: 0,
        extraSeat: 0,
        totalPassengers: 1
      }
    };
    this.getStations();
    this.stationResent$ = this._ds.getRecentSearch();
  }

  getStations(key?: string) {
      this.stations$ = this._ds.getStationsOrigin(key);
  }

  submit(formFlight: NgForm) {
    console.log(formFlight);
  }


  clearInputDestination() {
    this.dataFlight.destination.code = '';
    this.dataFlight.destination.name = '';
    // this.destinations$ = this._ds.getStationsDestination(this.dataFlight.origin.code);
    this.toggleDestinationPopUp();
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
    // this.destinations$ = this._ds.getStationsDestination(originSelected.code);
    // this._ds.getStationsDestination(originSelected.code).subscribe(res => console.log(res));
    this.togglePopUp();
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
