import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../servicios/http.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
registroForm: FormGroup;
  rutaAPI: string = "https://tp2017utn.000webhostapp.com/index.php/consultaUsuarios/crear";
  mensajeError: string;
  spinner: boolean;

  constructor(
  private formBuilder:FormBuilder,
  public HttpService: HttpService,
  private router: Router) {
    this.registroForm = this.formBuilder.group({
      'nombre': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]+$/)])],
      'apellido': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]+$/)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'password': [null, Validators.compose([Validators.required])],
      'alias': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9]+$/i)])]
    });
    this.mensajeError = null;
  }

  ngOnInit() {}

  registrar(){
    if(this.registroForm.controls['nombre'].valid == false){
      this.mensajeError = 'El nombre es obligatorio y debe contener solo letras';
      return;
    }
    else if(this.registroForm.controls['apellido'].valid == false){
      this.mensajeError = 'El apellido es obligatorio y debe contener solo letras';
      return;
    }
    else if(this.registroForm.controls['email'].valid == false){
      this.mensajeError = 'El email es obligatorio y debe tener un formato xxx@xxx.xxx';
      return;
    }
    else if(this.registroForm.controls['password'].valid == false){
      this.mensajeError = 'La contraseña es obligatoria';
      return;
    }
    else if(this.registroForm.controls['alias'].valid == false){
      this.mensajeError = 'El alias es obligatoria y solo debe contener letras y/o numeros';
      return;
    }
    this.spinner = true;
    var formData = new FormData();//borrar si no funciona
    formData.append('foto', $('#foto')[0].files[0]);
    formData.append('nombre', this.registroForm.value.nombre);
    formData.append('apellido', this.registroForm.value.apellido);
    formData.append('email', this.registroForm.value.email);
    formData.append('password', this.registroForm.value.password);
    formData.append('alias', this.registroForm.value.alias);
    formData.append('idRol', '2');
    this.HttpService.crear(this.rutaAPI, formData)
    .then(datos => {
      console.log(datos);
      this.spinner = false;
      if(datos == true){
        this.router.navigate(['login']);
      }
      else{
        this.mensajeError = datos.respuesta;
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
}