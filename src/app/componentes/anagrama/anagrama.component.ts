import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Anagrama } from '../../clases/anagrama';
import { HttpService } from '../../servicios/http.service';
import { ActualizacionusuarioService } from '../../servicios/actualizacionusuario.service';

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

  constructor(private formBuilder:FormBuilder, public httpService: HttpService, public actualizacionusuarioService: ActualizacionusuarioService) {
    this.juegoForm = this.formBuilder.group({
      'respuesta': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(6)])]
    });
    this.generarNuevo();
  }

  ngOnInit() {
    this.generarAnimacion('palabraMezclada', 'lightSpeedIn');
  }

  generarNuevo() {
    this.juego = new Anagrama();
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
    document.getElementById("respuestaInput").focus();
    (<HTMLInputElement>document.getElementById("respuestaInput")).disabled = false;
  }

  verificar() {
    this.juego.respuesta = this.juegoForm.value.respuesta.toUpperCase();
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
        titulo: 'Incorrecto',
        subtitulo: 'La palabra era: ' + this.juego.solucion,
        parrafo: '¿Intentamos de nuevo?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
      this.guardarJugada('perdio');
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