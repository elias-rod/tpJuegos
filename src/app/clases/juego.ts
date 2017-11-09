import { RutasService } from '../servicios/rutas.service';

export class Juego {
    id: number;
    solucion: any;
    respuesta: any;
    puntos: number;
    vidas: number;
    RutasService: RutasService = new RutasService();
    rutaAPI: string = this.RutasService.rutaAPI + "consultaJugadas/crear";
    usuarioActual: any;
    

    constructor() {
        this.puntos = 0;
        this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    }
}
