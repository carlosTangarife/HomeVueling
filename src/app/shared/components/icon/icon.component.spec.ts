import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { FormsModule } from '@angular/forms';

fdescribe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [IconComponent],
    });
    fixture = TestBed.createComponent(IconComponent)
  });

  fit ('should be created', () => {
    expect(fixture).toBeTruthy();
  });

  // fit ('should return a array not empty', () => {
  //   expect(component.paths).toBeDefined();
  // });
});

