import { TestBed } from '@angular/core/testing';

import { PhotoService } from './photo.service';

describe('PhotoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoService = TestBed.get(PhotoService);
    expect(service).toBeTruthy();
  });
});
