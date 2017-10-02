import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-places]',
  templateUrl: './places.component.html'
})
export class PlacesComponent implements OnInit {
  @Input() label: string;
  @Input() data: any;
  @Input() showErase: boolean;
  @Output() selectedEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  public dataLength: number;

  constructor() {}

  ngOnInit() {
    this.data.subscribe((value) => this.dataLength = value.length);
  }

  deleteRecentStations() {
    this.deleteEvent.emit();
  }

  stationSelected(station: any) {
    this.selectedEvent.emit(station);
   }
}
