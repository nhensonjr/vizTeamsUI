import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <app-site-header></app-site-header>
      <app-context-bar></app-context-bar>
      <div class="app-root__router-container">
          <router-outlet></router-outlet>
      </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
