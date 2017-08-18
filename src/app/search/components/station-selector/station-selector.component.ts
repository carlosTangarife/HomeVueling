import { Component, OnInit, Input } from '@angular/core';
import { DestinationsService } from '../../services/destinations.service'

@Component({
  selector: 'app-station-selector',
  templateUrl: './station-selector.component.html',
  styleUrls: ['./station-selector.component.css']
})
export class StationSelectorComponent implements OnInit {
  public destinations$;
  @Input() show: boolean;
  public textoPrueba: string;
  public iata: string;
  constructor(public _ds: DestinationsService) {
    this.show = true;
    this.textoPrueba = 'prueba';
  }

  ngOnInit() {
     this.destinations$ = this._ds.getDestinations();
  }

  selected() {
    console.log(this.iata);
  }
}
