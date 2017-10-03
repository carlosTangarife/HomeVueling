import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OriginSelectorComponent } from './origin-selector.component';
import { SelectorService } from '../../services/selector.service';
import { ConfigService } from '../../services/config.service';
import { StationService } from '../../services/station.service';
import { DictionaryPipe } from '../../pipes/dictionary.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('OriginSelectorComponent', () => {
  debugger;
  let component: OriginSelectorComponent;
  let fixture: ComponentFixture<OriginSelectorComponent>

  let configService = {
    getDictionary(key: string) {
      return '';
    }
  }

  let selectorService = {
    loadListStations(isOrigin: boolean) {
      return true;
    },
    getStations(isOrigin: boolean) {
      return {code: 'LCG', countryCode: 'ES', countryName: 'España', isRecent: false, macCode: '',
      name: 'A Coruña', order: -1 };
    }
  }

  let stationService = {
    getCookieStations(key: string) {
      return {iataCode: 'LCG', Date: new Date()}
    }
  }

  beforeEach(async(() => {
    debugger;
    TestBed.configureTestingModule({
      declarations: [ OriginSelectorComponent, DictionaryPipe ],
      providers: [
                  {provide: SelectorService, useValue: selectorService},
                  {provide: ConfigService, useValue: configService},
                  {provide: StationService, useValue: stationService}
                    ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    // .compileComponents();
    fixture = TestBed.createComponent(OriginSelectorComponent);
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(OriginSelectorComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  fit('should be created', () => {
    debugger;
    expect(fixture).toBeTruthy();
  });
});
