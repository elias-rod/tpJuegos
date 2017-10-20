import { Juego } from './juego';

export class AgilidadAritmetica extends Juego{
    operando1: number;
    operando2: number;
    operador: string;
    aciertosRestantes: number;
    erroresRestantes: number;
    segundosMax: number;
    segundosRestantes: number;
    
    constructor(jugador: string) {
        super(jugador);
        this.nombre = 'Agilidad aritmética';
        this.aciertosRestantes = 3;//para ganar
        this.erroresRestantes = 3;//para perder
    }

    generarSolucion(){
        switch (Math.floor((Math.random() * 3))) {
            case 0:
            this.operando1 = Math.floor(Math.random() * 100);//del 0 al 100
            this.operando2 = Math.floor(Math.random() * 100);//del 0 al 100
                this.operador = "+";
                this.solucion = this.operando1 + this.operando2;
                this.segundosMax = 7;
                break;
            case 1:
            this.operando1 = Math.floor(Math.random() * 100);//del 0 al 100
            this.operando2 = Math.floor(Math.random() * 100);//del 0 al 100
                this.operador = "-";
                this.solucion = this.operando1 - this.operando2;
                this.segundosMax = 7;
                break;
            case 2:
            this.operando1 = Math.floor(Math.random() * 100);//del 0 al 100
            this.operando2 = Math.floor(Math.random() * 9);//del 0 al 100
                this.operador = "*";
                this.solucion = this.operando1 * this.operando2;
                this.segundosMax = 7;
                break;
        }
        console.info("Solución: ", this.solucion);
    }

    verificar() {
        if (this.respuesta == this.solucion) {
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
