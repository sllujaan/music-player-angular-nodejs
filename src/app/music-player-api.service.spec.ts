import { TestBed } from '@angular/core/testing';

import { MusicPlayerApiService } from './music-player-api.service';

describe('MusicPlayerApiService', () => {
  let service: MusicPlayerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicPlayerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
