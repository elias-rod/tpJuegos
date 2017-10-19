import { Component, OnInit } from '@angular/core';
import { Ppot } from '../../clases/ppot';

@Component({
  selector: 'app-ppot',
  templateUrl: './ppot.component.html',
  styleUrls: ['./ppot.component.css']
})
export class PpotComponent implements OnInit {
  juego: Ppot;
  manos: Array<string>;
  pathImagenIA: string;
  mensajeResultado: object;
  mostrarMensajeResultado: boolean;
  minutero;
  index: number;

  constructor() {
    this.manos = ['./assets/piedra.png', './assets/papel.png', './assets/tijera.png'];
    this.index = 0;
    this.generarNuevo();
  }

  ngOnInit() {
    this.generarAnimacion('manoIA', 'wobble');
  }

  generarNuevo() {
    this.juego = new Ppot('Pedro');
    this.juego.generarSolucion();
    this.pathImagenIA = this.manos[this.juego.eleccionIA];
    this.mostrarMensajeResultado = false;
    this.iniciarDesafio();
  }

  iniciarDesafio(){
    this.minutero = setInterval(
      () => {
        this.index = Math.floor(Math.random() * 3);
        (<HTMLInputElement>document.getElementById('imagenJugador')).src = this.manos[this.index];
      }, 200
    );
  }

  generarAnimacion(elementoId, animacion){
    let elemento = document.getElementById(elementoId);
    let funcion = function() {
      elemento.removeEventListener('animationend', funcion)
      elemento.classList.remove('animated', animacion);
    }
    elemento.classList.add('animated', animacion);
    elemento.addEventListener('animationend', funcion);
  }

  accion(tipo){
    this.mostrarMensajeResultado = false;
    if (tipo === 'acerto' || tipo === 'erro' || tipo === 'empate') {
      this.juego.generarSolucion();
      this.pathImagenIA = this.manos[this.juego.eleccionIA];
      this.generarAnimacion('manoIA', 'wobble');
      this.iniciarDesafio();
    }
    else {
      this.generarNuevo();
      this.generarAnimacion('manoIA', 'wobble');
    }
  }

  verificar(respuesta) {
    clearInterval(this.minutero);
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
        subtitulo: 'Es que cometiste 3 errores de 5 intentos posibles',
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
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' más para ganar y si errás ' + this.juego.erroresRestantes + ' más, perdés',
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
        subtitulo: 'Debes ser más rápido',
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' más para ganar y si errás ' + this.juego.erroresRestantes + ' más, perdés',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
    else if (intento == 'empate') {
      this.mensajeResultado = {
        tipo: 'empate',
        bootstrapClass: 'alert-info',
        imagenPath: './assets/empate.png',
        titulo: 'Empate',
        subtitulo: 'Sigamos...',
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' más para ganar y si erras ' + this.juego.erroresRestantes + ' más, perdés',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
  }
}