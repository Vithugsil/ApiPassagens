import { TestBed } from '@angular/core/testing';

import { CompanhiasAereasService } from './companhias-aereas.service';

describe('CompanhiasAereasService', () => {
  let service: CompanhiasAereasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanhiasAereasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
