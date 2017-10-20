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
    this.juego.respuesta = this.agilidadForm.value.respuesta;
    let intento = this.juego.verificar();
    if (this.juego.gano) {
      this.argumentosModal = {
        tipo: 'gano',
        imagenPath: './assets/gano.png',
        titulo: 'Ganaste!',
        subtitulo: 'Felicitaciones hiciste 3 aciertos en ' + (6 - (this.juego.aciertosRestantes + this.juego.erroresRestantes)) + ' intentos',
        parrafo: 'Tu logro quedó registrado ¿Jugamos otra vez?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
    }
    else if (this.juego.erroresRestantes == 0) {
      this.argumentosModal = {
        tipo: 'perdio',
        imagenPath: './assets/perdio.png',
        titulo: 'Perdiste!',
        subtitulo: 'La respuesta correcta era: ' + this.juego.solucion,
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
        subtitulo: 'Muy bien...',
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' más para ganar. Si errás ' + this.juego.erroresRestantes + ' más, perdés',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
    else if (intento == 'erro') {
      this.argumentosModal = {
        tipo: 'continua',
        imagenPath: './assets/erro.png',
        titulo: 'Erraste!',
        subtitulo: 'La respuesta correcta era: ' + this.juego.solucion,
        parrafo: 'Necesitas acertar ' + this.juego.aciertosRestantes + ' más para ganar. Si errás ' + this.juego.erroresRestantes + ' más, perdés',
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
