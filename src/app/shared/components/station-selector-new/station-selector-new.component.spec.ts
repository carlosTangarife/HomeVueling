import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationSelectorNewComponent } from './station-selector-new.component';

describe('StationSelectorNewComponent', () => {
  let component: StationSelectorNewComponent;
  let fixture: ComponentFixture<StationSelectorNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationSelectorNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationSelectorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
