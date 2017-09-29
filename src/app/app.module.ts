import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { NgModule, Inject, ApplicationRef } from '@angular/core';
import { PersistenceModule } from 'angular-persistence';
import { CookieModule } from 'ngx-cookie';
import { SearchModule } from './search/search.module';
import { IndexSearchComponent } from './search/components/index-search/index-search.component';
import { HeaderModule } from './header/header.module';
import { IndexHeaderComponent} from './header/components/index-header/index-header.component';
import { FooterModule } from './footer/footer.module';
import { IndexFooterComponent } from './footer/components/index-footer/index-footer.component';

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    SearchModule,
    HeaderModule,
    FooterModule,
    PersistenceModule,
    CookieModule.forRoot(),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  declarations: []
})

export class AppModule {
  private browser_document;
  ngDoBootstrap(appRef: ApplicationRef ) {
    if (this.browser_document.getElementsByTagName('app-index-header').length > 0) { appRef.bootstrap(IndexHeaderComponent); }
    if (this.browser_document.getElementsByTagName('app-index-footer').length > 0) { appRef.bootstrap(IndexFooterComponent); }
    if (this.browser_document.getElementsByTagName('app-index-search').length > 0) { appRef.bootstrap(IndexSearchComponent); }
  }
  constructor(@Inject(DOCUMENT) private document: any) {
    this.browser_document = document;
  }
}
