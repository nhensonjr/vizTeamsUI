import { Component, OnInit } from '@angular/core';
import { Team } from '../../Models/team.model';

@Component({
  selector: 'app-combined-view',
  template: `
    <mat-card class="left-card">LEFT CARD</mat-card>
    <mat-card class="right-card">RIGHT CARD</mat-card>
  `,
  styleUrls: ['./combined-view.component.scss']
})
export class CombinedViewComponent implements OnInit {

  teams: Team[] = [
    {
      id: 1,
      name: 'Prestige Worldwide',
      description: 'Best Friends',
      members: [
        {id: 1, firstName: 'Brennan', lastName: 'Huff', title: 'Software Engineer', photoUrl: '/assets/avatar.png'},
        {id: 2, firstName: 'Dale', lastName: 'Doback', title: 'Software Engineer', photoUrl: '/assets/avatar.png'},
      ]
    },
    {
      id: 2,
      name: 'Shake & Bake',
      description: 'Best Friends',
      members: [
        {id: 3, firstName: 'Ricky', lastName: 'Bobby', title: 'Software Engineer', photoUrl: '/assets/avatar.png'},
        {id: 4, firstName: 'Cal', lastName: 'Naughton Jr', title: 'Software Engineer', photoUrl: '/assets/avatar.png'},
      ]
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
