import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  constructor(public http: Http, public opcionesPost: RequestOptions) {
    //this.opcionesPost = new RequestOptions({ headers: new Headers({ "token":  "chubaca"})});
    let headers = new Headers();
    headers.append('token', localStorage.getItem('token'));
    this.opcionesPost = new RequestOptions({ headers: headers });
  }

  leer(ruta, id){
    return this.http.get(ruta + id, new RequestOptions({ headers: new Headers({ "token": JSON.parse(localStorage.getItem('token'))})}))
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  leerTodos(ruta){
    return this.http.get(ruta + 'leerTodos', new RequestOptions({ headers: new Headers({ "token": JSON.parse(localStorage.getItem('token'))})}))
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  leerTodosOrdenado(ruta, criterio, sentido){
    return this.http.get(ruta + 'leerTodos/' + criterio + '/' + sentido, new RequestOptions({ headers: new Headers({ "token": JSON.parse(localStorage.getItem('token'))})}))
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  leerTodosFiltrado(ruta, criterio){
    return this.http.get(ruta + 'leerTodos/' + criterio, new RequestOptions({ headers: new Headers({ "token": JSON.parse(localStorage.getItem('token'))})}))
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  crear(ruta, cuerpo){
    return this.http.post(ruta, cuerpo, new RequestOptions({ headers: new Headers({ "token": JSON.parse(localStorage.getItem('token'))})}))
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  login(ruta, email, password){
    return this.http.post(ruta, JSON.stringify({"email" : email, "password" : password}))
    .toPromise()
    .then(data => {
      return [data.json(), data.headers.get('token')];
    })
    .catch(this.manejarError);
  }

  manejarError(error: Response | any){
    console.log(error);
  }

  extraerDato(respuesta){
    let respuestaJson = respuesta.json() || {};
    if(respuestaJson.error){
      alert(respuestaJson.error);
      return respuestaJson.error;
    }
    else{
      return respuestaJson;
    }
  }
}