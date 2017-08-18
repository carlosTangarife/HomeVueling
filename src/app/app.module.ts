import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { NgModule, Inject, ApplicationRef } from '@angular/core';
import { SearchModule } from './search/search.module';
import { SearchComponent } from './search/components/index-search/search.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    SearchModule
  ],
  providers: [

  ]
})
export class AppModule {
  private browser_document;
  ngDoBootstrap(appRef: ApplicationRef ) {
    if (this.browser_document.getElementsByTagName('app-search').length > 0) { appRef.bootstrap(SearchComponent); }
  }
  constructor(@Inject(DOCUMENT) private document: any) {
    this.browser_document = document;
  }
}
