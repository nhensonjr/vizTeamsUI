import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { MemberService } from './services/member/member.service';
import { StateService } from './services/state/state.service';
import { MaterialModule } from './material.module';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { TeamService } from './services/team/team.service';
import { AppComponent } from './app.component';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfoViewComponent } from './components/info-view/info-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DevDialogComponent } from './components/dev-dialog/dev-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    AddDialogComponent,
    EditDialogComponent,
    TeamListComponent,
    InfoViewComponent,
    DevDialogComponent,
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
    EditDialogComponent,
    DevDialogComponent
  ]
})
export class AppModule { }
