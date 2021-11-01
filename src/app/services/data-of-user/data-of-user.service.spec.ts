import { TestBed } from '@angular/core/testing';

import { DataOfUserService } from './data-of-user.service';

describe('DataOfUserService', () => {
  let service: DataOfUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataOfUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
