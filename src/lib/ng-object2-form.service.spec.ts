import { TestBed } from '@angular/core/testing';

import { NgObject2FormService } from './ng-object2-form.service';

describe('NgObject2FormService', () => {
  let service: NgObject2FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgObject2FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
