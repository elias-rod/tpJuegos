import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AgilidadAritmetica } from '../../clases/agilidad-aritmetica';

declare var $: any;

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  juego: AgilidadAritmetica;
  agilidadForm: FormGroup;
  argumentosModal: object;
  progresoBarra: number;
  colorBarra: string;
  minutero;
  constructor(private formBuilder:FormBuilder) {
    this.agilidadForm = this.formBuilder.group({
      'respuesta': [null, Validators.compose([Validators.required, Validators.maxLength(4)])]
    });
    this.generarNuevo();
    this.colorBarra = '';
  }

  ngOnInit() {
  }

  iniciarCuentaRegresiva() {
    this.juego.segundosRestantes = this.juego.segundosMax + 1;
    this.minutero = setInterval(
      () => {
        if(this.juego.segundosRestantes == 0) {
          this.verificar();
          $("#modal").modal("show");
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
    this.juego = new AgilidadAritmetica('Pedro');
    this.juego.generarSolucion();
    this.resetearFormulario();
    this.iniciarCuentaRegresiva();
  }

  verificar() {
    clearInterval(this.minutero);
    $(document).ready(function() {
      $("#modal").on('shown.bs.modal', function(event) {
        $("#botonPrimario").focus();
      });
    });
    this.juego.respuesta = this.agilidadForm.value.respuesta;
    let intento = this.juego.verificar();
    if (intento === 'gano') {
      this.argumentosModal = {
        tipo: 'gano',
        imagenPath: './assets/gano.png',
        titulo: 'Muy bien!',
        subtitulo: 'Ganaste ' + this.juego.puntos + ' puntos',
        parrafo: 'Tu logro quedó registrado ¿Jugamos otra vez?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
    }
    else if (intento === 'perdio') {
      this.argumentosModal = {
        tipo: 'perdio',
        imagenPath: './assets/perdio.png',
        titulo: 'Te quedaste sin vidas',
        subtitulo: this.juego.operando1 + ' ' + this.juego.operador + ' ' + this.juego.operando2 + ' = ' + this.juego.solucion + '. Vos respondiste: ' + (this.juego.respuesta == null?'nada':this.juego.respuesta),
        parrafo: '¿Intentamos de nuevo?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
    }
    else if (intento == 'acerto') {
      this.argumentosModal = {
        tipo: 'continua',
        imagenPath: './assets/acerto.png',
        titulo: 'Acertaste!',
        subtitulo: this.juego.operando1 + ' ' + this.juego.operador + ' ' + this.juego.operando2 + ' = ' + this.juego.solucion,
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' veces más para ganar. Te ' + (this.juego.vidas===1?'queda 1 vida':('quedan ' + this.juego.vidas + ' vidas')),
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
    else if (intento == 'erro') {
      this.argumentosModal = {
        tipo: 'continua',
        imagenPath: './assets/erro.png',
        titulo: 'Erraste',
        subtitulo: this.juego.operando1 + ' ' + this.juego.operador + ' ' + this.juego.operando2 + ' = ' + this.juego.solucion + '. Vos respondiste: ' + (this.juego.respuesta == null?'nada':this.juego.respuesta),
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' veces más para ganar. Te ' + (this.juego.vidas===1?'queda 1 vida':('quedan ' + this.juego.vidas + ' vidas')),
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
  }

  accionModal(tipo){
    if (tipo === 'continua') {
      this.juego.generarSolucion();
      this.resetearFormulario();
      this.iniciarCuentaRegresiva();
    }
    else {
      this.generarNuevo();
      this.resetearFormulario();
    }
  }

  resetearFormulario() {
    this.agilidadForm.reset();
    setTimeout(function(){
      document.getElementById("respuestaInput").focus();
    }, 0);
  }
}