import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SEARCH_COMPONENTS } from './index';
import { NUM_RECENT_SEARCHES_PROV } from '../shared/consts/injections';
import { SHARED_SERVICES, APP_INITIALIZER_PROV } from '../shared/consts/services';
import { FocusDirective } from './focus.directive';
import { DictionaryPipe } from '../shared/pipes/dictionary.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
    ...SEARCH_COMPONENTS,
    FocusDirective,
    DictionaryPipe
  ],
  exports: [
    // ...SEARCH_COMPONENTS
  ],
  providers: [
    APP_INITIALIZER_PROV,
    ...SHARED_SERVICES,
    NUM_RECENT_SEARCHES_PROV
  ],
  entryComponents: [SEARCH_COMPONENTS]
})
export class SearchModule { }
