import { Component, Inject, OnInit } from '@angular/core';
import { Member } from '../../Models/member.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, PageEvent } from '@angular/material';
import { Picture } from '../../models/picture.model';
import { MemberService } from '../../services/member/member.service';
import { PhotoService } from '../../services/photo/photo.service';

@Component({
  selector: 'app-edit-dialog',
  template: `
    <form class="example-container" [formGroup]="memberForm">
      <div class="edit-dialog__image-list">
              <span class="edit-dialog__image-container" *ngFor="let pic of pictureURLs.slice(firstImage, lastImage)">
                  <img [ngClass]="pic === selectedPic ? 'edit-dialog__selected-image' : 'edit-dialog__image'"
                       (click)="setSelectedPic(pic)" src="{{pic.url}}" alt="">
              </span>
      </div>
      <mat-paginator #matPaginator
                     [length]="pictureURLs.length"
                     [pageSize]="5"
                     (page)="setPagedPhotos($event, matPaginator)">
      </mat-paginator>

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
      <div class="buttons">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-button (click)="onSubmit()">Submit</button>
      </div>
    </form>
  `,
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  updatedMember: Member = this.data.existingMember;

  selectedPic: Picture;
  firstImage = 0;
  lastImage = 5;
  pictureURLs: Picture[] = [];

  memberForm = new FormGroup({
    pathToPhoto: new FormControl('https://picsum.photos/200'),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    title: new FormControl('')
  });

  constructor(
    private memberService: MemberService,
    private photoService: PhotoService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.memberForm.get('pathToPhoto').setValue(this.updatedMember.pathToPhoto);
    this.memberForm.get('firstName').setValue(this.updatedMember.firstName);
    this.memberForm.get('lastName').setValue(this.updatedMember.lastName);
    this.memberForm.get('title').setValue(this.updatedMember.title);

    this.photoService.getPhotos().subscribe((imageList: Picture[]) => {
      imageList.forEach((image, index) => {
        this.pictureURLs.push(new Picture(image.id));
      });
    });
  }

  onSubmit(): void {
    this.updatedMember.pathToPhoto = this.memberForm.get('pathToPhoto').value;
    this.updatedMember.firstName = this.memberForm.get('firstName').value;
    this.updatedMember.lastName = this.memberForm.get('lastName').value;
    this.updatedMember.title = this.memberForm.get('title').value;

    console.log('new member log: ', this.updatedMember);
    this.memberService.updateMember(this.updatedMember).subscribe();
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


