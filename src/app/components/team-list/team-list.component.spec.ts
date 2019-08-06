import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListComponent } from './team-list.component';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../../material.module';
import { AppRoutingModule } from '../../app-routing.module';
import { TeamDetailComponent } from '../team-detail/team-detail.component';

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeamListComponent,
        TeamDetailComponent
      ],
      imports: [
        MaterialModule,
        AppRoutingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Teams exist', () => {
    beforeEach(() => {
      component.teams = [
        {
          id: 1,
          name: 'Shake & Bake',
          description: 'The best team',
          members: [
            {id: 1, firstName: 'Ricky', lastName: 'Bobby', title: 'El Diablo', photoUrl: 'pathToPhoto'},
            {id: 2, firstName: 'Cal', lastName: 'Naughton Jr', title: 'Magic Man', photoUrl: 'path2Photo'},
          ]
        },
        {
          id: 2,
          name: 'Prestige Worldwide',
          description: 'The rest team',
          members: []
        },
      ];
      fixture.detectChanges();
    });

    it('should bind the routerLink on the team name', () => {
      const routerLink = fixture.debugElement.query(By.css('.team-list__team-name')).nativeElement.getAttribute('ng-reflect-router-link');

      expect(routerLink).toEqual('/team/1');
    });

    it('should display team-name per team ', () => {
      const teamNames = fixture.debugElement.queryAll(By.css('.team-list__team-name'));

      expect(teamNames.length).toEqual(2);
      expect(teamNames[0].nativeElement.textContent.trim()).toEqual('Shake & Bake');
      expect(teamNames[1].nativeElement.textContent.trim()).toEqual('Prestige Worldwide');
    });

    it('should display member-photo per team member', () => {
      const memberPhotos = fixture.debugElement.queryAll(By.css('.team-list__member-photo'));

      expect(memberPhotos.length).toEqual(2);
      expect(memberPhotos[0].nativeElement.src).toContain('pathToPhoto');
      expect(memberPhotos[1].nativeElement.src).toContain('path2Photo');
    });

    it('should display member-name per team member', () => {
      const memberNames = fixture.debugElement.queryAll(By.css('.team-list__member-name'));

      expect(memberNames.length).toEqual(2);
      expect(memberNames[0].nativeElement.textContent.trim()).toEqual('Ricky Bobby');
      expect(memberNames[1].nativeElement.textContent.trim()).toEqual('Cal Naughton Jr');
    });

    it('should display member-title per team member', () => {
      const memberTitles = fixture.debugElement.queryAll(By.css('.team-list__member-title'));

      expect(memberTitles.length).toEqual(2);
      expect(memberTitles[0].nativeElement.textContent.trim()).toEqual('El Diablo');
      expect(memberTitles[1].nativeElement.textContent.trim()).toEqual('Magic Man');
    });
  });
});
