import { Juego } from './juego';

export class Ppot extends Juego {
    aciertosRestantes: number;
    erroresRestantes: number;

    constructor(jugador: string) {
        super(jugador);
        this.nombre = 'Piedra, papel o tijera';
        this.aciertosRestantes = 3;//para ganar
        this.erroresRestantes = 3;//para perder
    }

    generarSolucion(){
        this.solucion = Math.floor(Math.random() * 3);
    }

    verificar(){
        console.log('Solución: ' + this.solucion + 1);
        //SI HAY EMPATE
        if (this.respuesta === this.solucion) {
            return 'empate';
        }
        //SI CASOS DE VICTORIA
        else if (
        this.respuesta == 0 && this.solucion == 2 ||
        this.respuesta == 1 && this.solucion == 0 ||
        this.respuesta == 2 && this.solucion == 1) {
            this.aciertosRestantes--;
            if (this.aciertosRestantes == 0) {
                this.gano = true;
            }
            return 'acerto';
        }
        else {
            this.erroresRestantes--;
            return 'erro';
        }
    }
}