import { Component, OnInit } from '@angular/core';
import {StateService} from './services/state/state.service';
import {TeamService} from './services/team/team.service';

@Component({
  selector: 'app-root',
  template: `
      <app-site-header></app-site-header>
      <div class="app-root__container">
          <app-team-list class="team-list__container"></app-team-list>
          <app-info-view class="info-view__container"></app-info-view>
      </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private stateService: StateService  ) {  }

  ngOnInit() {
    this. stateService.updateState();
  }
}
