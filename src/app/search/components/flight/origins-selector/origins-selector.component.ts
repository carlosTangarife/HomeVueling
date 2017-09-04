import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FlightService } from 'app/search/components/flight/flight.service';
import { IFlight, IStation } from 'app/search/components/flight/flight.model';
import { NgForm } from '@angular/forms/src/forms';

@Component({
  selector: 'app-origins-selector',
  templateUrl: './origins-selector.component.html',
  providers: [FlightService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OriginsSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
