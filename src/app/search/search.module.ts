import { CheckInErrorComponent } from './errors/check-in-error/check-in-error.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SEARCH_COMPONENTS } from './index';
import { SHARED_SERVICES, APP_INITIALIZER_PROV } from '../shared/consts/services';
import { DictionaryPipe } from '../shared/pipes/dictionary.pipe';

import { NoSpaces } from "./components/check-in/validations.directive";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
    ...SEARCH_COMPONENTS,
    DictionaryPipe,
    NoSpaces,
    CheckInErrorComponent, 
  ],
  exports: [
    // ...SEARCH_COMPONENTS
  ],
  providers: [
    APP_INITIALIZER_PROV,
    ...SHARED_SERVICES
  ],
  entryComponents: [SEARCH_COMPONENTS]
})
export class SearchModule { }
