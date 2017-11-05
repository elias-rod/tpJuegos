import { Component, OnInit } from '@angular/core';

import { AgudezaVisual } from '../../clases/agudeza-visual';
import { HttpService } from '../../servicios/http.service';
import { ActualizacionusuarioService } from '../../servicios/actualizacionusuario.service';

declare var $: any;

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

  constructor(public httpService: HttpService, public actualizacionusuarioService: ActualizacionusuarioService) {
    this.juego = new AgudezaVisual();
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
    this.juego = new AgudezaVisual();
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
    $(document).ready(function() {
      $("#botonPrimario").focus();
    });
    this.juego.respuesta = respuesta;
    let intento = this.juego.verificar();
    this.mostrarMensajeResultado = true;
    this.claseDinamicaOpciones = 'solucion';
    if (intento === 'gano') {
      this.mensajeResultado = {
        tipo: 'gano',
        bootstrapClass: 'alert-success',
        imagenPath: './assets/gano.png',
        titulo: 'Muy bien!',
        subtitulo: 'Ganaste ' + this.juego.puntos + ' puntos',
        parrafo: 'Tu logro quedó registrado ¿Jugamos otra vez?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
      this.guardarJugada('gano');
    }
    else if (intento === 'perdio') {
      this.mensajeResultado = {
        tipo: 'perdio',
        bootstrapClass: 'alert-danger',
        imagenPath: './assets/perdio.png',
        titulo: 'Te quedaste sin vidas',
        subtitulo: 'La respuesta correcta era: ' + (this.juego.solucion + 1),
        parrafo: '¿Intentamos de nuevo?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
      this.guardarJugada('perdio');
    }
    else if (intento === 'acerto') {
      this.mensajeResultado = {
        tipo: 'acerto',
        bootstrapClass: 'alert-warning',
        imagenPath: './assets/acerto.png',
        titulo: 'Acertaste!',
        subtitulo: '',
        parrafo: 'Necesitás acertar ' + this.juego.aciertosRestantes + ' veces más para ganar. Te ' + (this.juego.vidas===1?'queda 1 vida':('quedan ' + this.juego.vidas + ' vidas')),
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
    else if (intento === 'erro') {
      this.mensajeResultado = {
        tipo: 'erro',
        bootstrapClass: 'alert-warning',
        imagenPath: './assets/erro.png',
        titulo: 'Erraste',
        subtitulo: 'La opción correcta era la ' + (this.juego.solucion + 1),
        parrafo: 'Necesitás acertar ' + this.juego.aciertosRestantes + ' veces más para ganar. Te ' + (this.juego.vidas===1?'queda 1 vida':('quedan ' + this.juego.vidas + ' vidas')),
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
  }

  guardarJugada(gano){
    let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    usuarioActual.puntos = usuarioActual.puntos + this.juego.puntos;
    usuarioActual.jugadas += 1;
    gano === 'gano'? usuarioActual.ganadas += 1 : usuarioActual.perdidas += 1;
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
    this.actualizacionusuarioService.actualizarObservable();
    this.httpService.crear(this.juego.rutaAPI, {
    "idUsuario": this.juego.usuarioActual.id,
    "idJuego": this.juego.id,
    "momento": Date.now(),
    "gano": gano === 'gano'? 1 : 0,
    "puntos": this.juego.puntos
    })
    .then(datos => {
//aca tengo que actualizar los puntos del observable para que actualize el menu puntos
    })
    .catch(error => {
      console.log(error);
    });
  }
}