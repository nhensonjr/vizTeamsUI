import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, PageEvent } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Member } from '../../models/member.model';
import { AddMemberDialogData } from '../../interfaces/add-member-dialog-data.interface';
import { Team } from '../../models/team.model';
import { MemberService } from '../../services/member/member.service';
import { PhotoService } from '../../services/photo/photo.service';
import { Picture } from '../../models/picture.model';
import { TeamService } from '../../services/team/team.service';

@Component({
  selector: 'app-add-dialog',
  template: `
      <div *ngIf="data.team; else teamDialog">
          <form class="example-container" [formGroup]="memberForm">
              <div class="add-dialog__image-list">
              <span class="add-dialog__image-container" *ngFor="let pic of pictureURLs.slice(firstImage, lastImage)">
                  <img [ngClass]="pic === selectedPic ? 'add-dialog__selected-image' : 'add-dialog__image'"
                       (click)="setSelectedPic(pic)" src="{{pic.url}}" alt="">
              </span>
              </div>
              <mat-paginator #matPaginator
                             [length]="pictureURLs.length"
                             [pageSize]="5"
                             (page)="setPagedPhotos($event, matPaginator)">
              </mat-paginator>

              <div class="add-dialog__info-container">
                  <mat-form-field>
                      <input matInput placeholder="First Name" formControlName="firstName">
                  </mat-form-field>

                  <mat-form-field>
                      <input matInput placeholder="Last Name" formControlName="lastName">
                  </mat-form-field>
              </div>

              <div class="add-dialog__info-container">
                  <mat-form-field>
                      <mat-select placeholder="Title" formControlName="title">
                          <mat-option value="Software Engineer">Software Engineer</mat-option>
                          <mat-option value="Quality Engineer">Quality Engineer</mat-option>
                      </mat-select>
                  </mat-form-field>

                  <mat-form-field>
                      <mat-select placeholder="Team" formControlName="team">
                          <mat-option [value]="this.data.team.id">{{data.team.name}}</mat-option>
                          <mat-option *ngFor="let team of data.allTeams" value="{{team.id}}">{{team.name}}</mat-option>
                      </mat-select>
                  </mat-form-field>
              </div>

              <div class="buttons">
                  <button mat-button (click)="onCancel()">Cancel</button>
                  <button mat-button (click)="onMemberSubmit(this.memberForm)">Submit</button>
              </div>
          </form>
      </div>
      <ng-template #teamDialog>
          <form class="example-container" [formGroup]="teamForm">
              <mat-form-field>
                  <input matInput placeholder="Team Name" formControlName="name">
              </mat-form-field>

              <mat-form-field>
                  <textarea matInput placeholder="Team Description" formControlName="description"></textarea>
              </mat-form-field>

              <div class="buttons">
                  <button mat-button (click)="onCancel()">Cancel</button>
                  <button mat-button (click)="onTeamSubmit(this.teamForm)">Submit</button>
              </div>
          </form>
      </ng-template>
  `,
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  selectedPic: Picture;
  firstImage = 0;
  lastImage = 5;
  pictureURLs: Picture[] = [];

  teamForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  memberForm = new FormGroup({
    pathToPhoto: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    title: new FormControl(''),
    team: new FormControl('')
  });

  constructor(
    private memberService: MemberService,
    private teamService: TeamService,
    private photoService: PhotoService,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddMemberDialogData
  ) {
  }

  ngOnInit(): void {
    if (this.data.team) {
      this.memberForm.get('team').setValue(this.data.team.id);
    }
    this.photoService.getPhotos().subscribe((imageList: Picture[]) => {
      imageList.forEach((image, index) => {
        this.pictureURLs.push(new Picture(image.id));
      });
    });
  }

  onMemberSubmit(form: FormGroup): void {
    const newMember = new Member(
      form.get('team').value,
      form.get('firstName').value,
      form.get('lastName').value,
      form.get('title').value,
      form.get('pathToPhoto').value
    );

    this.memberService.createMember(newMember).subscribe();
    this.dialogRef.close();
  }

  onTeamSubmit(form: FormGroup): void {
    const newTeam = new Team(
      form.get('name').value,
      form.get('description').value
    );

    this.teamService.createTeam(newTeam).subscribe();
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  setPagedPhotos(event: PageEvent, matPaginator: MatPaginator) {
    const pageIndex = matPaginator.pageIndex * matPaginator.pageSize;
    this.firstImage = pageIndex;
    this.lastImage = 5 + pageIndex;
  }

  setSelectedPic(pic: Picture) {
    this.selectedPic = pic;
    this.memberForm.get('pathToPhoto').setValue(pic.url);
  }
}
