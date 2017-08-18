import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { NgModule, Inject, ApplicationRef } from '@angular/core';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule
  ],
  providers: [

  ]
})
export class AppModule {
  private browser_document;
  ngDoBootstrap(appRef: ApplicationRef ) {
    if (this.browser_document.getElementsByTagName('app-index-search').length > 0) { appRef.bootstrap(IndexSearchComponent); }
    if (this.browser_document.getElementsByTagName('app-index-header').length > 0) { appRef.bootstrap(IndexHeaderComponent); }
  }
  constructor(@Inject(DOCUMENT) private document: any) {
    this.browser_document = document;
  }
}
