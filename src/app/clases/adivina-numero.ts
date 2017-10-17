import { Juego } from './juego';

export class AdivinaNumero extends Juego {
    pista: string;
    intentosRestantes: number;

    constructor(jugador: string) {
        super(jugador);
        this.nombre = 'Adivina el número';
        this.intentosRestantes = 7;
    }

    generarSolucion(){
        this.solucion = Math.floor(Math.random() * 100);//del 0 al 99
        console.info("Solución: ", this.solucion);
    }

    generarPista(){
        if(this.respuesta > this.solucion){
            this.pista = 'te pasaste, prueba con un número más pequeño';
        }
        else{
            this.pista = 'te quedaste corto, prueba con un número más grande';
        }
    }

    verificar(){
        this.intentosRestantes--;
        if (this.respuesta == this.solucion) {
            this.gano = true;
        }
    }
}