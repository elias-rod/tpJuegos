import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../servicios/http.service';
import { SpinnerComponent } from '../spinner/spinner.component';

import { RutasService } from '../../servicios/rutas.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  jugadores: Array<any>;
  random: number;
  jugador: object;

  constructor(public HttpService: HttpService, public RutasService: RutasService) {
    this.leerTodos();
  }

  ngOnInit() {
  }

  leerTodos(){
    this.HttpService.leerTodosOrdenado(this.RutasService.rutaAPI + "consultaUsuarios/", 'resumenjugadas.puntos', 'DESC')
    .then(datos => {
      this.jugadores = datos;
      this.random = Math.random();
    })
    .catch(error => {
      console.log(error);
    });
  }

  mostrarDetalle(jugador){
    this.jugador = jugador;
  }
}