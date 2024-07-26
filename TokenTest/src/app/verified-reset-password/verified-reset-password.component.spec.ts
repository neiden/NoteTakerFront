import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedResetPasswordComponent } from './verified-reset-password.component';

describe('VerifiedResetPasswordComponent', () => {
  let component: VerifiedResetPasswordComponent;
  let fixture: ComponentFixture<VerifiedResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedResetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
