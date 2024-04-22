import { TestBed } from '@angular/core/testing';

import { LoadingindicatorService } from './loadingindicator.service';

describe('LoadingindicatorService', () => {
  let service: LoadingindicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingindicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
