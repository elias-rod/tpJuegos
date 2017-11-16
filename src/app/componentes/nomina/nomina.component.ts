import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HttpService } from '../../servicios/http.service';
import { SpinnerComponent } from '../spinner/spinner.component';

import { RutasService } from '../../servicios/rutas.service';

declare var $: any;

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css']
})
export class NominaComponent implements OnInit {
  usuarios: Array<any>;
  copiaUsuarios: Array<any>;
  random: number;
  usuario: object;
  spinner: boolean;
  mensajeError: string;
  jugadorActual;
  mostrarConfirmacion: boolean = false;
  registroForm: FormGroup;
  filtroForm: FormGroup;
  ordenes: object = {};

  constructor(
    public HttpService: HttpService,
    public RutasService: RutasService,
    private formBuilder:FormBuilder) {
    this.leerTodos();
    this.random = Math.random();

    this.filtroForm = this.formBuilder.group({
      'id': null,
      'nombre': null,
      'apellido': null,
      'email': null,
      'password': null,
      'alias': null
    });

    this.registroForm = this.formBuilder.group({
      'nombre': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]+$/)])],
      'apellido': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]+$/)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'password': [null, Validators.compose([Validators.required])],
      'alias': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9]+$/i)])]
    });
    this.mensajeError = null;
  }

  ngOnInit() {
  }

  leerTodos(){
    this.spinner = true;
    this.HttpService.leerTodos(this.RutasService.rutaAPI + "consultaUsuarios/")
    .then(datos => {
      this.spinner = false;
      this.usuarios = this.copiaUsuarios = datos;
      this.random = Math.random();
      //Restablece los ordenes
      for (var key in this.filtroForm.controls) {
        this.ordenes[key] = true;
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  cargarUsuario(usuarioId){
    this.spinner = true;
    this.HttpService.leer(this.RutasService.rutaAPI + "consultaUsuarios/leer/", usuarioId)
    .then(datos => {
      this.spinner = false;
      this.jugadorActual = datos;
      this.registroForm.patchValue(this.jugadorActual);
      $("#fotoPrevia").attr('src', this.RutasService.rutaFotosUsuarios + this.jugadorActual.id + '.png?random=' + this.random);
    });
  }

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

  actualizar(habilitado){
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
    
    var formData = new FormData();
    //Si hay foto, agregarla al formData
    if($("#foto").val() !== ''){
      formData.append('foto', $('#foto')[0].files[0]);
    }
    formData.append('nombre', this.registroForm.value.nombre);
    formData.append('apellido', this.registroForm.value.apellido);
    formData.append('email', this.registroForm.value.email);
    formData.append('password', this.registroForm.value.password);
    formData.append('alias', this.registroForm.value.alias);
    formData.append('habilitado', habilitado);
    formData.append('id', this.jugadorActual.id.toString());
    this.spinner = true;
    this.HttpService.crear(this.RutasService.rutaAPI + "consultaUsuarios/actualizar", formData)
    .then(datos => {
      this.spinner = false;
      if(datos == true){
        this.leerTodos();
      }
      this.mensajeError = datos.error;
    })
    .catch(error => {
      console.log(error);
    });
  }

  filtrar(columna){
    this.usuarios = this.copiaUsuarios.filter(
      function(objeto){
        if(objeto[columna].toString().toLowerCase().includes(this.filtroForm.controls[columna].value.toString().toLowerCase())){
          return true;
        }
        else{
          return false;
        }
      }, this
    );
  }

  ordenar(criterio){
    function comparacion(a,b){
      return a[criterio].toString().localeCompare(b[criterio].toString(), undefined, { numeric: true, sensitivity: 'base' });
    }
    if (this.ordenes[criterio]) {
      this.usuarios = this.copiaUsuarios.sort(comparacion);
    }
    else{
      this.usuarios = this.copiaUsuarios.sort(comparacion).reverse();
    }
    this.ordenes[criterio] = !this.ordenes[criterio];
  }
}