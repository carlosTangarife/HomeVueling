import { APP_INITIALIZER } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { ResourcesService } from '../services/resources.service';
import { StorageService } from '../services/storage.service';
import { ConfigService } from '../services/config.service';
import { StationService } from '../services/station.service';
import { CookiesWrapper } from '../services/cookies-wrapper.service';

function configServiceFactory(config: ConfigService) {
    let obs = config.load();

    return () => obs;
}

export const APP_INITIALIZER_PROV = {
    provide: APP_INITIALIZER, useFactory: configServiceFactory, deps: [ConfigService], multi: true
};

export const SHARED_SERVICES = [
    ResourcesService,
    LoggerService,
    StorageService,
    ConfigService,
    CookiesWrapper,
    StationService
];
