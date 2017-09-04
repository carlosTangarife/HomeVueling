import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsSelectorComponent } from './destinations-selector.component';

describe('DestinationsSelectorComponent', () => {
  let component: DestinationsSelectorComponent;
  let fixture: ComponentFixture<DestinationsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
