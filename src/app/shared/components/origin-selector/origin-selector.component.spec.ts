import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OriginSelectorComponent } from './origin-selector.component';
import { DictionaryPipe } from '../../pipes/dictionary.pipe';
import { ConfigService } from '../../services/config.service';
import { StationService } from '../../services/station.service';
import { SelectorService } from '../../services/selector.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockDictionary, MockStationService, MockSelectorService } from '../testing/mocks';


fdescribe('OriginSelectorComponent', () => {
  debugger;
  let component: OriginSelectorComponent;
  let fixture: ComponentFixture<OriginSelectorComponent>

  let configService: ConfigService;
  let stationService: StationService;
  let selectorService: SelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginSelectorComponent, DictionaryPipe ],
      providers: [
        {provide: ConfigService, useClass: MockDictionary },
        {provide: StationService, useClass: MockStationService},
        {provide: SelectorService, useClass: MockSelectorService}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .overrideComponent(OriginSelectorComponent, {
      set: {
        providers: [
          {provide: SelectorService, useClass: MockSelectorService}
            ]
      }
    });

    component = TestBed.createComponent(OriginSelectorComponent).componentInstance;
    configService = TestBed.get(ConfigService);
    stationService = TestBed.get(StationService);
    selectorService = TestBed.get(SelectorService);
  });

  fit('should be created', () => {
    expect(component).toBeTruthy();
  });

});
