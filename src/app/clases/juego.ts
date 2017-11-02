export class Juego {
    nombre: string;
    id: number;
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
