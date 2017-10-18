import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RuteoModule } from './modulos/ruteo.module';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { AdivinaNumeroComponent } from './componentes/adivina-numero/adivina-numero.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { AgudezaVisualComponent } from './componentes/agudeza-visual/agudeza-visual.component';
import { JuegoService } from './servicios/juego.service';
import { ListadoComponent } from './componentes/listado/listado.component';
import { ListadoResultadosComponent } from './componentes/listado-resultados/listado-resultados.component';
import { ErrorComponent } from './componentes/error/error.component';
import { InicialComponent } from './componentes/inicial/inicial.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { ModalComponent } from './componentes/modal/modal.component';
import { PpotComponent } from './componentes/ppot/ppot.component';
import { AnagramaComponent } from './componentes/anagrama/anagrama.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdivinaNumeroComponent,
    AgilidadAritmeticaComponent,
    MenuComponent,
    AgudezaVisualComponent,
    ListadoResultadosComponent,
    ListadoComponent,
    ErrorComponent,
    InicialComponent,
    InicialComponent,
    RegistroComponent,
    JuegosComponent,
    ModalComponent,
    PpotComponent,
    AnagramaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RuteoModule
  ],
  providers: [JuegoService],
  bootstrap: [AppComponent]
})
export class AppModule { }