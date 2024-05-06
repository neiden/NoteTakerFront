import { TestBed } from '@angular/core/testing';

import { JwtAuthenticatorService } from './jwt-authenticator.service';

describe('JwtAuthenticatorService', () => {
  let service: JwtAuthenticatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtAuthenticatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
