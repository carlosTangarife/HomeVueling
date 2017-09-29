import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CheckInComponent } from './check-in.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import 'rxjs/Rx';
/* Services */
import { CalendarService } from '../../services/calendar.service';
import { CheckInService } from '../../services/check-in.service';
import { SelectorService } from '../../../shared/services/selector.service';
import { LinksHubService } from './../../../shared/services/links-hub.service';


describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule],
      declarations: [CheckInComponent],
      providers: [CalendarService, CheckInService, SelectorService, LinksHubService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // it ('checkInWithEmail should be true and checkInWithOriginDestination should be false', () => {
  //   component.showEmail();
  //   expect(component.checkInWithEmail).toBeTruthy();
  //   expect(component.checkInWithOriginDestination).toBeFalsy();
  // });

  // it ('checkInWithEmail should be false and checkInWithOriginDestination should be true', () => {
  //   expect(component.checkInWithEmail).toBeFalsy();
  //   expect(component.checkInWithOriginDestination).toBeTruthy();
  // });
});
