import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextBarComponent } from './context-bar.component';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../../material.module';

describe('ContextBarComponent', () => {
  let component: ContextBarComponent;
  let fixture: ComponentFixture<ContextBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ContextBarComponent]
    })
      .compileComponents();
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

  it('should display current page title', () => {
    const currentPage = fixture.debugElement.query(By.css('.context-bar__current-page')).nativeElement;

    expect(currentPage.textContent.trim()).toEqual('Root');
  });

  it('should display context buttons', () => {
    const contextButton = fixture.debugElement.query(By.css('.context-bar__button')).nativeElement;

    expect(contextButton.textContent.trim()).toEqual('Button');
  });
});
