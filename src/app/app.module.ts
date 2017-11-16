import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AuthModule } from './modulos/auth.module';

import { AppComponent } from './app.component';
import { RuteoModule } from './modulos/ruteo.module';

import { HttpService } from './servicios/http.service';
import { ActualizacionusuarioService } from './servicios/actualizacionusuario.service';
import { AuthGuard } from './servicios/auth.guard';
import { RutasService } from './servicios/rutas.service';

import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { AdivinaNumeroComponent } from './componentes/adivina-numero/adivina-numero.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { AgudezaVisualComponent } from './componentes/agudeza-visual/agudeza-visual.component';
import { ErrorComponent } from './componentes/error/error.component';
import { InicialComponent } from './componentes/inicial/inicial.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { PpotComponent } from './componentes/ppot/ppot.component';
import { AnagramaComponent } from './componentes/anagrama/anagrama.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { RankingComponent } from './componentes/ranking/ranking.component';
import { VictoriaPipe } from './pipes/victoria.pipe';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { AutorComponent } from './componentes/autor/autor.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { NominaComponent } from './componentes/nomina/nomina.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdivinaNumeroComponent,
    AgilidadAritmeticaComponent,
    MenuComponent,
    AgudezaVisualComponent,
    ErrorComponent,
    InicialComponent,
    InicialComponent,
    RegistroComponent,
    JuegosComponent,
    PpotComponent,
    AnagramaComponent,
    DetalleComponent,
    RankingComponent,
    VictoriaPipe,
    SpinnerComponent,
    AutorComponent,
    UsuarioComponent,
    NominaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RuteoModule,
    HttpModule,
    AuthModule
  ],
  providers: [
    HttpService,
    AuthGuard,
    ActualizacionusuarioService,
    RutasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }