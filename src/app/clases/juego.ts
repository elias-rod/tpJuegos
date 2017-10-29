export class Juego {
    nombre: string;
    jugador: string;
    solucion: any;
    respuesta: any;
    puntos: number;
    vidas: number;

    constructor(jugador: string) {
        this.jugador = jugador;
        this.puntos = 0;
    }
}
