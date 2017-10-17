export class Juego {
    nombre: string;
    jugador: string;
    gano: boolean;
    solucion: number;
    respuesta: number;

    constructor(jugador: string) {
        this.jugador = jugador;
        this.gano = false;
    }
}
