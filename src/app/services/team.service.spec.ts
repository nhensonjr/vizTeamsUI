import { TestBed } from '@angular/core/testing';

import { TeamService } from './team.service';

describe('TeamServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamService = TestBed.get(TeamService);
    expect(service).toBeTruthy();
  });
});
