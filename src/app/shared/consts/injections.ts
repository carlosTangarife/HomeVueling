import { InjectionToken } from '@angular/core';
import { ConfigService } from '../services/config.service';

function retrieveConfigSearches(_config: ConfigService) {
    return _config.retrieveConfigSearches();
}

export const NUM_RECENT_SEARCHES = new InjectionToken<number>('numRecentSearches');

export const NUM_RECENT_SEARCHES_PROV = {
    provide: NUM_RECENT_SEARCHES, useFactory: retrieveConfigSearches, deps: [ConfigService], multi: true
};
