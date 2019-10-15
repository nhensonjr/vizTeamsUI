import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MemberService } from '../../services/member.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Member } from '../../Models/member.model';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-add-dialog',
  template: `
          <form class="example-container" [formGroup]="memberForm">
              <div>
                  <span *ngFor="let url of photoUrls" ><img src="{{url}}" alt=""></span>
              </div>

              <mat-form-field>
                  <input matInput placeholder="First Name" formControlName="firstName">
              </mat-form-field>

              <mat-form-field>
                  <input matInput placeholder="Last Name" formControlName="lastName">
              </mat-form-field>

              <mat-form-field>
                  <mat-select placeholder="Title" formControlName="title">
                      <mat-option value="Software Engineer">Software Engineer</mat-option>
                      <mat-option value="Quality Engineer">Quality Engineer</mat-option>
                  </mat-select>
              </mat-form-field>

              <mat-form-field>
                  <mat-select placeholder="Team" formControlName="team">
                      <mat-option *ngFor="let team of data.allTeams" value="{{team.id}}">{{team.name}}</mat-option>
                  </mat-select>
              </mat-form-field>
              <div class="buttons">
                  <button mat-button (click)="onCancel()">Cancel</button>
                  <button mat-button (click)="onSubmit()">Submit</button>
              </div>
          </form>
  `,
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  newMember: Member = new Member();
  photoUrls: string[] = [];

  memberForm = new FormGroup({
    pathToPhoto: new FormControl('https://picsum.photos/200'),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    title: new FormControl(''),
    team: new FormControl('')
  });

  constructor(
    private memberService: MemberService,
    private photoService: PhotoService,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.memberForm.get('team').setValue(this.data.teamName);
  }

  onSubmit(): void {
    this.newMember.pathToPhoto = this.memberForm.get('pathToPhoto').value;
    this.newMember.firstName = this.memberForm.get('firstName').value;
    this.newMember.lastName = this.memberForm.get('lastName').value;
    this.newMember.title = this.memberForm.get('title').value;
    this.newMember.team = this.memberForm.get('team').value;

    console.log('new member log: ', this.newMember);
    this.memberService.createMember(this.newMember).subscribe();
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
