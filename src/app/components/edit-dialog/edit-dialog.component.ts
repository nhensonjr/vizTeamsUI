import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, PageEvent } from '@angular/material';
import { Picture } from '../../models/picture.model';
import { MemberService } from '../../services/member/member.service';
import { PhotoService } from '../../services/photo/photo.service';
import { Member } from 'src/app/models/member.model';
import { EditDialogData } from '../../interfaces/edit-dialog-data.interface';
import { Team } from '../../models/team.model';
import { TeamService } from '../../services/team/team.service';

@Component({
  selector: 'app-edit-dialog',
  template: `
      <div *ngIf="data.selectedMember">
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
                  <input matInput placeholder="First Name" formControlName="firstName" required>
                  <mat-error>First name required</mat-error>
              </mat-form-field>

              <mat-form-field>
                  <input matInput placeholder="Last Name" formControlName="lastName" required>
                  <mat-error>Last name required</mat-error>
              </mat-form-field>

              <mat-form-field>
                  <mat-select placeholder="Title" formControlName="title" required>
                      <mat-option value="Software Engineer">Software Engineer</mat-option>
                      <mat-option value="Quality Engineer">Quality Engineer</mat-option>
                  </mat-select>
                  <mat-error>Title name required</mat-error>
              </mat-form-field>
              <div class="buttons">
                  <button mat-button (click)="onCancel()">Cancel</button>
                  <button mat-button (click)="onMemberSubmit(memberForm)">Submit</button>
              </div>
          </form>
      </div>
      <div *ngIf="data.selectedTeam">
          <form class="example-container" [formGroup]="teamForm">
              <mat-form-field>
                  <input matInput placeholder="Team Name" formControlName="name" [value]="teamForm.get('name').value" required>
                  <mat-error>Team name required</mat-error>
              </mat-form-field>

              <mat-form-field>
                  <textarea matInput placeholder="Team Description" formControlName="description"
                            [value]="teamForm.get('description').value"></textarea>
              </mat-form-field>

              <div class="buttons">
                  <button mat-button (click)="onCancel()">Cancel</button>
                  <button mat-button (click)="onTeamSubmit(this.teamForm)">Submit</button>
              </div>
          </form>
      </div>
  `,
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  updatedMember: Member = this.data.selectedMember;
  updatedTeam: Team = this.data.selectedTeam;

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

  teamForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private teamService: TeamService,
    private memberService: MemberService,
    private photoService: PhotoService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData
  ) {
  }

  ngOnInit(): void {
    if (this.data.selectedMember) {
      this.memberForm.get('pathToPhoto').setValue(this.updatedMember.pathToPhoto);
      this.memberForm.get('firstName').setValue(this.updatedMember.firstName);
      this.memberForm.get('lastName').setValue(this.updatedMember.lastName);
      this.memberForm.get('title').setValue(this.updatedMember.title);

      this.photoService.getPhotos().subscribe((imageList: Picture[]) => {
        imageList.forEach((image: Picture) => {
          this.pictureURLs.push(new Picture(image.id));
        });
      });
    }
    if (this.data.selectedTeam) {
      this.teamForm.get('name').setValue(this.updatedTeam.name);
      this.teamForm.get('description').setValue(this.updatedTeam.description);
    }
  }

  onMemberSubmit(memberForm: FormGroup): void {
    if (this.memberFormHasErrors(memberForm)) {
      this.setMemberFormErrors(memberForm);
    } else {
      this.updatedMember.pathToPhoto = memberForm.get('pathToPhoto').value;
      this.updatedMember.firstName = memberForm.get('firstName').value;
      this.updatedMember.lastName = memberForm.get('lastName').value;
      this.updatedMember.title = memberForm.get('title').value;

      this.memberService.updateMember(this.updatedMember).subscribe();
      this.dialogRef.close();
    }
  }

  onTeamSubmit(teamForm: FormGroup) {
    if (teamForm.get('name').value.trim() === '') {
      this.teamForm.get('name').setValue('');
      this.teamForm.get('name').setErrors({incorrect: true});
    } else {
      this.updatedTeam.name = teamForm.get('name').value;
      this.updatedTeam.description = teamForm.get('description').value;

      this.teamService.updateTeam(this.updatedTeam).subscribe();
      this.dialogRef.close();
    }
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

  setMemberFormErrors(form: FormGroup): void {
    if (form.get('firstName').value.trim() === '') {
      form.get('firstName').setValue('');
      form.get('firstName').setErrors({incorrect: true});
    }
    if (form.get('lastName').value.trim() === '') {
      form.get('lastName').setValue('');
      form.get('lastName').setErrors({incorrect: true});
    }
    if (form.get('title').value === '') {
      form.get('title').setValue('');
      form.get('title').setErrors({incorrect: true});
    }
  }

  memberFormHasErrors(form: FormGroup): boolean {
    if (form.get('firstName').value.trim() === '') {
      return true;
    }
    if (form.get('lastName').value.trim() === '') {
      return true;
    }
    if (form.get('title').value === '') {
      return true;
    }
    return false;
  }
}


