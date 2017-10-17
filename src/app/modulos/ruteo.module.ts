import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicialComponent } from '../componentes/inicial/inicial.component';
import { LoginComponent } from '../componentes/login/login.component';
import { MenuComponent } from '../componentes/menu/menu.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { AdivinaNumeroComponent } from '../componentes/adivina-numero/adivina-numero.component';
import { AgilidadAritmeticaComponent } from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { AgudezaVisualComponent } from '../componentes/agudeza-visual/agudeza-visual.component';
import { PpotComponent } from '../componentes/ppot/ppot.component';
import { ListadoComponent } from'../componentes/listado/listado.component';
import { ListadoResultadosComponent } from '../componentes/listado-resultados/listado-resultados.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { JuegosComponent } from '../componentes/juegos/juegos.component';

const MiRuteo = [
  {path: '' , component: InicialComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'registro' , component: RegistroComponent},
  {path: 'juegos' , component: JuegosComponent},
  {path: 'adivina' , component: AdivinaNumeroComponent},
  {path: 'agilidad' , component: AgilidadAritmeticaComponent},
  {path: 'agudeza' , component: AgudezaVisualComponent},
  {path: 'ppot' , component: PpotComponent},
  {path: 'listados' , component: ListadoComponent},
  {path: 'inicial' , component: InicialComponent},
  {path: 'error' , component: ErrorComponent},
  {path: '**' , component: ErrorComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteoModule { }
