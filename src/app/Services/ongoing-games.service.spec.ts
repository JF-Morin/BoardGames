import { TestBed } from '@angular/core/testing';

import { OngoingGamesService } from './ongoing-games.service';

describe('OngoingGamesService', () => {
  let service: OngoingGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OngoingGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
