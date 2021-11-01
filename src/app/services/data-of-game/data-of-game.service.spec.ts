import { TestBed } from '@angular/core/testing';

import { DataOfGameService } from './data-of-game.service';

describe('DataOfGameService', () => {
  let service: DataOfGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataOfGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
