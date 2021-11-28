import { TestBed } from '@angular/core/testing';

import { ClientsFormGuard } from './clients-form.guard';

describe('ClientsFormGuard', () => {
  let guard: ClientsFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClientsFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
