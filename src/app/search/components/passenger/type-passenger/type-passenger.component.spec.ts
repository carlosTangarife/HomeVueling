import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePassengerComponent } from './type-passenger.component';

describe('TypePassengerComponent', () => {
  let component: TypePassengerComponent;
  let fixture: ComponentFixture<TypePassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypePassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
