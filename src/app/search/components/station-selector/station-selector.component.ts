import { Component, OnInit, Input } from '@angular/core';
import { DestinatiosService } from '../../services/destinations.service'

@Component({
  selector: 'app-station-selector',
  templateUrl: './station-selector.component.html',
  styleUrls: ['./station-selector.component.css']
})
export class StationSelectorComponent implements OnInit {
  public destinations: any;
  @Input() show: boolean;
  public textoPrueba: string;
  public iata: string;
  constructor(public _ds: DestinatiosService) {
    this.show = true;
    this.textoPrueba = 'prueba';
  }

  ngOnInit() {
    this.destinations = this._ds.getDestinations();
  }

  selected() {
    console.log(this.iata);
  }
}
