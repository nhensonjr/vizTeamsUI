import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { ContextBarComponent } from './components/context-bar/context-bar.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { CombinedViewComponent } from './components/combined-view/combined-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { TeamService } from './services/team.service';

@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    ContextBarComponent,
    TeamListComponent,
    TeamDetailComponent,
    CombinedViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
