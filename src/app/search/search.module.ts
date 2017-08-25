import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SEARCH_COMPONENTS } from './index';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PassengerComponent } from './components/passenger/passenger.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ...SEARCH_COMPONENTS,
    CalendarComponent,
    PassengerComponent,

  ],
  exports: [
    // ...SEARCH_COMPONENTS
  ],
  providers: [],
  entryComponents: [SEARCH_COMPONENTS]
})
export class SearchModule { }
