import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MinusPlusComponent } from './minus-plus.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('MinusPlusComponent', () => {
  let component: MinusPlusComponent;
  let fixture: ComponentFixture<MinusPlusComponent>;

  beforeEach(() => {
    debugger;
    TestBed.configureTestingModule({
      imports: [],
      declarations: [MinusPlusComponent],
    });
    fixture = TestBed.createComponent(MinusPlusComponent)
  });

  fit('should be created', () => {
    expect(fixture).toBeTruthy();
  });
});
