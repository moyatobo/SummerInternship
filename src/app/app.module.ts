import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AgencyComponent } from './agency/agency.component';
import { Services } from './services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AgencyComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpModule

  ],
  providers: [Services],
  bootstrap: [AppComponent]
})
export class AppModule { }
