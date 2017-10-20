import { Juego } from './juego';

export class AdivinaNumero extends Juego {
    pista: string;
    intentosRestantes: number;

    constructor(jugador: string) {
        super(jugador);
        this.nombre = 'Adivina el número';
        this.intentosRestantes = 6;
    }

    generarSolucion(){
        this.solucion = Math.floor(Math.random() * 100);//del 0 al 99
        console.info("Solución: ", this.solucion);
    }

    generarPista(){
        if(this.respuesta > this.solucion){
            this.pista = 'Prueba un número más chico';
        }
        else{
            this.pista = 'Prueba un número más grande';
        }
    }

    verificar(){
        this.intentosRestantes--;
        if (this.respuesta == this.solucion) {
            this.gano = true;
        }
    }
}