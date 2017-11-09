import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ppot } from '../../clases/ppot';
import { HttpService } from '../../servicios/http.service';
import { ActualizacionusuarioService } from '../../servicios/actualizacionusuario.service';
import { RutasService } from '../../servicios/rutas.service';

@Component({
  selector: 'app-ppot',
  templateUrl: './ppot.component.html',
  styleUrls: ['./ppot.component.css']
})
export class PpotComponent implements OnInit, OnDestroy {
  juego: Ppot;
  manos: Array<string>;
  pathImagenIA: string;
  mensajeResultado: object;
  mostrarMensajeResultado: boolean;
  minutero;
  index: number;
  spinner: boolean;

  constructor(
  public httpService: HttpService,
  public actualizacionusuarioService: ActualizacionusuarioService,
  public RutasService: RutasService) {
    this.manos = [
      this.RutasService.rutaImagenesSitio + 'piedra.png',
      this.RutasService.rutaImagenesSitio + 'papel.png',
      this.RutasService.rutaImagenesSitio + 'tijera.png'];
    this.index = 0;
    this.generarNuevo();
  }

  ngOnInit() {
    this.generarAnimacion('manoIA', 'wobble');
  }

  ngOnDestroy(){
    if(this.minutero){
      clearInterval(this.minutero);
    }
  }

  generarNuevo() {
    this.juego = new Ppot();
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
    if (intento === 'gano') {
      this.mensajeResultado = {
        tipo: 'gano',
        bootstrapClass: 'alert-success',
        imagenPath: this.RutasService.rutaImagenesSitio + 'gano.png',
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
        imagenPath: this.RutasService.rutaImagenesSitio + 'perdio.png',
        titulo: 'Te quedaste sin vidas',
        subtitulo: 'No todo está perdido...',
        parrafo: '¿Qué tal si intentas una nueva partida?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
      this.guardarJugada('perdio');
    }
    else if (intento == 'acerto') {
      this.mensajeResultado = {
        tipo: 'acerto',
        bootstrapClass: 'alert-warning',
        imagenPath: this.RutasService.rutaImagenesSitio + 'acerto.png',
        titulo: 'Acertaste!',
        subtitulo: '',
        parrafo: 'Necesitás acertar ' + this.juego.aciertosRestantes + ' veces más para ganar. Te ' + (this.juego.vidas===1?'queda 1 vida':('quedan ' + this.juego.vidas + ' vidas')),
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
    else if (intento == 'erro') {
      this.mensajeResultado = {
        tipo: 'erro',
        bootstrapClass: 'alert-warning',
        imagenPath: this.RutasService.rutaImagenesSitio + 'erro.png',
        titulo: 'Erraste',
        subtitulo: 'Tenés que ser más rápido',
        parrafo: 'Necesitás acertar ' + this.juego.aciertosRestantes + ' veces más para ganar. Te ' + (this.juego.vidas===1?'queda 1 vida':('quedan ' + this.juego.vidas + ' vidas')),
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
    else if (intento == 'empate') {
      this.mensajeResultado = {
        tipo: 'empate',
        bootstrapClass: 'alert-info',
        imagenPath: this.RutasService.rutaImagenesSitio + 'empate.png',
        titulo: 'Empate',
        subtitulo: 'Aqui no ha pasado nada...',
        parrafo: 'Necesitás acertar ' + this.juego.aciertosRestantes + ' veces más para ganar. Te ' + (this.juego.vidas===1?'queda 1 vida':('quedan ' + this.juego.vidas + ' vidas')),
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
  }

  guardarJugada(gano){
    var formData = new FormData();//borrar si no funciona
    formData.append('idUsuario',this.juego.usuarioActual.id);
    formData.append('idJuego', this.juego.id.toString());
    formData.append('momento', Date.now().toString());
    formData.append('gano', gano === 'gano'? "1" : "0");
    formData.append('puntos', this.juego.puntos.toString());

    this.spinner = true;
    this.httpService.crear(this.juego.rutaAPI, formData)
    .then(datos => {
      this.spinner = false;
      let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
      usuarioActual.puntos = usuarioActual.puntos + this.juego.puntos;
      usuarioActual.jugadas += 1;
      gano === 'gano'? usuarioActual.ganadas += 1 : usuarioActual.perdidas += 1;
      localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
      this.actualizacionusuarioService.actualizarObservable();
    })
    .catch(error => {
      console.log(error);
    });
  }
}