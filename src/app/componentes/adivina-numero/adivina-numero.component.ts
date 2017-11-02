import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AdivinaNumero } from '../../clases/adivina-numero';
import { HttpService } from '../../servicios/http.service';

declare var $: any;
@Component({
  selector: 'app-adivina-numero',
  templateUrl: './adivina-numero.component.html',
  styleUrls: ['./adivina-numero.component.css']
})
export class AdivinaNumeroComponent implements OnInit {
  juego: AdivinaNumero;
  juegoForm: FormGroup;
  mensajeResultado: object;
  mostrarMensajeResultado: boolean;
  rutaAPI: string = "https://tp2017utn.000webhostapp.com/index.php/consultaJugadas/crear";
  usuarioActual;

  constructor(private formBuilder:FormBuilder, public httpService: HttpService ) {
    this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    this.juegoForm = this.formBuilder.group({
      'respuesta': [null, Validators.compose([Validators.required, Validators.maxLength(2)])]
    });
    this.generarNuevo();
  }

  ngOnInit() {
  }

  generarNuevo() {
    this.juego = new AdivinaNumero('Pedro');
    this.juego.generarSolucion();
  }

  accion(tipo){
    this.mostrarMensajeResultado = false;
    this.resetearFormulario();
    if (tipo !== 'continua') {
      this.generarNuevo();
    }
  }

  resetearFormulario() {
    this.juegoForm.reset();
    (<HTMLInputElement>document.getElementById("respuestaInput")).disabled = false;
    document.getElementById("respuestaInput").focus();
  }

  verificar() {    
    this.juego.respuesta = this.juegoForm.value.respuesta;
    (<HTMLInputElement>document.getElementById("respuestaInput")).disabled = true;
    let resultado = this.juego.verificar();
    this.mostrarMensajeResultado = true;
    if (resultado === 'gano') {
      this.mensajeResultado = {
        tipo: 'gano',
        bootstrapClass: 'alert-success',
        imagenPath: './assets/gano.png',
        titulo: 'Acertaste!',
        subtitulo: this.juego.puntos === 1?'Ganaste 1 punto':'Ganaste ' + this.juego.puntos + ' puntos',
        parrafo: 'Tu logro quedó registrado ¿Jugamos otra vez?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
      this.guardarJugada('gano');
    }
    else if (resultado === 'perdio') {
      this.mensajeResultado = {
        tipo: 'perdio',
        bootstrapClass: 'alert-danger',
        imagenPath: './assets/perdio.png',
        titulo: 'Perdiste!',
        subtitulo: 'El número secreto era: ' +  this.juego.solucion,
        parrafo: '¿Intentamos de nuevo?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
      this.guardarJugada('perdio');
    }
    else if (resultado === 'continua'){
      this.juego.generarPista();
      this.mensajeResultado = {
        tipo: 'continua',
        bootstrapClass: 'alert-warning',
        imagenPath: './assets/error.png',
        titulo: 'Ups!',
        subtitulo: this.juego.pista,
        parrafo: this.juego.vidas === 1?'Te queda 1 vida':'Te quedan ' + this.juego.vidas + ' vidas',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
    setTimeout(function(){
      document.getElementById("botonPrimario").focus();
    }, 0);
  }
  guardarJugada(gano){
    this.httpService.crear(this.rutaAPI, {
    "idUsuario": this.usuarioActual.id,
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
