import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { PlacesComponent } from './places.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DictionaryPipe } from '../../pipes/dictionary.pipe';
import { ConfigService } from '../../services/config.service';
import { MockDictionary } from '../testing/mocks';

fdescribe('PlacesComponent', () => {
  let component: PlacesComponent;
  let fixture: ComponentFixture<PlacesComponent>;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesComponent, DictionaryPipe ],
      providers: [ {provide: ConfigService, useClass: MockDictionary} ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    component = TestBed.createComponent(PlacesComponent).componentInstance;
    configService = TestBed.get(ConfigService);
  });

  fit ('should be created', () => {
    expect(component).toBeTruthy();
  });
});
