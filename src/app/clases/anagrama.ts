import { Juego } from './juego';

export class Anagrama extends Juego {
    erroresRestantes: number;
    palabras: Array<string>;
    solucion: string;
    palabraMezclada;
    copiaSolucion;

    constructor(jugador: string) {
        super(jugador);
        this.nombre = 'Anagrama';
        this.erroresRestantes = 3;//para perder
    }

    generarSolucion(){
        this.palabras = ['ORILLAS', 'PINTURAS', 'PROVINCIA', 'ANTIGUO', 'SUDAMERICA', 'REGISTRO', 'POBLACIONAL', 'TERRITORIO', 'ACTUALMENTE', 'CONTROLADO'];
        this.solucion = this.palabras[Math.floor(Math.random() * this.palabras.length)];
        this.copiaSolucion = this.solucion;
        this.palabraMezclada = this.copiaSolucion[0];
        this.copiaSolucion = this.copiaSolucion = this.copiaSolucion.substr(0, 0) + this.copiaSolucion.substr(0 + 1);;
        
        while (this.copiaSolucion.length > 0) {
          let posicionEliminar = Math.floor(Math.random() * this.copiaSolucion.length);
          this.palabraMezclada += this.copiaSolucion[posicionEliminar];
          this.copiaSolucion = this.copiaSolucion.substr(0, posicionEliminar) + this.copiaSolucion.substr(posicionEliminar + 1);
        }
        console.log('Solucion: ' + this.solucion);
        //PARA OBTENER ARRAY DE PALABRAS: TRANSFORMAR TEXTO A MAYUSCULAS, QUITAR PALABRAS CON Ñ, CAMBIAR VOCALES ACENTUADAS POR NO ACENTUADAS Y APLICAR LAS DOS FUNCIONES DEBAJO
        //this.texto = this.texto.replace(/[^a-zA-Z\s]/g,'');
        //this.texto = this.texto.replace(/\W*\b\w{1,6}\b/g, "");
    }

    verificar(){
        //console.log('Respuesta: ' + this.respuesta);
        if (this.respuesta === this.solucion) {
            this.gano = true;
            return 'gano';
        }
        else {
            this.erroresRestantes--;
            if (this.erroresRestantes === 0) {
                return 'perdio';
            }
            return 'erro';
        }
    }
}