import { Component, OnInit } from '@angular/core';
import { Team } from './Models/team.model';
import { Member } from './Models/member.model';
import { TeamService } from './services/team.service';
import { MemberService } from './services/member.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MOCKTEAMS } from '../assets/mock-teams';
import { MatExpansionPanel } from '@angular/material';

@Component({
  selector: 'app-root',
  template: `
      <app-site-header></app-site-header>
      <div class="app-root__container">
          <mat-card class="team-list__container">
              <mat-card-header style="border-bottom: solid 1px lightgray">
                  <mat-card-title class="team-list__section-header">
                      Teams
                  </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                  <mat-accordion cdkDropListGroup multi="true">
                      <mat-expansion-panel *ngFor="let team of teams" #panel (click)="setSelectedTeam(team)"
                                           (mouseenter)="onMouseEnter(panel)"
                                           (mouseleave)="onMouseLeave(panel, previousPanel)">
                          <mat-expansion-panel-header>
                              <mat-panel-title class="team-list__team-header">
                                  {{team.name}}
                              </mat-panel-title>
                          </mat-expansion-panel-header>
                          <div class="team-list__member-list-container"
                               cdkDropList [cdkDropListData]="team.members"
                               (cdkDropListDropped)="drop($event, team.id)">
                              <img class="team-list__member-list-photo" src="../assets/empty.png" alt="">
                              <img class="team-list__member-list-photo" cdkDrag *ngFor="let member of team.members"
                                   (cdkDragStarted)="isDragging = true; previousPanel = panel"
                                   (cdkDragEnded)="isDragging = false"
                                   src="{{member.pathToPhoto}}"
                                   alt="{{member.firstName}} {{member.lastName}}"
                                   [matTooltipDisabled]="isDragging"
                                   matTooltipPosition="above"
                                   matTooltip="{{member.firstName}} {{member.lastName}}">
                          </div>
                      </mat-expansion-panel>
                  </mat-accordion>
              </mat-card-content>
          </mat-card>
          <mat-card class="info-view__container">
              <div style="height: 100%" *ngIf="teamSelected(); else noSelections">
                  <mat-card-header>
                      <mat-card-title class="info-view__section-header">
                          <span (click)="clearSelectedMember()">{{selectedTeam?.name}}</span>
                          <span *ngIf="showMemberView">
                              > {{selectedMember.firstName}} {{selectedMember.lastName}}
                          </span>
                      </mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                      <div class="info-view__member-list-container" *ngIf="showTeamView">
                          <div class="info-view__member-container"
                               *ngFor="let member of selectedTeam.members"
                               (click)="setSelectedMember(member)">
                              <div class="info-view__photo-container">
                                  <img class="info-view__photo" src="{{member.pathToPhoto}}"
                                       alt="{{member.firstName}} {{member.lastName}}">
                              </div>
                              <div class="info-view__info-container">
                                  <div>{{member.firstName}} {{member.lastName}}</div>
                                  <div>{{member.title}}</div>
                              </div>
                          </div>
                      </div>
                      <!--// TODO: Actually build member info page and remove inline styles-->
                      <div style="display: flex; justify-content: center; align-items: center" *ngIf="showMemberView">
                          <div style="margin-top: 20vh; color: rgba(69, 90, 100, .87); font-size: x-large">
                              Member info/edit page goes here.
                          </div>
                      </div>
                  </mat-card-content>
              </div>
              <ng-template #noSelections>
                  <div class="info-view__no-selections">
                      Select a team to view members.
                  </div>
              </ng-template>
          </mat-card>
      </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  teams: Team[] = MOCKTEAMS;
  selectedTeam: Team;
  selectedMember: Member;
  isDragging = false;
  previousPanel: MatExpansionPanel;
  hoveredPanel: MatExpansionPanel;

  constructor(private teamService: TeamService, private memberService: MemberService) {
  }

  ngOnInit() {
    this.teamService.getAll().subscribe(teams => {
      this.teams = teams;
    });
  }

  setSelectedTeam(team: Team): void {
    this.selectedTeam = team;
    this.clearSelectedMember();
  }

  setSelectedMember(member: Member): void {
    this.selectedMember = member;
  }

  drop(event: CdkDragDrop<Member[]>, teamId: number) {
    const memberToUpdate = event.previousContainer.data[event.previousIndex];

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    memberToUpdate.team = teamId;
    this.memberService.updateMember(memberToUpdate).subscribe();
  }

  teamSelected(): boolean {
    return this.selectedTeam !== undefined;
  }

  get showTeamView(): boolean {
    return this.selectedTeam !== undefined && this.selectedMember === undefined;
  }

  get showMemberView(): boolean {
    return this.selectedTeam !== undefined && this.selectedMember !== undefined;
  }

  clearSelectedMember() {
    this.selectedMember = undefined;
  }

  onMouseEnter(panel: MatExpansionPanel) {
    const waitTime = 750;
    this.hoveredPanel = panel;
    if (this.isDragging) {
      setTimeout(() => {
        this.hoveredPanel.open();
      }, waitTime);
    }
  }

  onMouseLeave(targetPanel: MatExpansionPanel, previousPanel: MatExpansionPanel) {
    if (this.isDragging && targetPanel !== previousPanel) {
      targetPanel.close();
    }
  }
}
