import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FlightService } from 'app/search/components/flight/flight.service';
import { IFlight, IStation } from 'app/search/components/flight/flight.model';
import { NgForm } from '@angular/forms/src/forms';

@Component({
  selector: 'app-destinations-selector',
  templateUrl: './destinations-selector.component.html',
  providers: [FlightService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationsSelectorComponent implements OnInit {

  public dataFlight: IFlight;
  public originPopup = false;
  public destinationPopup = false;

  constructor(protected _fs: FlightService) { }

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
  }

  onSubmit(formFlight: NgForm) {
    this._fs.saveSearch(this.dataFlight);
    console.log(formFlight);
    window.location.href = '/';
  }

  clearInputOrigin() {
    this.dataFlight.origin.code = '';
    this.dataFlight.origin.name = '';
    this._fs.getStations();
    this.clearInputDestination();
  }

  clearInputDestination(el?) {
    this.dataFlight.destination.code = '';
    this.dataFlight.destination.name = '';
    this._fs.getMarketsByIata(this.dataFlight.origin.code)
    this.toggleDestinationPopUp(el ? el : null);
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

  toggleDestinationPopUp(el?) {
    if (this.dataFlight.origin.code) {
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
