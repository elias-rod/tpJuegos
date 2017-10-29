import { Juego } from './juego';

export class AgilidadAritmetica extends Juego{
    operando1: number;
    operando2: number;
    operador: string;
    aciertosRestantes: number;
    segundosMax: number;
    segundosRestantes: number;
    
    constructor(jugador: string) {
        super(jugador);
        this.nombre = 'Agilidad aritmetica';
        this.aciertosRestantes = 3;//para ganar
        this.vidas = 3;
        this.segundosMax = 7;
    }

    generarSolucion(){
        switch (Math.floor((Math.random() * 3))) {
            case 0:
            this.operando1 = Math.floor(Math.random() * 100);//del 0 al 100
            this.operando2 = Math.floor(Math.random() * 100);//del 0 al 100
                this.operador = "+";
                this.solucion = this.operando1 + this.operando2;
                break;
            case 1:
            this.operando1 = Math.floor(Math.random() * 100);//del 0 al 100
            this.operando2 = Math.floor(Math.random() * 100);//del 0 al 100
                this.operador = "-";
                this.solucion = this.operando1 - this.operando2;
                break;
            case 2:
            this.operando1 = Math.floor(Math.random() * 100);//del 0 al 100
            this.operando2 = Math.floor(Math.random() * 9);//del 0 al 100
                this.operador = "*";
                this.solucion = this.operando1 * this.operando2;
                break;
        }
        console.info("Solución: ", this.solucion);
    }

    verificar() {
        if (this.respuesta == this.solucion) {
            this.aciertosRestantes--;
            if (this.aciertosRestantes == 0) {
                this.puntos = 3;
                return 'gano';
            }
            return 'acerto';
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