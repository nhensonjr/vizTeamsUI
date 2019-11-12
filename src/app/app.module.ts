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
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamListComponent } from './components/team-list/team-list.component';
import { InfoViewComponent } from './components/info-view/info-view.component';
import { TeamService } from './services/team/team.service';
import { MemberService } from './services/member/member.service';
import { StateService } from './services/state/state.service';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    AddDialogComponent,
    EditDialogComponent,
    TeamListComponent,
    InfoViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    DragDropModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    TeamService,
    MemberService,
    StateService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent
  ]
})
export class AppModule { }
