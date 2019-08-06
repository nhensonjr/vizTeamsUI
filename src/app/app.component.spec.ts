import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { MaterialModule } from './material.module';
import { ContextBarComponent } from './components/context-bar/context-bar.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { Router } from '@angular/router';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router;

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
        AppComponent,
        SiteHeaderComponent,
        ContextBarComponent,
        TeamListComponent,
        TeamDetailComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display site-header', () => {
    const header = fixture.debugElement.queryAll(By.css('app-site-header'));

    expect(header.length).toEqual(1);
  });

  it('should display context-bar', () => {
    const header = fixture.debugElement.queryAll(By.css('app-context-bar'));

    expect(header.length).toEqual(1);
  });

  describe('Router Outlet ', () => {

    describe('team-list', () => {
      beforeEach(fakeAsync(() => {
        router.navigate(['/team-list']);
        tick();

        fixture.detectChanges();
      }));

      it('should display team-list', () => {
        const teamList = fixture.debugElement.queryAll(By.css('app-team-list'));
        expect(teamList.length).toEqual(1);
      });
    });

    describe('team', () => {
      beforeEach(fakeAsync(() => {
        router.navigate(['/team/1']);
        tick();

        fixture.detectChanges();
      }));

      it('should display team', () => {
        const teamList = fixture.debugElement.queryAll(By.css('app-team-detail'));
        expect(teamList.length).toEqual(1);
      });
    });

  });
});
