import { TestBed } from '@angular/core/testing';

import { DataAverageUserService } from './data-average-user.service';

describe('DataAverageUserService', () => {
  let service: DataAverageUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAverageUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
