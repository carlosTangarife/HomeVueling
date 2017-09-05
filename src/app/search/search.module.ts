import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SEARCH_COMPONENTS } from './index';
import { LoggerService } from '../shared/services/logger.service';
import { ResourcesService } from '../shared/services/resources.service';
import { StorageService } from '../shared/services/storage.service';
import { ConfigService } from '../shared/services/config.service';
import { StationService } from 'app/shared/services/station.service';
import { CookiesWrapper } from 'app/shared/services/cookies-wrapper.service';

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
    ...SEARCH_COMPONENTS
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
