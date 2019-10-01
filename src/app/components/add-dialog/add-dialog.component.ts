import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-dialog',
  template: `
      <div class="example-container">
          <mat-form-field>
              <input matInput placeholder="First Name">
          </mat-form-field>

          <mat-form-field>
              <input matInput placeholder="Last Name">
          </mat-form-field>

          <mat-form-field>
              <input matInput placeholder="Last Name">
          </mat-form-field>

          <mat-form-field>
              <mat-select placeholder="Select">
                  <mat-option value="option">Option</mat-option>
              </mat-select>
          </mat-form-field>
      </div>
  `,
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
