import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { IIcon } from '../../shared/models/commons.model';

@Injectable()
export class TabStateService {
    private searcherConfig: any;
    private isFlight: boolean;
    private isCheckIn: boolean;
    private isReservation: boolean;

    constructor() {
        this.isFlight = true;
        this.isCheckIn = false;
        this.isReservation = false;
    }

    setConfiguration(config: any) {
        this.searcherConfig = config;
    }

    getTabConfiguration(tabKey: string, prop?: string): any {
        if (prop) {
            return this.searcherConfig[tabKey][prop];
        }
        return this.searcherConfig[tabKey];
    }

    isActive(tabKey: string): boolean {
        switch (tabKey) {
            case 'FlightSearch':
                return this.isFlight;
            case 'Checkin':
                return this.isCheckIn;
            case 'YourBooking':
                return this.isReservation
            default:
                return false;
        }
    }

    activeTab(tabKey: string) {
        this.isFlight = false;
        this.isCheckIn = false;
        this.isReservation = false;
        switch (tabKey) {
            case 'FlightSearch':
                this.isFlight = true;
                break;
            case 'Checkin':
                this.isCheckIn = true;
                break;
            case 'YourBooking':
                this.isReservation = true;
                break;
        }
    }

    isEnabled(tabKey: string): boolean {
        return this.searcherConfig[tabKey].IsEnabled;
    }
}
