import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationSelectorComponent } from './destination-selector.component';

describe('DestinationSelectorComponent', () => {
  let component: DestinationSelectorComponent;
  let fixture: ComponentFixture<DestinationSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
