import { TestBed } from '@angular/core/testing';

import { NgxMatLoadingService } from './ngx-mat-loading.service';

describe('NgxMatLoadingService', () => {
  let service: NgxMatLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMatLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
