import { Juego } from './juego';

export class AgudezaVisual extends Juego {
    color: string[];
    aciertosRestantes: number;

    constructor(jugador: string) {
        super(jugador);
        this.nombre = 'Agudeza visual';
        this.color = [];
        this.aciertosRestantes = 3;//para ganar
        this.vidas = 3;//para perder
    }

    generarSolucion(){
        this.color[0] = '#';
        this.color[1] = '#';
        this.color[2] = '#';
        let random;
        for (let index = 1; index < 7; index++) {
            random = Math.floor(Math.random() * 16);
            this.color[0] += random.toString(16);
            if(index % 2 != 0){
                if(random > 7){
                    this.color[1] += (random - 1).toString(16);
                    this.color[2] += (random - 2).toString(16);
                }
                else{
                    this.color[1] += (random + 2).toString(16);
                    this.color[2] += (random + 1).toString(16);
                }
            }
            else{
                this.color[1] += this.color[0][index];
                this.color[2] += this.color[0][index];
            }
        }
        this.solucion = Math.floor((Math.random() * 3));
        this.color[3] = this.color[this.solucion];
    }

    verificar(){
        console.log('Solución: ' + (this.solucion + 1));
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