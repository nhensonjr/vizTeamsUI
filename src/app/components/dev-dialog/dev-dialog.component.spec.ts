import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevDialogComponent } from './dev-dialog.component';

describe('DevDialogComponent', () => {
  let component: DevDialogComponent;
  let fixture: ComponentFixture<DevDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DevDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
