import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Anagrama } from '../../clases/anagrama';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
  juego: Anagrama;
  mensajeResultado: object;
  mostrarMensajeResultado: boolean;
  juegoForm: FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.juegoForm = this.formBuilder.group({
      'respuesta': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(6)])]
    });
    this.generarNuevo();
  }

  ngOnInit() {
    this.generarAnimacion('palabraMezclada', 'lightSpeedIn');
  }

  generarNuevo() {
    this.juego = new Anagrama('Pedro');
    this.juego.generarSolucion();
    this.mostrarMensajeResultado = false;
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
    this.resetearFormulario();
    if (tipo === 'gano' || tipo === 'perdio') {
      this.generarNuevo();
      this.generarAnimacion('palabraMezclada', 'lightSpeedIn');
    }
  }

  resetearFormulario() {
    this.juegoForm.reset();
    setTimeout(function(){
      document.getElementById("respuestaInput").focus();
    }, 0);
  }

  verificar() {
    this.juego.respuesta = this.juegoForm.value.respuesta.toUpperCase();
    let intento = this.juego.verificar();
    this.mostrarMensajeResultado = true;
    if (intento === 'gano') {
      this.mensajeResultado = {
        tipo: 'gano',
        bootstrapClass: 'alert-success',
        imagenPath: './assets/gano.png',
        titulo: 'Ganaste!',
        subtitulo: 'Felicitaciones decifraste la palabra en ' + (4 - this.juego.erroresRestantes) + ' intento/s',
        parrafo: 'Tu logro quedó registrado ¿Jugamos otra vez?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
    }
    else if (intento === 'perdio') {
      this.mensajeResultado = {
        tipo: 'perdio',
        bootstrapClass: 'alert-danger',
        imagenPath: './assets/perdio.png',
        titulo: 'Perdiste!',
        subtitulo: 'Es que cometiste 3 errores',
        parrafo: '¿Qué tal si intentas una nueva partida?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
    }
    else if (intento == 'erro') {
      this.mensajeResultado = {
        tipo: 'erro',
        bootstrapClass: 'alert-warning',
        imagenPath: './assets/erro.png',
        titulo: 'Erraste!',
        subtitulo: 'Agudiza tu instinto',
        parrafo: 'Te quedan ' + this.juego.erroresRestantes + ' oportunidad/es',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
  }
}