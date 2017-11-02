import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  constructor(public http: Http, public opcionesPost: RequestOptions) {
    opcionesPost = new RequestOptions({ headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" })});
  }
  
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

  crear(ruta, cuerpo){
    return this.http.post(ruta, JSON.stringify(cuerpo), this.opcionesPost)
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  actualizar(ruta, cuerpo){
    return this.http.post(ruta + 'actualizar', JSON.stringify(cuerpo), this.opcionesPost)
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  login(ruta, email, password){
    return this.http.post(ruta, JSON.stringify({"email" : email, "password" : password}), this.opcionesPost)
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