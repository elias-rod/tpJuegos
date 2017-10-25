import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AdivinaNumero } from '../../clases/adivina-numero';
declare var $: any;
@Component({
  selector: 'app-adivina-numero',
  templateUrl: './adivina-numero.component.html',
  styleUrls: ['./adivina-numero.component.css']
})
export class AdivinaNumeroComponent implements OnInit {
  argumentosModal: object;
  juego: AdivinaNumero;
  juegoForm: FormGroup;
  
  constructor(private formBuilder:FormBuilder) {
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
    this.resetearFormulario();
  }

  verificar() {
    $(document).ready(function() {
      $("#modal").on('shown.bs.modal', function(event) {
        $("#botonPrimario").focus();
      });
    });
    
    this.juego.respuesta = this.juegoForm.value.respuesta;
    let resultado = this.juego.verificar();
    if (resultado === 'gano') {
      this.argumentosModal = {
        tipo: 'gano',
        imagenPath: './assets/gano.png',
        titulo: 'Acertaste!',
        subtitulo: this.juego.puntos === 1?'Ganaste 1 punto':'Ganaste ' + this.juego.puntos + ' puntos',
        parrafo: 'Tu logro quedó registrado ¿Jugamos otra vez?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
    }
    else if (resultado === 'perdio') {
      this.argumentosModal = {
        tipo: 'perdio',
        imagenPath: './assets/perdio.png',
        titulo: 'Perdiste!',
        subtitulo: 'El número secreto era: ' +  this.juego.solucion,
        parrafo: '¿Intentamos de nuevo?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
    }
    else if (resultado === 'continua'){
      this.juego.generarPista();
      this.argumentosModal = {
        tipo: 'continua',
        imagenPath: './assets/error.png',
        titulo: 'Ups!',
        subtitulo: this.juego.pista,
        parrafo: this.juego.vidas === 1?'Te queda 1 vida':'Te quedan ' + this.juego.vidas + ' vidas',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
  }

  accionModal(tipo){
    if (tipo === 'continua') {
      this.resetearFormulario();
    }
    else {
      this.generarNuevo();
      this.resetearFormulario();
    }
  }

  resetearFormulario() {
    this.juegoForm.reset();
    setTimeout(function(){
      document.getElementById("respuestaInput").focus();
    }, 0);
  }
}
