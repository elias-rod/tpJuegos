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

  miAgilidad: AgilidadAritmetica;
  agilidadForm: FormGroup;
  argumentosModal: object;
  progresoBarra: number;
  colorBarra: string;
  minutero;
  constructor(private formBuilder:FormBuilder) {
    this.miAgilidad = new AgilidadAritmetica('Elias');
    this.miAgilidad.generarSolucion();
    this.iniciarCuentaRegresiva();
    this.agilidadForm = this.formBuilder.group({
      'respuesta': [null, Validators.compose([Validators.required, Validators.maxLength(4)])]
    });
    this.colorBarra = '';
  }

  ngOnInit() {
  }

  iniciarCuentaRegresiva() {
    this.miAgilidad.segundosRestantes = this.miAgilidad.segundosMax + 1;
    this.minutero = setInterval(
      () => {
        if(this.miAgilidad.segundosRestantes == 0) {
          this.verificar();
          $("#modal").modal("show");
          return;
        }
        else {
          this.miAgilidad.segundosRestantes--;
        }
        this.progresoBarra = Math.floor(100 * (this.miAgilidad.segundosRestantes / this.miAgilidad.segundosMax));
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
    this.miAgilidad = new AgilidadAritmetica('Pedro');
    this.miAgilidad.generarSolucion();
    this.resetearFormulario();
    this.iniciarCuentaRegresiva();
  }

  verificar() {
    clearInterval(this.minutero);
    this.miAgilidad.respuesta = this.agilidadForm.value.respuesta;
    let intento = this.miAgilidad.verificar();
    if (this.miAgilidad.gano) {
      this.argumentosModal = {
        tipo: 'gano',
        imagenPath: './assets/gano.png',
        titulo: 'Ganaste!',
        subtitulo: 'Felicitaciones hiciste 3 aciertos en ' + (6 - (this.miAgilidad.aciertosRestantes + this.miAgilidad.erroresRestantes)) + ' intentos',
        parrafo: 'Tu logro quedó registrado ¿Jugamos otra vez?',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Nueva partida'
      }
    }
    else if (this.miAgilidad.erroresRestantes == 0) {
      this.argumentosModal = {
        tipo: 'perdio',
        imagenPath: './assets/perdio.png',
        titulo: 'Perdiste!',
        subtitulo: 'Es que cometiste 3 errores de 5 intentos posibles. La respuesta correcta era: ' + this.miAgilidad.solucion,
        parrafo: '¿Qué tal si intentas una nueva partida?',
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
        parrafo: 'Necesitas acertar ' + this.miAgilidad.aciertosRestantes + ' más y como máximo podes errar ' + this.miAgilidad.erroresRestantes + ' más',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
    else if (intento == 'erro') {
      this.argumentosModal = {
        tipo: 'continua',
        imagenPath: './assets/erro.png',
        titulo: 'Erraste!',
        subtitulo: 'La respuesta correcta era: ' + this.miAgilidad.solucion,
        parrafo: 'Necesitas acertar ' + this.miAgilidad.aciertosRestantes + ' más y como máximo podes errar ' + this.miAgilidad.erroresRestantes + ' más',
        textoBotonSecundario: 'Jugar otros juegos',
        textoBotonPrimario: 'Continuar'
      }
    }
  }

  accionModal(tipo){
    if (tipo === 'continua') {
      this.miAgilidad.generarSolucion();
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
