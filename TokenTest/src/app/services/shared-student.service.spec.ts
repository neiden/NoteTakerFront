import { TestBed } from '@angular/core/testing';

import { SharedStudentService } from './shared-student.service';

describe('SharedStudentService', () => {
  let service: SharedStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
