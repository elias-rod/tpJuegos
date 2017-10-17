import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../servicios/juego.service';
import { Juego } from '../../clases/juego';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  listadoCompartible: Array<Juego>;
  servicioJuego: JuegoService;

  constructor(servicioJuego: JuegoService) {
    this.servicioJuego = servicioJuego;
  }

  ngOnInit() {
  }

  cargarListadoCompartido(){
    this.listadoCompartible = this.servicioJuego.listar();
  }

  cargarListadoCompartidoPromesa(){
    this.servicioJuego.listarPromesa()
    .then((listadoPrometido) => {
      this.listadoCompartible = listadoPrometido;
    });
  }
}
