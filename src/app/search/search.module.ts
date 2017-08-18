import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";
import { SearchComponent } from './search.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { FlightComponent } from './components/flight/flight.component';
import { CheckInService } from "./components/check-in/check-in.service";

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [SearchComponent, CheckInComponent, ReservationComponent, FlightComponent, CheckInService, HttpModule],
  providers: [{ provide: 'components', useValue: [SearchComponent], multi: true }],
  entryComponents: [SearchComponent],
  
})
export class SearchModule { }
