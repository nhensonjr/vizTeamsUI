import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ContextBarComponent } from './context-bar.component';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamListComponent } from '../team-list/team-list.component';
import { TeamDetailComponent } from '../team-detail/team-detail.component';

describe('ContextBarComponent', () => {
  let component: ContextBarComponent;
  let fixture: ComponentFixture<ContextBarComponent>;
  let router: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: '', redirectTo: 'team-list', pathMatch: 'full'},
          {path: 'team-list', component: TeamListComponent},
          {path: 'team/:id', component: TeamDetailComponent}
        ]),
        MaterialModule
      ],
      declarations: [
        ContextBarComponent,
        TeamListComponent,
        TeamDetailComponent
      ]
    })
      .compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display context-toolbar', () => {
    const toolbar = fixture.debugElement.queryAll(By.css('mat-toolbar'));

    expect(toolbar.length).toEqual(1);
  });

  describe('Page title', () => {

    it('should display "Team List View" when on team-list page', fakeAsync(() => {
      router.navigate(['/team-list']);
      tick();

      fixture.detectChanges();

      const teamList = fixture.debugElement.query(By.css('.context-bar__current-page')).nativeElement;
      expect(teamList.textContent.trim()).toEqual('Team List View');
    }));

    it('should display "Team View" when on team page', fakeAsync(() => {
      router.navigate(['/team/1']);
      tick();

      fixture.detectChanges();

      const teamList = fixture.debugElement.query(By.css('.context-bar__current-page')).nativeElement;
      expect(teamList.textContent.trim()).toEqual('Team View');
    }));
  });

  it('should display context buttons', () => {
    const contextButton = fixture.debugElement.query(By.css('.context-bar__button')).nativeElement;

    expect(contextButton.textContent.trim()).toEqual('Button');
  });
});
