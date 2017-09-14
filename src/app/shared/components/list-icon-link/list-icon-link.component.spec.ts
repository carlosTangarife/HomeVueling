import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIconLinkComponent } from './list-icon-link.component';

describe('ListIconLinkComponent', () => {
  let component: ListIconLinkComponent;
  let fixture: ComponentFixture<ListIconLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIconLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIconLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
