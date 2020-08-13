import { TestBed } from '@angular/core/testing';

import { SeekerControlsService } from './seeker-controls.service';

describe('SeekerControlsService', () => {
  let service: SeekerControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeekerControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
