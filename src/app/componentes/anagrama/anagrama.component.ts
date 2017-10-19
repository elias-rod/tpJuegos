import { Component, OnInit } from '@angular/core';
import { Anagrama } from '../../clases/anagrama';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
  palabras: Array<string>;
  solucion: string;
  palabraMezclada;
  copiaSolucion;
  constructor() { }

  ngOnInit() {
    this.palabras = ['ORILLAS', 'PINTURAS', 'PROVINCIA', 'ANTIGUO', 'SUDAMERICA', 'REGISTRO', 'POBLACIONAL', 'TERRITORIO', 'ACTUALMENTE', 'CONTROLADO'];
    this.solucion = this.palabras[Math.floor(Math.random() * 10)];//2121
    this.copiaSolucion = this.solucion;
    this.palabraMezclada = '';
    for (var index = this.copiaSolucion.length; index > 0; index--) {
      let posicionEliminar = Math.floor(Math.random() * this.copiaSolucion.length);
      this.palabraMezclada += this.copiaSolucion[posicionEliminar];
      this.copiaSolucion = this.copiaSolucion.substr(0, posicionEliminar) + this.copiaSolucion.substr(posicionEliminar + 1);
    }
    console.log('Solucion: ' + this.solucion);
    console.log('palabraMezclada: ' + this.palabraMezclada);
    //TRANSFORMAR TEXTO A MAYUSCULAS, CAMBIAR VOCALES ACENTUADAS POR NO ACENTUADAS Y APLICAR LAS DOS FUNCIONES DEBAJO
    //this.texto = this.texto.replace(/[^a-zA-Z\s]/g,'');
    //this.texto = this.texto.replace(/\W*\b\w{1,6}\b/g, "");
  }

}
