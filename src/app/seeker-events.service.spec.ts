import { TestBed } from '@angular/core/testing';

import { SeekerEventsService } from './seeker-events.service';

describe('SeekerEventsService', () => {
  let service: SeekerEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeekerEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
