import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SEARCH_COMPONENTS } from './index';
import { SEARCH_SERVICES } from './services/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ...SEARCH_COMPONENTS,

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
