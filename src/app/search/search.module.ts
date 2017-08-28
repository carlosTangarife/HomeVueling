import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SEARCH_COMPONENTS } from './index';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { DestinationsService } from '../shared/services/destinations.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...SEARCH_COMPONENTS,
    CalendarComponent,
    PassengerComponent

  ],
  exports: [
    // ...SEARCH_COMPONENTS
  ],
  providers: [DestinationsService],
  entryComponents: [SEARCH_COMPONENTS]
})
export class SearchModule { }
