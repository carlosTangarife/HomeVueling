import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexHeaderComponent } from './components/index-header/index-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IndexHeaderComponent],
  entryComponents: [IndexHeaderComponent]
})
export class HeaderModule { }
