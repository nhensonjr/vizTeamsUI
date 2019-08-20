import { Component, OnInit } from '@angular/core';
import { Team } from '../../Models/team.model';
import { Member } from '../../Models/member.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TeamService } from '../../services/team.service';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-combined-view',
  template: `
      <mat-card class="left-card">
          <mat-card-header>
              <mat-card-title>Teams</mat-card-title>
          </mat-card-header>
          <mat-card-content>
              <mat-accordion cdkDropListGroup multi="true">
                  <mat-expansion-panel *ngFor="let team of teams" class="team-container"
                                       (click)="selectedTeam = team; clearSelectedMember()">
                      <mat-expansion-panel-header>
                          <mat-panel-title>
                              {{team.name}}
                          </mat-panel-title>
                      </mat-expansion-panel-header>
                      <div cdkDropList [cdkDropListData]="team.members" (cdkDropListDropped)="drop($event, team.id)">
                          <img cdkDrag class="member-photo" *ngFor="let member of team.members" src="{{member.pathToPhoto}}"
                               alt="{{member.firstName}} {{member.lastName}}">
                          <img class="member-photo" src="assets/empty.png" alt="">
                      </div>
                  </mat-expansion-panel>
              </mat-accordion>
          </mat-card-content>
      </mat-card>
      <mat-card class="right-card">
          <mat-card-header>
              <mat-card-title>
                  <span (click)="clearSelectedMember()">{{selectedTeam?.name}}</span>
                  <span *ngIf="selectedMember.id"> > {{selectedMember?.firstName}} {{selectedMember.lastName}}</span>
              </mat-card-title>
          </mat-card-header>
          <mat-card-content>
              <div class="member-list" *ngIf="!selectedMember.id; else memberSelected">
                  <mat-card *ngFor="let member of selectedTeam.members" class="member-container" (click)="selectedMember = member">
                      <div class="member-photo">
                          <img class="member-photo" src="{{member.pathToPhoto}}" alt="">
                      </div>
                      <div class="member-info">
                          <div>{{member.firstName}} {{member.lastName}}</div>
                          <div>{{member.title}}</div>
                      </div>
                  </mat-card>
              </div>
              <ng-template #memberSelected style="height: 100%;">
                  <div class="selectedMember-container">
                      <div class="member-photo">
                          <img class="selectedMember-photo" src="{{selectedMember.pathToPhoto}}" alt="">
                      </div>
                      <div class="selectedMember-info">
                          <div>{{selectedMember.firstName}} {{selectedMember.lastName}}</div>
                          <div>{{selectedMember.title}}</div>
                      </div>
                  </div>
              </ng-template>
          </mat-card-content>
      </mat-card>
  `,
  styleUrls: ['./combined-view.component.scss']
})
export class CombinedViewComponent implements OnInit {
  selectedTeam: Team = new Team();
  selectedMember: Member = new Member();

  teams: Team[] = [];

  constructor(private teamService: TeamService, private memberService: MemberService) {
  }

  ngOnInit() {
    this.teamService.getAll().subscribe(teams => {
      console.log('LOG: ', teams);
      this.teams = teams;
    });
  }

  clearSelectedMember() {
    this.selectedMember = new Member();
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
}
