import { TestBed } from '@angular/core/testing';

import { SuperAdminAuthGuard } from './super-admin-auth.guard';

describe('SuperAdminAuthGuard', () => {
  let guard: SuperAdminAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SuperAdminAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
