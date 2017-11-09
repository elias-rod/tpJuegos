import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../servicios/http.service';
import { Router } from '@angular/router';

import { RutasService } from '../../servicios/rutas.service';
declare var $: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  mensajeError: string;
  spinner: boolean;

  constructor(
  private formBuilder:FormBuilder,
  public HttpService: HttpService,
  private router: Router,
  public RutasService: RutasService) {
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

  previsualizarFoto(){
    //VERIFICACION DE VALIDACION
    if(!this.validarFoto()){
      $("#fotoPrevia").attr('src', null);
      return;
    }
    //1)CREACION DEL OBJETO QUE LEE EL ARCHIVO
    var miLector = new FileReader();
    //3)SETEO DE LA FUNCION QUE SE EJECUTARA AL FINALIZAR LA LECTURA
    miLector.onload = function() {
      $("#fotoPrevia").attr('src', miLector.result);
    }
    //2)LECTURA DEL ARCHIVO Y ALMACENAMIENTO COMO URL EN LA PROPIEDAD "RESULT"
    miLector.readAsDataURL($('#foto')[0].files[0]);
  }
  //VALIDACION DE FOTO PREVISUALIZADA EN EXTENSION Y TAMAÑO
  validarFoto(){
    //OBTENCION DE LA FOTO SELECCIONADA
    var archivo = $('#foto')[0].files[0];
    //EXPRESION REGULAR QUE EVALUA LA PRESENCIA DE CUALQUIERA DE LOS FORMATOS ACEPTADOS
    var re = /(\.jpg|\.jpeg|\.png|\.bmp|\.gif)$/i;
    //VERIFICACION DEL TIPO DE ARCHIVO
    if(!re.exec(archivo.name))
    {
      this.mensajeError = "Cambie la imagen, sólo se permiten imágenes con extensión .jpg .jpeg .bmp .gif o .png";
      return false;
    }
    //VERIFICACION DEL TAMAÑO DEL ARCHIVO
    if(archivo.size > (9 /*1MB*/ * 1024 * 1024)) {//La propiedad size devuelve el tamaño en bytes. Multiplicacion de los mb deseados por 1024 para convertir a bytes
      this.mensajeError = "Cambie la imagen, solo se permiten tamaños imagenes de tamaño inferior a 1 MB";
      return false;
    }
    return true;
  }

  registrar(){
    if($("#foto").val() == ''){
      this.mensajeError = 'Debe seleccionar una foto';
      return;
    }
    else if(this.registroForm.controls['nombre'].valid == false){
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
    this.HttpService.crear(this.RutasService.rutaAPI + "consultaUsuarios/crear", formData)
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