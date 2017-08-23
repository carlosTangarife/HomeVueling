import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-station-selector',
  template: `
    <div class="form-group" *ngIf="show">
      <label for="usr">{{label}}</label><br>
      <select [(ngModel)]="iata" name="value" #value="ngModel" class="form-control" (ngModelChange)="selected()">
        <option *ngFor="let t of stations | async" [ngValue]="t.code" >{{t.name}} {{t.code}} </option>
      </select>
    </div>
  `
})
export class StationSelectorComponent implements OnInit {
  public iata: string;
  @Input() show: boolean;
  @Input() label: string;
  @Input() stations: any;
  @Input() parent: boolean;

  @Output() stationSelected = new EventEmitter<any>();

  constructor() {
    this.show = true;
  }

  ngOnInit() {}

  selected() {
    if (this.parent) {
      alert(this.iata);
      this.stationSelected.emit(this.iata);
      this.parent = false;
    }
  }
}
