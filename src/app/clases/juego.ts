export class Juego {
    nombre: string;
    jugador: string;
    gano: boolean;
    solucion: any;
    respuesta: any;

    constructor(jugador: string) {
        this.jugador = jugador;
        this.gano = false;
    }
}
