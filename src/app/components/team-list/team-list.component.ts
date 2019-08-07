import { Component, OnInit } from '@angular/core';
import { Team } from '../../Models/team.model';

@Component({
  selector: 'app-team-list',
  template: `
      <mat-card *ngFor="let team of teams" class="team-list__team-container">
          <mat-card-header>
              <mat-card-title class="team-list__team-name" routerLink="/team/{{team.id}}">
                  {{team.name}}
              </mat-card-title>
          </mat-card-header>
          <mat-card-content class="team-list__content-container">
              <div class="team-list__member-container" *ngFor="let member of team.members">
                  <div class="team-list__photo-container">
                      <img src="{{member.photoUrl}}" alt="" class="team-list__member-photo">
                  </div>
                  <div class="team-list__info-container">
                      <div class="team-list__member-name">
                          {{member.firstName}} {{member.lastName}}
                      </div>
                      <div class="team-list__member-title">
                          {{member.title}}
                      </div>
                  </div>
              </div>
          </mat-card-content>
      </mat-card>
  `,
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [
    {
      id: 1,
      name: 'Shake & Bake',
      description: 'The best team',
      members: [
        {id: 1, firstName: 'Ricky', lastName: 'Bobby', title: 'El Diablo', photoUrl: '/assets/avatar.png'},
        {id: 2, firstName: 'Cal', lastName: 'Naughton Jr', title: 'Magic Man', photoUrl: '/assets/avatar.png'},
        {id: 3, firstName: 'Brennan', lastName: 'Huff', title: 'Night Hawk', photoUrl: '/assets/avatar.png'},
        {id: 4, firstName: 'Dale', lastName: 'Doback', title: 'Dragon', photoUrl: '/assets/avatar.png'},
      ]
    },
    {
      id: 2,
      name: 'Prestige Worldwide',
      description: 'The rest team',
      members: [
        {id: 1, firstName: 'Ricky', lastName: 'Bobby', title: 'El Diablo', photoUrl: '/assets/avatar.png'},
        {id: 2, firstName: 'Cal', lastName: 'Naughton Jr', title: 'Magic Man', photoUrl: '/assets/avatar.png'},
        {id: 3, firstName: 'Brennan', lastName: 'Huff', title: 'Night Hawk', photoUrl: '/assets/avatar.png'},
        {id: 4, firstName: 'Dale', lastName: 'Doback', title: 'Dragon', photoUrl: '/assets/avatar.png'},
      ]
    },
    {
      id: 1,
      name: 'Shake & Bake',
      description: 'The best team',
      members: [
        {id: 1, firstName: 'Ricky', lastName: 'Bobby', title: 'El Diablo', photoUrl: '/assets/avatar.png'},
        {id: 2, firstName: 'Cal', lastName: 'Naughton Jr', title: 'Magic Man', photoUrl: '/assets/avatar.png'},
        {id: 3, firstName: 'Brennan', lastName: 'Huff', title: 'Night Hawk', photoUrl: '/assets/avatar.png'},
        {id: 4, firstName: 'Dale', lastName: 'Doback', title: 'Dragon', photoUrl: '/assets/avatar.png'},
      ]
    },
    {
      id: 2,
      name: 'Prestige Worldwide',
      description: 'The rest team',
      members: [
        {id: 1, firstName: 'Ricky', lastName: 'Bobby', title: 'El Diablo', photoUrl: '/assets/avatar.png'},
        {id: 2, firstName: 'Cal', lastName: 'Naughton Jr', title: 'Magic Man', photoUrl: '/assets/avatar.png'},
        {id: 3, firstName: 'Brennan', lastName: 'Huff', title: 'Night Hawk', photoUrl: '/assets/avatar.png'},
        {id: 4, firstName: 'Dale', lastName: 'Doback', title: 'Dragon', photoUrl: '/assets/avatar.png'},
      ]
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
