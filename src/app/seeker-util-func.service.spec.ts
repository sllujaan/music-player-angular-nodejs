import { TestBed } from '@angular/core/testing';

import { SeekerUtilFuncService } from './seeker-util-func.service';

describe('SeekerUtilFuncService', () => {
  let service: SeekerUtilFuncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeekerUtilFuncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
