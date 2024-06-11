import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoalDialogComponent } from './create-goal-dialog.component';

describe('CreateGoalDialogComponent', () => {
  let component: CreateGoalDialogComponent;
  let fixture: ComponentFixture<CreateGoalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGoalDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGoalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
