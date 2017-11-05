import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ActualizacionusuarioService {
  private sujeto = new Subject<any>();
  
  actualizarObservable() {
    this.sujeto.next();
  }

  obtenerObservable(): Observable<any> {
    return this.sujeto.asObservable();
  }
}
