import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HttpService } from '../../servicios/http.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() jugador: any;
  @Output() detalleCerro = new EventEmitter();
  jugadas: Array<any>;
  random: number;
  pathFotosServer: string = 'https://tp2017utn.000webhostapp.com/fotos/';
  rutaAPI: string = "https://tp2017utn.000webhostapp.com/index.php/consultaJugadas/";

  constructor(public httpService: HttpService) { }

  ngOnInit() {
    this.leer();
  }

  leer(){
    this.httpService.leerTodosFiltrado(this.rutaAPI, this.jugador.id)
    .then(datos => {
      let momento = new Date();
      for (var index = 0; index < datos.length; index++) {
        momento.setTime(datos[index].momento);
        datos[index].momento = momento.toLocaleDateString() + " " + momento.toLocaleTimeString();
      }
      this.jugadas = datos;
      this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  }
}