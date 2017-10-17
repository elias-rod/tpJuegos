import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AdivinaNumero } from '../../clases/adivina-numero';

@Component({
  selector: 'app-adivina-numero',
  templateUrl: './adivina-numero.component.html',
  styleUrls: ['./adivina-numero.component.css']
})
export class AdivinaNumeroComponent implements OnInit {
  argumentosModal: object;
  miAdivina: AdivinaNumero;
  adivinaForm: FormGroup;
  
  constructor(private formBuilder:FormBuilder) {
    this.miAdivina = new AdivinaNumero('Elias');
    this.adivinaForm = this.formBuilder.group({
      'respuesta': [null, Validators.compose([Validators.required, Validators.maxLength(2)])]
    });
  }

  ngOnInit() {
    this.miAdivina.generarSolucion();
  }

  generarNuevo() {
    this.miAdivina = new AdivinaNumero('Pedro');
    this.miAdivina.generarSolucion();
    this.resetearFormulario();
  }

  verificar(evento) {
    this.miAdivina.respuesta = this.adivinaForm.value.respuesta;
    this.miAdivina.verificar();
    if (this.miAdivina.gano) {
      this.argumentosModal = {
        tipo: 'gano',
        imagenPath: './assets/gano.png',
        titulo: 'Ganaste!',
        subtitulo: 'Felicitaciones lo adivinaste en tan sólo ' + (7 - this.miAdivina.intentosRestantes) + ' intentos',
        parrafo: 'Tu logro quedó registrado ¿Jugamos otra vez?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
    }
    else if (this.miAdivina.intentosRestantes == 0) {
      this.argumentosModal = {
        tipo: 'perdio',
        imagenPath: './assets/perdio.png',
        titulo: 'Perdiste!',
        subtitulo: 'Lástima, el número secreto era ' +  this.miAdivina.solucion,
        parrafo: '¿Qué tal si intentas una nueva partida?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
    }
    else {
      this.miAdivina.generarPista();
      this.argumentosModal = {
        tipo: 'continua',
        imagenPath: './assets/error.png',
        titulo: 'Ups!',
        subtitulo: this.miAdivina.respuesta + '... ' + this.miAdivina.pista,
        parrafo: 'Te quedan ' + this.miAdivina.intentosRestantes + ' intentos restantes...',
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
    this.adivinaForm.reset();
    setTimeout(function(){
      document.getElementById("respuestaInput").focus();
    }, 0);
  }
}
