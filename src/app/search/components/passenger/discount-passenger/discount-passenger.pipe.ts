import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPassenger'
})

/*was created the pipe, this gives a special formatting to the discount and returns it in this format (65%) */
export class DiscountPassengerPipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      return `(${ value }%)`;
    }else {
      return null;
    }
  }
}
