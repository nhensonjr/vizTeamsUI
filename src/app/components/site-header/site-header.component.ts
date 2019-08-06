import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-header',
  template: `
      <mat-toolbar class="site-header__toolbar">
          <div class="site-header__app-name-container" routerLink="/team-list">
              <div class="site-header__logo-container">
                  <img class="site-header__logo" src="/assets/vizient-logo-registered.svg" alt="Vizient">
              </div>
              <div class="site-header__app-name">
                  VizTeams
              </div>
          </div>
          <div class="site-header__user-name">
              UserName
          </div>
      </mat-toolbar>
  `,
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
