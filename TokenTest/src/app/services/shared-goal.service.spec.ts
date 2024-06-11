import { TestBed } from '@angular/core/testing';

import { SharedGoalService } from './shared-goal.service';

describe('SharedGoalService', () => {
  let service: SharedGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
