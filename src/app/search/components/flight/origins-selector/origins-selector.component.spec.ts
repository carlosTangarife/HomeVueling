import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginsSelectorComponent } from './origins-selector.component';

describe('OriginsSelectorComponent', () => {
  let component: OriginsSelectorComponent;
  let fixture: ComponentFixture<OriginsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
