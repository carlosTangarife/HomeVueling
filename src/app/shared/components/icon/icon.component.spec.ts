import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { FormsModule } from '@angular/forms';

fdescribe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(() => {
    debugger;
    TestBed.configureTestingModule({
      imports: [],
      declarations: [IconComponent],
    });
    fixture = TestBed.createComponent(IconComponent)
  });

  fit ('should be created', () => {
    debugger;
    expect(fixture).toBeTruthy();
  });

  // fit ('should return a array not empty', () => {
  //   debugger;
  //   expect(component.paths).toBeDefined();
  // });
});

