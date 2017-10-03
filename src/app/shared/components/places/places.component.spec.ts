import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { PlacesComponent } from './places.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DictionaryPipe } from '../../pipes/dictionary.pipe';
import { ConfigService } from '../../services/config.service';
import { ResourcesService } from '../../services/resources.service';
import { LoggerService } from '../../services/logger.service';
import { StorageService } from '../../services/storage.service';
import { PersistenceService } from 'angular-persistence';
import { Http } from '@angular/http';

fdescribe('PlacesComponent', () => {
  let component: PlacesComponent;
  let fixture: ComponentFixture<PlacesComponent>;

<<<<<<< HEAD
  beforeEach(() => {
    debugger;
=======
  beforeEach(async(() => {
>>>>>>> ee925976f3be319c02087b5f1f6e85ae39fb5658
    TestBed.configureTestingModule({
      imports:  [ Http ],
      declarations: [ PlacesComponent, DictionaryPipe ],
      providers: [ ConfigService, ResourcesService, LoggerService, StorageService, PersistenceService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PlacesComponent)
  });

  beforeEach(() => {
    debugger;
    fixture = TestBed.createComponent(PlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

  fit ('should be created', () => {
    expect(fixture).toBeTruthy();
  });

});
