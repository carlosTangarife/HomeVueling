import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MinusPlusService } from '../../services/minus-plus.service';
import { IDataMinusPlus } from '../../models/minus-plus.model';

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

  @Output()
  changeOtherValue = new EventEmitter<number>();

  constructor(public minusPlusService: MinusPlusService) { }

  ngOnInit() {
    this.data.value.subscribe(val => {
      this.minusPlusService.initService(val);
      this.changeOtherValue.emit(this.minusPlusService.value);
    });
  }

  increase() {
    if (this.data.plus) {
      this.minusPlusService.increase();
      this.changeValue.emit(this.minusPlusService.value);
    }
  }

  decrease() {
    if (this.data.minus) {
      this.minusPlusService.decrease();
      this.changeValue.emit(this.minusPlusService.value);
    }
  }
}
