import { Juego } from './juego';

export class Ppot extends Juego {
    aciertosRestantes: number;
    eleccionIA: number;

    constructor(jugador: string) {
        super(jugador);
        this.nombre = 'Piedra, papel o tijera';
        this.aciertosRestantes = 3;//para ganar
        this.vidas = 3;//para perder
    }

    generarSolucion(){
        this.eleccionIA = Math.floor(Math.random() * 3);
        if(this.eleccionIA === 0){
            this.solucion = 1;
        }
        else if(this.eleccionIA === 1 ){
            this.solucion = 2;
        }
        else if(this.eleccionIA === 2 ){
            this.solucion = 0;
        }
    }

    verificar(){
        console.log('Solución: ' + this.solucion + '... respuesta: ' + this.respuesta + '...eleccionIA: ' + this.eleccionIA);
        if (this.respuesta === this.solucion) {
            this.aciertosRestantes--;
            if (this.aciertosRestantes == 0) {
                this.puntos = 3;
                return 'gano'
            }
            return 'acerto';
        }
        else if (this.eleccionIA === this.respuesta) {
            return 'empate';
        }
        else {
            this.vidas--;
            if(this.vidas === 0){
                return 'perdio';
            }
            return 'erro';
        }
    }
}