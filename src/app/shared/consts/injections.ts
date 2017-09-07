import { InjectionToken } from '@angular/core';

export const NUM_RECENT_SEARCHES = new InjectionToken<number>('numRecentSearches');

export const NUM_RECENT_SEARCHES_PROV = {
    provide: NUM_RECENT_SEARCHES, useValue: 3
};
