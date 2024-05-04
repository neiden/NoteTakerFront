import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStudentDialogComponent } from './new-student-dialog.component';

describe('NewStudentDialogComponent', () => {
  let component: NewStudentDialogComponent;
  let fixture: ComponentFixture<NewStudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStudentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
