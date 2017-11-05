export class Juego {
    id: number;
    solucion: any;
    respuesta: any;
    puntos: number;
    vidas: number;
    rutaAPI: string;
    usuarioActual: any;

    constructor() {
        this.puntos = 0;
        this.rutaAPI = "https://tp2017utn.000webhostapp.com/index.php/consultaJugadas/crear";
        this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    }
}
