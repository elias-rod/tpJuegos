import { TestBed, inject } from '@angular/core/testing';

import { JuegoService } from './juego.service';

describe('JuegoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JuegoService]
    });
  });

  it('should be created', inject([JuegoService], (service: JuegoService) => {
    expect(service).toBeTruthy();
  }));
});
