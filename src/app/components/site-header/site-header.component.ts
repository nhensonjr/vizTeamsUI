import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DevDialogComponent } from '../dev-dialog/dev-dialog.component';

@Component({
  selector: 'app-site-header',
  template: `
    <mat-toolbar class="site-header__toolbar">
      <div class="site-header__app-name-container">
        <div class="site-header__logo-container" (click)="openDialog()">
          <img class="site-header__logo" src="../../../assets/vizient-logo-registered.svg" alt="Vizient">
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

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DevDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Closed dev-dialog.');
    });
  }

}
