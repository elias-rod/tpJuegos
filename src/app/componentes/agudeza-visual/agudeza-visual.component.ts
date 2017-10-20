import { Component, OnInit } from '@angular/core';
import { AgudezaVisual } from '../../clases/agudeza-visual';

@Component({
  selector: 'app-agudeza-visual',
  templateUrl: './agudeza-visual.component.html',
  styleUrls: ['./agudeza-visual.component.css']
})
export class AgudezaVisualComponent implements OnInit {

  juego: AgudezaVisual;
  claseDinamicaOpciones: string;
  mensajeResultado: object;
  mostrarMensajeResultado: boolean;

  constructor() {
    this.juego = new AgudezaVisual('Elias');
    this.juego.generarSolucion();
  }

  ngOnInit() {
    this.generarAnimacion('opcion1', 'bounceInLeft');
    this.generarAnimacion('opcion2', 'bounceInDown');
    this.generarAnimacion('opcion3', 'bounceInRight');
    this.generarAnimacion('solucion', 'bounceInUp');
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

  generarNuevo() {
    this.juego = new AgudezaVisual('Pedro');
    this.juego.generarSolucion();
    this.mostrarMensajeResultado = false;
  }

  accion(tipo){
    this.mostrarMensajeResultado = false;
    this.claseDinamicaOpciones = 'opcion';
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
    this.claseDinamicaOpciones = 'solucion';
    if (this.juego.gano) {
      this.mensajeResultado = {
        tipo: 'gano',
        bootstrapClass: 'alert-success',
        imagenPath: './assets/gano.png',
        titulo: 'Ganaste!',
        subtitulo: 'Hiciste 3 aciertos en ' + (6 - (this.juego.aciertosRestantes + this.juego.erroresRestantes)) + ' intento/s',
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
        subtitulo: 'La respuesta correcta era: ' + (this.juego.solucion + 1),
        parrafo: '¿Intentamos de nuevo?',
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
        subtitulo: '',
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' más para ganar. Si errás ' + this.juego.erroresRestantes + ' más, perdés',
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
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' más para ganar. Si errás ' + this.juego.erroresRestantes + ' más, perdés',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
  }
}