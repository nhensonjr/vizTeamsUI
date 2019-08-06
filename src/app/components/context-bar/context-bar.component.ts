import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-context-bar',
  template: `
      <mat-toolbar class="context-bar__toolbar">
          <div class="context-bar__current-page">
              Root
          </div>
          <div class="context-bar__options">
              <button class="context-bar__button" mat-flat-button>Button</button>
          </div>
      </mat-toolbar>
  `,
  styleUrls: ['./context-bar.component.scss']
})
export class ContextBarComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
