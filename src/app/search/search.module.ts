import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SEARCH_COMPONENTS } from './index';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { DestinationsService } from '../shared/services/destinations.service';
import { LoggerService } from '../shared/services/logger.service';
import { ResourcesService } from '../shared/services/resources.service';
import { StorageService } from '../shared/services/storage.service';
import { TypePassengerComponent } from './components/passenger/type-passenger/type-passenger.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
    ...SEARCH_COMPONENTS,
    CalendarComponent,
    PassengerComponent,
    TypePassengerComponent

  ],
  exports: [
    // ...SEARCH_COMPONENTS
  ],
  providers: [DestinationsService, ResourcesService, LoggerService, StorageService],
  entryComponents: [SEARCH_COMPONENTS]
})
export class SearchModule { }
