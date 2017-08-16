import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { FlightComponent } from './components/flight/flight.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchComponent, CheckInComponent, ReservationComponent, FlightComponent],
  providers: [{ provide: 'components', useValue: [SearchComponent], multi: true }],
  entryComponents: [SearchComponent]
})
export class SearchModule { }
