import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StationSelectorComponent } from './station-selector.component';
import { DestinationsService } from '../../services/destinations.service';

describe('StationSelectorComponent', () => {
  let component: StationSelectorComponent;
  let fixture: ComponentFixture<StationSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [StationSelectorComponent],
      providers: [DestinationsService]
    });
    fixture = TestBed.createComponent(StationSelectorComponent);
  });

  beforeEach(inject([DestinationsService], (service: DestinationsService) => {
    component = new StationSelectorComponent(service);
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
