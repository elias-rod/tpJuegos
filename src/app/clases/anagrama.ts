import { Juego } from './juego';

export class Anagrama extends Juego {
    palabras: Array<string>;
    palabraMezclada: string;
    copiaSolucion: string;
    ultimaLetra: string;

    constructor() {
        super();
        this.id = 4;
        this.palabras = ['ORILLAS', 'PINTURAS', 'ANTIGUO', 'SUDAMERICA', 'REGISTRO', 'POBLACIONAL', 'CONTROLADO', 'REMONTA', 'ACUERDO', 'HALLAZGOS', 'RECOLECTORES', 'HABITARON', 'INSTALARON', 'SIERRAS', 'CORDOBA', 'DESPUES', 'MESOPOTAMIA', 'PRECOLOMBINA', 'UBICADA', 'HABITANTES', 'PRIMEROS', 'RASTROS', 'CORRESPONDEN', 'CULTURAL', 'PALEOLITICO', 'INCORPORARON', 'PRIMEROS', 'APORTES', 'CULTURALES', 'MESOLITICOS', 'NEOLITICOS', 'CONQUISTA', 'COLONIZACION', 'EUROPEA', 'OCUPADO', 'DIVERSOS', 'DIFERENTES', 'ORGANIZACIONES', 'SOCIALES', 'DIVIDIR', 'PRINCIPALES', 'ALIMENTOS', 'BASICOS', 'OCEANICOS', 'CANALES', 'FUEGUINOS', 'CAZADORES', 'AVANZADOS', 'CENTROESTE', 'PRADERAS', 'ESTEPAS', 'PAMPEANA', 'NORPATAGONICA', 'PATAGONIA', 'INVADIDOS', 'MAPUCHES', 'ALFAREROS', 'PROCEDENTES', 'CENTROSUR', 'TAMBIEN', 'PERTENECEN', 'INCORPORADO', 'CERAMICA', 'AGRICULTORES', 'CERAMICA', 'GUARANIES', 'CULTURAS', 'ANDINAS', 'DERIVADAS', 'SEGUNDO', 'MILENIO', 'CONOCIDO', 'GUARANIES', 'INVADIERON', 'LITORAL', 'ARGENTINO', 'CULTIVADORES', 'MANDIOCA', 'FLORESTAS', 'SEMISEDENTARIOS', 'CULTURAS', 'CENTRADAS', 'AGRICULTURA', 'GANADERIA', 'PURAMENTE', 'SEDENTARIAS', 'DESARROLLADO', 'COMERCIALES', 'ENGLOBADAS', 'CONJUNTO', 'ACTUALMENTE', 'LLAMADO', 'DIAGUITA', 'ESTABLECER', 'SISTEMA', 'LOCALES', 'SOMETIDOS', 'INCAICO', 'INFLUIDOS', 'CULTURAS', 'ANDINAS', 'PUEBLOS', 'DESARROLLARON', 'AGRICULTURA', 'GANADERIA', 'DESARROLLO', 'ADAPTADA', 'CONDICIONES', 'REGIONES', 'SERRANAS', 'ARGENTINA', 'INCAICO', 'CONQUISTO', 'ACTUALES', 'CATAMARCA', 'EXTREMO', 'PROVINCIA', 'TUCUMAN', 'PROVINCIAS', 'NOROESTE', 'MENDOZA', 'PROBABLEMENTE', 'SANTIAGO', 'INCORPORANDO', 'TRADICIONALMENTE', 'ATRIBUYE', 'MONARCA', 'YUPANQUI', 'ATACAMAS', 'DIAGUITAS', 'INTENTARON', 'RESISTIR', 'LOGRARON', 'DOMINARLOS', 'TRASLADANDO', 'TERRITORIOS', 'MITIMAES', 'COLONOS', 'DEPORTADOS', 'CHICHAS', 'SUROESTE', 'BOLIVIANO', 'POPULARMENTE', 'LLAMADOS', 'COMECHINGONES', 'RESISTIERON', 'INVASION', 'INCAICA', 'MANTUVIERON', 'INDEPENDIENTES', 'ARTICULO', 'CONQUISTA', 'LITOGRAFIA', 'COMIENZOS', 'IMPERIO', 'APROXIMADAMENTE', 'SOMETIENDO', 'ORIGINARIOS', 'HABITABAN', 'CONTINENTE', 'POBLACION', 'INDIGENA', 'MORTANDAD', 'PRODUJO', 'CATASTROFE', 'DEMOGRAFICA', 'CONQUISTADORES', 'EUROPEOS', 'INTRODUJERON', 'ESCLAVOS'];
    }

    generarSolucion(){
        this.solucion = this.palabras[Math.floor(Math.random() * this.palabras.length)];
        this.copiaSolucion = this.solucion;
        this.palabraMezclada = this.copiaSolucion[0];
        this.copiaSolucion = this.copiaSolucion = this.copiaSolucion.substr(0, 0) + this.copiaSolucion.substr(0 + 1);
        this.ultimaLetra = this.copiaSolucion[this.copiaSolucion.length - 1];
        this.copiaSolucion = this.copiaSolucion.substr(0, this.copiaSolucion.length - 1);
        while (this.copiaSolucion.length > 0) {
          let posicionEliminar = Math.floor(Math.random() * this.copiaSolucion.length);
          this.palabraMezclada += this.copiaSolucion[posicionEliminar];
          this.copiaSolucion = this.copiaSolucion.substr(0, posicionEliminar) + this.copiaSolucion.substr(posicionEliminar + 1);
        }
        this.palabraMezclada += this.ultimaLetra;
        console.log('Solucion: ' + this.solucion);
        //PARA OBTENER ARRAY DE PALABRAS: TRANSFORMAR TEXTO A MAYUSCULAS, QUITAR PALABRAS CON Ñ, CAMBIAR VOCALES ACENTUADAS POR NO ACENTUADAS Y APLICAR LAS DOS FUNCIONES DEBAJO
        //this.texto = this.texto.replace(/[^a-zA-Z\s]/g,'');
        //this.texto = this.texto.replace(/\W*\b\w{1,6}\b/g, "");
    }

    verificar(){
        //console.log('Respuesta: ' + this.respuesta);
        if (this.respuesta === this.solucion) {
            this.puntos = 3;
            return 'gano';
        }
        else {
            return 'perdio';
        }
    }
}