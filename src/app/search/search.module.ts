import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SEARCH_COMPONENTS } from './index';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { LoggerService } from '../shared/services/logger.service';
import { ResourcesService } from '../shared/services/resources.service';
import { StorageService } from '../shared/services/storage.service';
import { TypePassengerComponent } from './components/passenger/type-passenger/type-passenger.component';
import { ConfigService } from '../shared/services/config.service';
import { StationService } from 'app/shared/services/station.service';
import { CookiesWrapper } from 'app/shared/services/cookies-wrapper.service';
import { DestinationsSelectorComponent } from './components/flight/destinations-selector/destinations-selector.component';
import { OriginsSelectorComponent } from './components/flight/origins-selector/origins-selector.component';

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
    PassengerComponent,
    TypePassengerComponent,
    DestinationsSelectorComponent,
    OriginsSelectorComponent
  ],
  exports: [
    // ...SEARCH_COMPONENTS
  ],
  providers: [{ provide: APP_INITIALIZER, useFactory: configServiceFactory, deps: [ConfigService], multi: true },
    ResourcesService, LoggerService, StorageService,
    ConfigService, CookiesWrapper, StationService, {provide: Number, useValue: 3}],
  entryComponents: [SEARCH_COMPONENTS]
})
export class SearchModule { }
