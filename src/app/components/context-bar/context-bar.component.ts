import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-context-bar',
  template: `
      <mat-toolbar class="context-bar__toolbar">
          <div class="context-bar__current-page">
              {{currentPage}}
          </div>
          <div class="context-bar__options">
              <button class="context-bar__button" mat-flat-button>Button</button>
          </div>
      </mat-toolbar>
  `,
  styleUrls: ['./context-bar.component.scss']
})
export class ContextBarComponent implements OnInit {

  currentPage: string;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.url !== undefined) {
        this.currentPage = this.setPageName(event.url);
      }
    });
  }

  setPageName(url: string): string {
    let result = '';
    if (url.includes('/team-list')) {
      result = 'Team List View';
    }
    if (url.includes('/team/')) {
      result = 'Team View';
    }
    return result;
  }

}
