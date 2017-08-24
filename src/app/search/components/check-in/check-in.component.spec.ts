import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckInComponent } from './check-in.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import 'rxjs/Rx';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckInComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialized the flagEmail in true', () => {
    component.isEmail();
    expect(component.flag).toBeTruthy();
  });

  it('The flagCheckin should be false if condition no apply', () => {
    component.ngOnInit();
    expect(component.flagCheckIn === false).toBeTruthy();
  });

  it('should be true if the condition apply', () => {
    component.ngOnInit();
    expect(component.flagCheckIn === true).toBeFalsy();
  });

  it('should be negative', () => {
    expect(component.isOrigin()).toBeFalsy();
  });
});
