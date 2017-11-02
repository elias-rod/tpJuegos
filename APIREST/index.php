<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './composer/vendor/autoload.php';
require_once './clases/consultaUsuario.php';
require_once './clases/consultaJugada.php';
require_once './clases/AutentificadorJWT.php';
require_once './clases/MWparaCORS.php';
require_once './clases/MWparaAutentificar.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);


/*LLAMADA A METODOS DE INSTANCIA DE UNA CLASE*/
$app->group('/consultaUsuarios', function() {
  $this->post('/crear', \consultaUsuario::class . ':Crear');
  $this->get('/leer/{id}', \consultaUsuario::class . ':Leer');
  $this->get('/leerTodos', \consultaUsuario::class . ':LeerTodos');
  $this->get('/leerTodos/{criterio}/{sentido}', \consultaUsuario::class . ':LeerTodosOrdenado');
  $this->post('/actualizar', \consultaUsuario::class . ':Actualizar');
})->add(\MWparaCORS::class . ':HabilitarCORSTodos');
//->add(\MWparaAutentificar::class . ':VerificarUsuario')//va primero que cors

$app->group('/consultaJugadas', function() {
  $this->post('/crear', \consultaJugada::class . ':Crear');
  $this->get('/leerTodos/{criterio}', \consultaJugada::class . ':LeerTodosFiltrado');
})->add(\MWparaAutentificar::class . ':VerificarUsuario')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->run();