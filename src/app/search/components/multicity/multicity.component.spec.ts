import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticityComponent } from './multicity.component';

describe('MulticityComponent', () => {
  let component: MulticityComponent;
  let fixture: ComponentFixture<MulticityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulticityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
