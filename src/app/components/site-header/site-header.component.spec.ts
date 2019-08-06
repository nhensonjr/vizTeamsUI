import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteHeaderComponent } from './site-header.component';
import { MaterialModule } from '../../material.module';
import { By } from '@angular/platform-browser';

describe('SiteHeaderComponent', () => {
  let component: SiteHeaderComponent;
  let fixture: ComponentFixture<SiteHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [
        SiteHeaderComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display mat-toolbar', () => {
    const header = fixture.debugElement.query(By.css('mat-toolbar')).nativeElement;

    expect(header).toBeTruthy();
  });

  it('should display vizient logo', () => {
    const logo = fixture.debugElement.query(By.css('img')).nativeElement;

    expect(logo.src).toContain('vizient-logo-registered.svg');
  });

  it('should show VizTeams title', () => {
    const name = fixture.debugElement.query(By.css('.site-header__app-name')).nativeElement;

    expect(name.textContent.trim()).toEqual('VizTeams');
  });
});
