import { TestBed } from '@angular/core/testing';

import { WorkoutApi } from './workout-api';

describe('WorkoutApi', () => {
  let service: WorkoutApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
