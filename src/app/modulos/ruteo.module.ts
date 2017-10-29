import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicialComponent } from '../componentes/inicial/inicial.component';
import { LoginComponent } from '../componentes/login/login.component';
import { MenuComponent } from '../componentes/menu/menu.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { AdivinaNumeroComponent } from '../componentes/adivina-numero/adivina-numero.component';
import { AgilidadAritmeticaComponent } from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { AgudezaVisualComponent } from '../componentes/agudeza-visual/agudeza-visual.component';
import { AnagramaComponent } from '../componentes/anagrama/anagrama.component';
import { PpotComponent } from '../componentes/ppot/ppot.component';
import { RankingComponent } from'../componentes/ranking/ranking.component';
import { DetalleComponent } from '../componentes/detalle/detalle.component';
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
  {path: 'anagrama' , component: AnagramaComponent},
  {path: 'ppot' , component: PpotComponent},
  {path: 'ranking' , component: RankingComponent},
  {path: 'detalle' , component: DetalleComponent},
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
