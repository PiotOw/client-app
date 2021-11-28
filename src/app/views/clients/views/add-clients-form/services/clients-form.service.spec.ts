import { TestBed } from '@angular/core/testing';

import { ClientsFormService } from './clients-form.service';

describe('ClientsFormService', () => {
  let service: ClientsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
