import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFooterComponent } from './index-footer.component';

fdescribe('IndexFooterComponent', () => {
  let component: IndexFooterComponent;
  let fixture: ComponentFixture<IndexFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
