import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  constructor(public http: Http) { }
  
  leer(ruta, id){
    return this.http.get(ruta + '?id=' + id)
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  leerTodosOrdenado(ruta, criterio, sentido){
    return this.http.get(ruta + 'leerTodos/' + criterio + '/' + sentido)
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  leerTodosFiltrado(ruta, criterio){
    return this.http.get(ruta + 'leerTodos/' + criterio)
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  crear(ruta, cuerpo: any){
    return this.http.post(ruta, cuerpo)
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  actualizar(ruta, cuerpo: any){
    return this.http.post(ruta + 'actualizar', cuerpo)
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  manejarError(error: Response | any){
    console.log(error);
  }

  extraerDato(respuesta: Response){
    return respuesta.json() || {};
  }
}