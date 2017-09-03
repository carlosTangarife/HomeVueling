import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDataPassenger } from './type-passenger.model';

@Component({
  selector: 'app-type-passenger',
  templateUrl: './type-passenger.component.html'
})
export class TypePassengerComponent implements OnInit {
  private dataPassenger: IDataPassenger;

  @Input() label: string;
  @Input() rulAge: string;
  @Input() age: string;
  @Input() info: boolean;

  constructor() { }

  ngOnInit() {
  }
}
