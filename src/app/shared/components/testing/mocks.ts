import { Observable } from 'rxjs/Rx';
import { IStation } from '../../models/station.model';

const Dictionary = 'ES';
const stations: IStation = { code: 'LCG', countryCode: 'ES', countryName: 'España', isRecent: false, macCode: '',
name: 'A Coruña', order: -1 };


export class MockDictionary {
    getDictionary(key: string) {
        return Dictionary;
    }
};

export class MockConfigService {
    getConfigStations(): any {
        return {};
      }
}

export class MockStationService {
    getCookieStations(key: string) {
        return {iataCode: 'LCG', Date: new Date()}
    }
};

export class MockSelectorService {
    loadListStations(isOrigin: boolean) {
        return true;
    }
    getStations(isOrigin: boolean) {
        return stations;
    }
    getRecentStations(isOrigin: boolean) {
        return {iataCode: 'LCG', Date: new Date()};
    }
};
