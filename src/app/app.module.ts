import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { TeamService } from './services/team.service';

@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    DragDropModule,
    HttpClientModule,
  ],
  providers: [TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
