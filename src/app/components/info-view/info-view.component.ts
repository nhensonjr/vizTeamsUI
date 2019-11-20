import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team.model';
import { Member } from '../../models/member.model';
import { MatDialog } from '@angular/material';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { StateService } from '../../services/state/state.service';
import { MemberHistory } from 'src/app/models/member-history.model';
import { HistoryService } from '../../services/history/history.service';
import { TeamService } from '../../services/team/team.service';
import { MemberService } from '../../services/member/member.service';

@Component({
  selector: 'app-info-view',
  template: `
      <mat-card class="info-view__container">
          <div class="info-view__team-selected" style="height: 100%" *ngIf="teamSelected(); else noSelections">
              <mat-card-header class="info-view__card-header">
                  <mat-card-title class="info-view__section-header">
                      <span (click)="clearBreadCrumb()">{{selectedTeam?.name}}</span>
                      <span *ngIf="showMemberView">
                              > {{selectedMember.firstName}} {{selectedMember.lastName}}
                      </span>
                  </mat-card-title>
              </mat-card-header>
              <mat-card-content class="info-view__card-content">
                  <div class="info-view__team-view-container" *ngIf="showTeamView">
                      <div class="info-view__team-view-member-container"
                           *ngFor="let member of selectedTeam.members"
                           (click)="setSelectedMember(member)">
                          <div class="info-view__team-view-photo-container">
                              <img class="info-view__photo" src="{{member.pathToPhoto}}"
                                   alt="{{member.firstName}} {{member.lastName}}">
                          </div>
                          <div class="info-view__team-view-info-container">
                              <div>{{member.firstName}} {{member.lastName}}</div>
                              <div>{{member.title}}</div>
                          </div>
                      </div>
                  </div>
                  <div class="info-view__member-view-container" *ngIf="showMemberView">
                      <div class="info-view__member-view-member-container">
                          <div class="info-view__member-view-photo-container">
                              <img class="info-view__photo" src="{{selectedMember.pathToPhoto}}"
                                   alt="{{selectedMember.firstName}} {{selectedMember.lastName}}">
                          </div>
                          <div class="info-view__member-view-info-container">
                              <div>{{selectedMember.firstName}} {{selectedMember.lastName}}</div>
                              <div>{{selectedMember.title}}</div>
                              <div>{{createEmailAddress(selectedMember)}}@vizientinc.com</div>
                          </div>
                      </div>
                      <table mat-table [dataSource]="memberHistory" class="info-view__member-history">
                          <ng-container matColumnDef="teamId">
                              <th mat-header-cell *matHeaderCellDef> Team Name</th>
                              <td mat-cell *matCellDef="let entry"> {{entry.teamName}} </td>
                          </ng-container>

                          <ng-container matColumnDef="startedOnTeam">
                              <th mat-header-cell *matHeaderCellDef> Start Date</th>
                              <td mat-cell *matCellDef="let entry"> {{entry.startedOnTeam}} </td>
                          </ng-container>

                          <ng-container matColumnDef="leftTeam">
                              <th mat-header-cell *matHeaderCellDef> End Date</th>
                              <td mat-cell *matCellDef="let entry"> {{entry.leftTeam}} </td>
                          </ng-container>

                          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                      </table>
                  </div>
              </mat-card-content>
              <mat-card-actions class="info-view__card-actions">
                  <div *ngIf="showTeamView">
                      <span class="info-view__action-buttons"
                            matTooltipPosition="above"
                            matTooltip="{{selectedTeam.name}} History">
                          <mat-icon class="info-view__icon">history</mat-icon>
                      </span>
                      <span class="info-view__action-buttons"
                            matTooltipPosition="above"
                            matTooltip="Edit {{selectedTeam.name}}"
                            (click)="openEditTeamDialog(selectedTeam)">
                          <mat-icon class="info-view__icon">edit</mat-icon>
                      </span>
                      <span class="info-view__action-buttons"
                            matTooltipPosition="above"
                            matTooltip="Archive {{selectedTeam.name}}"
                            (click)="deleteTeam(selectedTeam)">
                          <mat-icon class="info-view__icon">archive</mat-icon>
                      </span>
                  </div>
                  <div *ngIf="showMemberView">
                      <span class="info-view__action-buttons"
                            matTooltipPosition="above"
                            matTooltip="Edit {{selectedMember.firstName}}"
                            (click)="openEditMemberDialog(selectedMember)">
                          <mat-icon class="info-view__icon">edit</mat-icon>
                      </span>
                      <span class="info-view__action-buttons"
                            matTooltipPosition="above"
                            matTooltip="Archive {{selectedMember.firstName}}"
                            (click)="deleteMember(selectedMember, selectedTeam)">
                          <mat-icon class="info-view__icon">archive</mat-icon>
                      </span>
                  </div>
              </mat-card-actions>
          </div>
          <ng-template #noSelections>
              <div class="info-view__no-selections">
                  Select a team to view members.
              </div>
          </ng-template>
      </mat-card>
  `,
  styleUrls: ['./info-view.component.scss']
})
export class InfoViewComponent implements OnInit {

  selectedTeam: Team;
  selectedMember: Member;
  member: Member;
  displayedColumns: string[] = ['teamId', 'startedOnTeam', 'leftTeam'];
  memberHistory: MemberHistory[];

  constructor(
    private memberService: MemberService,
    private teamService: TeamService,
    private stateService: StateService,
    public dialog: MatDialog,
    private historyService: HistoryService
  ) {
  }

  get showTeamView(): boolean {
    return this.selectedTeam !== undefined && this.selectedMember === undefined;
  }

  get showMemberView(): boolean {
    return this.selectedTeam !== undefined && this.selectedMember !== undefined;
  }

  ngOnInit() {
    this.stateService.selectedTeam.subscribe(team => {
      this.selectedTeam = team;
    });
    this.stateService.selectedMember.subscribe(member => {
      this.selectedMember = member;
      if (member !== null && member !== undefined) {
        this.historyService.getMemberHistory(member.id).subscribe(history => {
          this.memberHistory = history;
        });
      }
    });
  }

  teamSelected(): boolean {
    return this.selectedTeam !== undefined;
  }

  clearBreadCrumb(): void {
    this.stateService.selectedMember.next(undefined);
  }

  setSelectedMember(member: Member): void {
    this.stateService.selectedMember.next(member);
  }

  createEmailAddress(member: Member): string {
    const firstName = member.firstName.split('');
    return (firstName[0] + member.lastName).toLowerCase();
  }

  openEditMemberDialog(member: Member): void {
    this.dialog.open(EditDialogComponent, {
      data: {
        selectedMember: member,
        selectedTeam: null
      }
    });
  }

  openEditTeamDialog(team: Team): void {
    this.dialog.open(EditDialogComponent, {
      data: {
        selectedMember: null,
        selectedTeam: team
      }
    });
  }

  deleteTeam(team: Team): void {
    if (confirm('Are you sure you want to archive ' + team.name + '?')) {
      console.log('deleted the team');
      this.stateService.selectedTeam.next(undefined);
      this.teamService.deleteTeam(team).subscribe(response => {
        console.log('response: ', response);
        this.stateService.updateState();
      });
    }
  }

  deleteMember(member: Member, team: Team): void {
    if (confirm('Are you sure you want to archive ' + member.firstName + ' ' + member.lastName + '?')) {
      this.stateService.selectedMember.next(undefined);
      team.members = team.members.filter(m => m.id !== member.id);
      this.stateService.selectedTeam.next(team);
      this.memberService.deleteMember(member).subscribe(response => {
        console.log('response: ', response);
        this.stateService.updateState();
      });
    }
  }
}
