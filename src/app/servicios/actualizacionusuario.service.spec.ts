import { TestBed, inject } from '@angular/core/testing';

import { ActualizacionusuarioService } from './actualizacionusuario.service';

describe('ActualizacionusuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActualizacionusuarioService]
    });
  });

  it('should be created', inject([ActualizacionusuarioService], (service: ActualizacionusuarioService) => {
    expect(service).toBeTruthy();
  }));
});
