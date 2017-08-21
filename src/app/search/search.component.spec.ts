import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';



// SearchComponent test
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it ('should have a title of Probando los testing', () => {
    expect(component.title).toEqual('Probando los testing');
  });
});

