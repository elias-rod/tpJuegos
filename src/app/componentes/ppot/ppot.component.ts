import { Component, OnInit } from '@angular/core';
import { Ppot } from '../../clases/ppot';

@Component({
  selector: 'app-ppot',
  templateUrl: './ppot.component.html',
  styleUrls: ['./ppot.component.css']
})
export class PpotComponent implements OnInit {

  juego: Ppot;
  imagenIA: string;
  mensajeResultado: object;
  mostrarMensajeResultado: boolean;

  constructor() {
    this.generarNuevo();
  }

  ngOnInit() {
  }

  generarNuevo() {
    this.juego = new Ppot('Pedro');
    this.juego.generarSolucion();
    this.mostrarMensajeResultado = false;
  }

  generarAnimacion(elementoId, animacion){
    let elemento = document.getElementById(elementoId);
    let funcion = function() {
      elemento.removeEventListener('animationend', funcion)
      elemento.classList.remove(animacion);
    }
    elemento.classList.add(animacion);
    elemento.addEventListener('animationend', funcion);
  }

  accion(tipo){
    this.mostrarMensajeResultado = false;
    if (tipo === 'acerto' || tipo === 'erro') {
      this.juego.generarSolucion();
      this.generarAnimacion('opcion1', 'bounceIn');
      this.generarAnimacion('opcion2', 'bounceIn');
      this.generarAnimacion('opcion3', 'bounceIn');
      this.generarAnimacion('solucion', 'flip');
    }
    else {
      this.generarNuevo();
      this.generarAnimacion('opcion1', 'bounceInLeft');
      this.generarAnimacion('opcion2', 'bounceInDown');
      this.generarAnimacion('opcion3', 'bounceInRight');
      this.generarAnimacion('solucion', 'bounceInUp');
    }
  }

  verificar(respuesta) {
    this.juego.respuesta = respuesta;
    let intento = this.juego.verificar();
    this.mostrarMensajeResultado = true;
    if (this.juego.gano) {
      this.mensajeResultado = {
        tipo: 'gano',
        bootstrapClass: 'alert-success',
        imagenPath: './assets/gano.png',
        titulo: 'Ganaste!',
        subtitulo: 'Felicitaciones hiciste 3 aciertos en ' + (6 - (this.juego.aciertosRestantes + this.juego.erroresRestantes)) + ' intentos',
        parrafo: 'Tu logro quedó registrado ¿Jugamos otra vez?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
    }
    else if (this.juego.erroresRestantes == 0) {
      this.mensajeResultado = {
        tipo: 'perdio',
        bootstrapClass: 'alert-danger',
        imagenPath: './assets/perdio.png',
        titulo: 'Perdiste!',
        subtitulo: 'Es que cometiste 3 errores de 5 intentos posibles. La respuesta correcta era: ' + (this.juego.solucion + 1),
        parrafo: '¿Qué tal si intentas una nueva partida?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
    }
    else if (intento == 'acerto') {
      this.mensajeResultado = {
        tipo: 'acerto',
        bootstrapClass: 'alert-warning',
        imagenPath: './assets/acerto.png',
        titulo: 'Acertaste!',
        subtitulo: 'Muy bien...',
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' más y como máximo podes errar ' + this.juego.erroresRestantes + ' más',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
    else if (intento == 'erro') {
      this.mensajeResultado = {
        tipo: 'erro',
        bootstrapClass: 'alert-warning',
        imagenPath: './assets/erro.png',
        titulo: 'Erraste!',
        subtitulo: 'La opción correcta era la ' + (this.juego.solucion + 1),
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' más y como máximo podes errar ' + this.juego.erroresRestantes + ' más',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
  }
}
