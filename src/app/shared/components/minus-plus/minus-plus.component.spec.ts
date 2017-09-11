import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinusPlusComponent } from './minus-plus.component';

describe('MinusPlusComponent', () => {
  let component: MinusPlusComponent;
  let fixture: ComponentFixture<MinusPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinusPlusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinusPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
