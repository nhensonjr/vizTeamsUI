import { Component, OnInit } from '@angular/core';
import { Team } from '../../Models/team.model';
import { Member } from '../../Models/member.model';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-info-view',
  template: `
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
  `,
  styleUrls: ['./info-view.component.scss']
})
export class InfoViewComponent implements OnInit {

  selectedTeam: Team;
  selectedMember: Member;

  constructor(private stateService: StateService) {
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
    });
  }

  teamSelected(): boolean {
    return this.stateService.selectedTeam !== undefined;
  }

  clearSelectedMember(): void {
    this.stateService.selectedMember.next(undefined);
  }

  setSelectedMember(member: Member): void {
    this.stateService.selectedMember.next(member);
  }
}
