import { CheckInErrorComponent } from './errors/check-in-error/check-in-error.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SEARCH_COMPONENTS } from './index';
import { SHARED_SERVICES, APP_INITIALIZER_PROV } from '../shared/consts/services';
import { DictionaryPipe } from '../shared/pipes/dictionary.pipe';

<<<<<<< HEAD
import { NoSpaces } from "./components/check-in/validations.directive";


=======
>>>>>>> 4af18a966d8d9a29627ae8661e507f4125d33f1a
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
