import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team.model';
import { MatDialog, MatExpansionPanel } from '@angular/material';
import { Member } from '../../models/member.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { StateService } from '../../services/state/state.service';
import { TeamService } from '../../services/team/team.service';
import { MemberService } from '../../services/member/member.service';

@Component({
  selector: 'app-team-list',
  template: `
    <mat-card class="team-list__container">
      <div class="team-list__card-container">
        <mat-card-header style="border-bottom: solid 1px lightgray">
          <mat-card-title class="team-list__section-header">
            Teams
          </mat-card-title>
        </mat-card-header>
        <mat-card-content class="team-list__card-content">
          <mat-progress-bar *ngIf="isLoading" mode="indeterminate"></mat-progress-bar>
          <mat-accordion *ngIf="!isLoading && teams.length > 0" cdkDropListGroup multi="true">
            <mat-expansion-panel *ngFor="let team of teams" #panel (click)="setSelectedTeam(team)"
                                 (mouseenter)="onMouseEnter(panel)"
                                 (mouseleave)="onMouseLeave(panel, previousPanel)">
              <mat-expansion-panel-header>
                <mat-panel-title class="team-list__team-header">
                  {{team.name}}
                </mat-panel-title>
              </mat-expansion-panel-header>
              <div class="team-list__member-list-container"
                   cdkDropList
                   cdkDropListOrientation="horizontal"
                   [cdkDropListData]="team.members"
                   (cdkDropListDropped)="drop($event, team.id)">
                <div *ngIf="team.members.length === 0 && !isDragging"
                     class="team-list__no-members-prompt">
                  <span>No members on this team.</span>
                </div>
                <img class="team-list__member-list-photo" cdkDrag *ngFor="let member of team.members"
                     (cdkDragStarted)="isDragging = true; previousPanel = panel"
                     (cdkDragEnded)="isDragging = false"
                     src="{{member.pathToPhoto}}"
                     alt="{{member.firstName}} {{member.lastName}}"
                     [matTooltipDisabled]="isDragging"
                     matTooltipPosition="above"
                     matTooltip="{{member.firstName}} {{member.lastName}}">
              </div>
              <mat-action-row class="team-list__acton-row">
                              <span *ngIf="showErrorPrompt(team.id, teamsWithErrors)" class="team-list__error-prompt">
                                  Team size limited to 12 members
                              </span>
                <span class="team-list__member-counter">{{team.members.length}}/12</span>
                <span (click)="openAddMemberDialog(team)"
                      class="team-list__add-member"
                      matTooltipPosition="above"
                      matTooltip="Add Member">
                                  <mat-icon class="team-list__icon">person_add</mat-icon>
                              </span>
              </mat-action-row>
            </mat-expansion-panel>
          </mat-accordion>
          <div *ngIf="!isLoading && teams.length === 0" class="team-list__add-team-prompt">
            <div>Get Started!</div>
            <div>Add a team to start using VizTeams.</div>
          </div>
        </mat-card-content>
        <mat-card-actions class="team-list__card-actions">
                  <span class="team-list__action-buttons"
                        matTooltipPosition="above"
                        matTooltip="Restore From Archive">
                      <mat-icon class="team-list__icon">settings_backup_restore</mat-icon>
                  </span>
          <span (click)="openAddTeamDialog()"
                class="team-list__action-buttons"
                matTooltipPosition="above"
                matTooltip="Add Team">
                      <mat-icon class="team-list__icon">add_box</mat-icon>
                  </span>
        </mat-card-actions>
      </div>
    </mat-card>
  `,
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];
  teamsWithErrors: number[] = [];

  isLoading = true;
  isDragging = false;
  previousPanel: MatExpansionPanel;
  selectedTeam: Team;
  selectedMember: Member;
  hoveredPanel: MatExpansionPanel;

  constructor(
    private stateService: StateService,
    private teamService: TeamService,
    private memberService: MemberService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.stateService.allTeams.subscribe(teams => {
      if (teams !== null && teams !== undefined) {
        this.teams = teams;
      }
      this.isLoading = false;
    });
    this.stateService.selectedTeam.subscribe(team => this.selectedTeam = team);
    this.stateService.selectedMember.subscribe(member => this.selectedMember = member);
  }

  setSelectedTeam(team: Team): void {
    this.stateService.selectedTeam.next(team);
    this.stateService.selectedMember.next(undefined);
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

  drop(event: CdkDragDrop<Member[]>, teamId: number) {
    const memberToUpdate = event.previousContainer.data[event.previousIndex];

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data.length < 12) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        this.teamsWithErrors.push(teamId);
        setTimeout(() => {
          this.clearErrorPrompt();
        }, 3000);
      }
    }

    memberToUpdate.team = teamId;
    this.memberService.updateMember(memberToUpdate).subscribe();
  }

  showErrorPrompt(teamId: number, teamsWithErrors: number[]): boolean {
    return teamsWithErrors.includes(teamId);
  }

  clearErrorPrompt(): void {
    this.teamsWithErrors = [];
  }

  openAddMemberDialog(team: Team): void {
    if (team.members.length >= 12) {
      this.teamsWithErrors.push(team.id);
      setTimeout(() => {
        this.clearErrorPrompt();
      }, 3000);
    } else {
      const dialogRef = this.dialog.open(AddDialogComponent, {
        data: {team, allTeams: this.teams.filter(t => t !== team)}
      });

      dialogRef.afterClosed().subscribe(newMember => {
        if (newMember) {
          this.selectedTeam.members.push(newMember);
        }
      });
    }
  }

  openAddTeamDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.stateService.refresh();
    });
  }
}
