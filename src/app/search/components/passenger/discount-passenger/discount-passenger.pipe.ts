import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPassenger'
})

export class DiscountPassengerPipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      return `(${ value }%)`;
    }else {
      return null;
    }
  }
}
