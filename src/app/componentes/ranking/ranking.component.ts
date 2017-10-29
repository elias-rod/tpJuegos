import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../servicios/http.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  jugadores: Array<any>;
  pathFotosServer: string = 'https://tp2017utn.000webhostapp.com/fotos/';
  rutaAPI: string = "https://tp2017utn.000webhostapp.com/index.php/consultaUsuarios/";
  random: number;
  jugador: object;

  constructor(public HttpService: HttpService) {
    this.leerTodos();
  }

  ngOnInit() {
  }

  leerTodos(){
    this.HttpService.leerTodosOrdenado(this.rutaAPI, 'resumenjugadas.puntos', 'DESC')
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
