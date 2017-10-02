import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListIconLinkComponent } from './list-icon-link.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DictionaryPipe } from '../../pipes/dictionary.pipe';


fdescribe('ListIconLinkComponent', () => {
  let component: ListIconLinkComponent;
  let fixture: ComponentFixture<ListIconLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIconLinkComponent, DictionaryPipe ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ListIconLinkComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      });

  fit('should be created', () => {
    debugger;
    expect(fixture).toBeTruthy();
  });
});
