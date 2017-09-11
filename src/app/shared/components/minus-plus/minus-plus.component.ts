import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MinusPlusService } from '../../services/minus-plus.service';
import { IDataMinusPlus } from '../../../search/components/flight/flight.model';

@Component({
  selector: '[app-minus-plus]',
  templateUrl: './minus-plus.component.html',
  providers: [ MinusPlusService ]
})
export class MinusPlusComponent implements OnInit {
  @Input()
  data: IDataMinusPlus;

  @Output()
  changeValue = new EventEmitter<number>();

  constructor(public _minusPlusService: MinusPlusService) { }

  ngOnInit() {
    this._minusPlusService.initService(this.data.value);

    this._minusPlusService.value$.subscribe(val => {
      this.changeValue.emit(val);
    });
  }

  increase() {
    if (this.data.plus) {
      this._minusPlusService.increase();
    }
  }

  decrease() {
    if (this.data.minus) {
      this._minusPlusService.decrease();
    }
  }
}
