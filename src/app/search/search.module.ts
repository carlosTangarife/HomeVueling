import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SEARCH_COMPONENTS } from './index';
import { StationSelectorComponent } from './components/station-selector/station-selector.component';
import { SEARCH_SERVICES } from './services/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...SEARCH_COMPONENTS,
    StationSelectorComponent
  ],
  exports: [
    // ...SEARCH_COMPONENTS
  ],
  providers: [
    SEARCH_SERVICES
  ],
  entryComponents: [SEARCH_COMPONENTS]
})
export class SearchModule { }
