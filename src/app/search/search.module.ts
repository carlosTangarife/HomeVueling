import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { ConfigService } from '../shared/services/config.service';

export function configServiceFactory(config: ConfigService) {
  let obs = config.load();

  return () => obs;
}

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
    PassengerComponent

  ],
  exports: [
    // ...SEARCH_COMPONENTS
  ],
  providers: [{ provide: APP_INITIALIZER, useFactory: configServiceFactory, deps: [ConfigService], multi: true },
    DestinationsService, ResourcesService, LoggerService, StorageService, ConfigService],
  entryComponents: [SEARCH_COMPONENTS]
})
export class SearchModule { }
