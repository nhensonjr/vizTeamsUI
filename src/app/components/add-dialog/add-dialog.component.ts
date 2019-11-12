import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, PageEvent } from '@angular/material';
import { MemberService } from '../../services/member.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Member } from '../../Models/member.model';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-add-dialog',
  template: `
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
                      <mat-option *ngFor="let team of data.allTeams" value="{{team.id}}">{{team.name}}</mat-option>
                  </mat-select>
              </mat-form-field>
          </div>

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
  selectedPic: Picture;
  progressBar = 0;
  firstImage = 0;
  lastImage = 5;
  pictureURLs: Picture[] = [];

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
    this.photoService.getPhotos().subscribe((imageList: Picture[]) => {
      imageList.forEach((image, index) => {
        // TODO: Decide if we need loading bar
        this.progressBar = ((index + 1) / (imageList.length) * 100);
        this.pictureURLs.push(new Picture(image.id));
      });
    });
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

// TODO: Create real model file
export class Picture {
  id: number;
  url: string;

  constructor(id: number) {
    this.id = id;
    this.url = 'https://picsum.photos/id/' + id + '/200/200';
  }
}
