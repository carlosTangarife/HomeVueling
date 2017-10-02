import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { PlacesComponent } from './places.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DictionaryPipe } from '../../pipes/dictionary.pipe';
import { ConfigService } from '../../services/config.service';
// import { ResourcesService } from '../../services/resources.service';
// import { LoggerService } from '../../services/logger.service';
// import { StorageService } from '../../services/storage.service';
// import { PersistenceService } from 'angular-persistence';
// import { Http } from '@angular/http';

fdescribe('PlacesComponent', () => {
  let component: PlacesComponent;
  let fixture: ComponentFixture<PlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesComponent, DictionaryPipe ],
      providers: [ ConfigService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

  fit ('should be created', () => {
    expect(fixture).toBeTruthy();
  });

});
