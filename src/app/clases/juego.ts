export class Juego {
    nombre: string;
    jugador: string;
    solucion: any;
    respuesta: any;
    puntos: number;
    vidas: number;

    gano: boolean;//borrar
    constructor(jugador: string) {
        this.jugador = jugador;
        this.gano = false;//borrar
        this.puntos = 0;
    }
}
