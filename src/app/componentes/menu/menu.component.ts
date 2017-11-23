import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ActualizacionusuarioService } from '../../servicios/actualizacionusuario.service';
import { RutasService } from '../../servicios/rutas.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy{
  jugadorActual: any;
  muestraDetalle: boolean;
  muestraAutor: boolean;
  muestraDatosLogueo: boolean;
  subscripcion: Subscription;
  random: number;

  constructor(public actualizacionusuarioService: ActualizacionusuarioService, public RutasService: RutasService) {
    this.random = Math.random();
    if(!localStorage.getItem('usuarioActual')){
      this.muestraDatosLogueo = false;
    }
    else{
      this.muestraDatosLogueo = true;
      this.jugadorActual = JSON.parse(localStorage.getItem('usuarioActual'));
    }
    this.subscripcion = this.actualizacionusuarioService.obtenerObservable().subscribe(() => {
      if(!localStorage.getItem('usuarioActual')){
        this.muestraDatosLogueo = false;
      }
      else{
        this.muestraDatosLogueo = true;
        this.jugadorActual = JSON.parse(localStorage.getItem('usuarioActual'));
      }
    });
  }

  ngOnInit() {
  }

  desloguear(){
    this.muestraDatosLogueo = false;
    localStorage.clear();
  }

  ngOnDestroy() {
    //unsubscribe to ensure no memory leaks
    this.subscripcion.unsubscribe();
  }

  mostrarDetalle(){
    this.jugadorActual = JSON.parse(localStorage.getItem('usuarioActual'));
    this.muestraDetalle = true;
  }

  mostrarAutor(){
    this.muestraAutor = true;
  }
}
