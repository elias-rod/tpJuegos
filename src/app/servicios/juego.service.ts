import { Injectable } from '@angular/core';
import { Juego } from '../clases/juego';
import { AgudezaVisual } from '../clases/agudeza-visual';
import { AgilidadAritmetica } from '../clases/agilidad-aritmetica';
import { AdivinaNumero } from '../clases/adivina-numero';

@Injectable()
export class JuegoService {

  constructor() { }

  listar(): Array<Juego> {
    let miArray: Array<Juego> = new Array<Juego>();
    miArray.push(new AgudezaVisual('Pato'));
    miArray.push(new AgudezaVisual('Peto'));
    miArray.push(new AgilidadAritmetica('Pito'));
    miArray.push(new AdivinaNumero('Poto'));
    miArray.push(new AdivinaNumero('Lucas'));
    return miArray;
  }

  listarPromesa(): Promise<Array<Juego>> {
    let promesa: Promise<Array<Juego>> = new Promise((resolve, reject) => {
      let miArray: Array<Juego> = new Array<Juego>();
      miArray.push(new AgudezaVisual('Pato'));
      miArray.push(new AgudezaVisual('Peto'));
      miArray.push(new AgilidadAritmetica('Pito'));
      miArray.push(new AdivinaNumero('Poto'));
      miArray.push(new AdivinaNumero('Lucas'));
      resolve(miArray);
    });
    return promesa;
  }
}
