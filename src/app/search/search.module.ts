import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SEARCH_COMPONENTS } from './index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...SEARCH_COMPONENTS
  ],
  exports: [
    ...SEARCH_COMPONENTS
  ],
  providers: [

  ],
  entryComponents: [SEARCH_COMPONENTS]
})
export class SearchModule { }
