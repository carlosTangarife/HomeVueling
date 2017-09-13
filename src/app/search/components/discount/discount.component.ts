import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: '[app-discount]',
  templateUrl: './discount.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscountComponent implements OnInit {
  @Input()
  typeDiscountSelected: string;

  @Input()
  isResident: boolean;

  @Input()
  isLargeFamily: boolean;

  @Output()
  eventToggleDiscountList = new EventEmitter<any>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.isResident = false;
    this.isLargeFamily = false;
  }

  ngOnInit() {
  }

  typeSelected(): boolean {
    return this.typeDiscountSelected ? true : false;
  }

  toggleDiscountList() {
    this.eventToggleDiscountList.emit();
  }

  titleDiscount(): string {
    if (this.isResident && this.isLargeFamily) {
      return 'titleDiscount';
    } else {
      return this.isResident ? 'titleDiscountResident' : 'titleDiscountLargeFamily';
    }
  }
}
