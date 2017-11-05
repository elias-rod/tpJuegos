import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AgilidadAritmetica } from '../../clases/agilidad-aritmetica';
import { HttpService } from '../../servicios/http.service';
import { ActualizacionusuarioService } from '../../servicios/actualizacionusuario.service';

declare var $: any;

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit, OnDestroy {

  juego: AgilidadAritmetica;
  juegoForm: FormGroup;
  mensajeResultado: object;
  mostrarMensajeResultado: boolean;
  progresoBarra: number;
  colorBarra: string = '';
  minutero;

  constructor(private formBuilder:FormBuilder, public httpService: HttpService, public actualizacionusuarioService: ActualizacionusuarioService ) {
    this.juegoForm = this.formBuilder.group({
      'respuesta': [null, Validators.compose([Validators.required, Validators.maxLength(4)])]
    });
    this.generarNuevo();
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.minutero){
      clearInterval(this.minutero);
    }
  }
  
  iniciarCuentaRegresiva() {
    this.juego.segundosRestantes = this.juego.segundosMax + 1;
    this.minutero = setInterval(
      () => {
        if(this.juego.segundosRestantes == 0) {
          this.verificar();
          return;
        }
        else {
          this.juego.segundosRestantes--;
        }
        this.progresoBarra = Math.floor(100 * (this.juego.segundosRestantes / this.juego.segundosMax));
        if (this.progresoBarra > 66) {
          this.colorBarra = 'progress-bar-success';
        }
        else if (this.progresoBarra > 33 && this.progresoBarra < 66) {
          this.colorBarra = 'progress-bar-warning';
        }
        else {
          this.colorBarra = 'progress-bar-danger';
        }
      }, 1000
    );
  }
  
  generarNuevo() {
    this.juego = new AgilidadAritmetica();
    this.juego.generarSolucion();
    this.iniciarCuentaRegresiva();
  }

  accion(tipo){
    this.mostrarMensajeResultado = false;
    this.resetearFormulario();
    if (tipo === 'continua') {
      this.juego.generarSolucion();
      this.iniciarCuentaRegresiva();
    }
    else {
      this.generarNuevo();
    }
  }

  resetearFormulario() {
    this.juegoForm.reset();
    (<HTMLInputElement>document.getElementById("respuestaInput")).disabled = false;
    document.getElementById("respuestaInput").focus();
  }

  verificar() {
    clearInterval(this.minutero);
    this.juego.respuesta = this.juegoForm.value.respuesta;
    (<HTMLInputElement>document.getElementById("respuestaInput")).disabled = true;
    let intento = this.juego.verificar();
    this.mostrarMensajeResultado = true;
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
        subtitulo: this.juego.operando1 + ' ' + this.juego.operador + ' ' + this.juego.operando2 + ' = ' + this.juego.solucion + '. Vos respondiste: ' + (this.juego.respuesta == null?'nada':this.juego.respuesta),
        parrafo: '¿Intentamos de nuevo?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
      this.guardarJugada('perdio');
    }
    else if (intento == 'acerto') {
      this.mensajeResultado = {
        tipo: 'continua',
        bootstrapClass: 'alert-warning',
        imagenPath: './assets/acerto.png',
        titulo: 'Acertaste!',
        subtitulo: this.juego.operando1 + ' ' + this.juego.operador + ' ' + this.juego.operando2 + ' = ' + this.juego.solucion,
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' veces más para ganar. Te ' + (this.juego.vidas===1?'queda 1 vida':('quedan ' + this.juego.vidas + ' vidas')),
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
    else if (intento == 'erro') {
      this.mensajeResultado = {
        tipo: 'continua',
        bootstrapClass: 'alert-warning',
        imagenPath: './assets/erro.png',
        titulo: 'Erraste',
        subtitulo: this.juego.operando1 + ' ' + this.juego.operador + ' ' + this.juego.operando2 + ' = ' + this.juego.solucion + '. Vos respondiste: ' + (this.juego.respuesta == null?'nada':this.juego.respuesta),
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' veces más para ganar. Te ' + (this.juego.vidas===1?'queda 1 vida':('quedan ' + this.juego.vidas + ' vidas')),
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
    setTimeout(function(){
      document.getElementById("botonPrimario").focus();
    }, 0);
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