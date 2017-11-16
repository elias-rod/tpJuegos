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
import { UsuarioComponent } from '../componentes/usuario/usuario.component';
import { NominaComponent } from '../componentes/nomina/nomina.component';

import { AuthGuard } from '../servicios/auth.guard';

const MiRuteo = [
  {path: '' , component: InicialComponent, canActivate: [AuthGuard]},
  {path: 'login' , component: LoginComponent},
  {path: 'registro' , component: RegistroComponent},
  {path: 'juegos' , component: JuegosComponent, canActivate: [AuthGuard]},
  {path: 'adivina' , component: AdivinaNumeroComponent, canActivate: [AuthGuard]},
  {path: 'agilidad' , component: AgilidadAritmeticaComponent, canActivate: [AuthGuard]},
  {path: 'agudeza' , component: AgudezaVisualComponent, canActivate: [AuthGuard]},
  {path: 'anagrama' , component: AnagramaComponent, canActivate: [AuthGuard]},
  {path: 'ppot' , component: PpotComponent, canActivate: [AuthGuard]},
  {path: 'ranking' , component: RankingComponent, canActivate: [AuthGuard]},
  {path: 'inicial' , component: InicialComponent, canActivate: [AuthGuard]},
  {path: 'usuario' , component: UsuarioComponent, canActivate: [AuthGuard]},
  {path: 'nomina' , component: NominaComponent, canActivate: [AuthGuard]},
  
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
