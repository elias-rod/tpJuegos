<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './composer/vendor/autoload.php';
require_once './clases/consultaUsuario.php';
require_once './clases/consultaJugada.php';
require_once './clases/AutentificadorJWT.php';
require_once './clases/MWparaCORS.php';
require_once './clases/MWparaAutentificar.php';

$app = new Slim\App([
  "settings"  => [
      "displayErrorDetails" => true
  ]
]);

$app->add(function ($req, $res, $next) {
  $response = $next($req, $res);
  return $response
          ->withHeader('Access-Control-Allow-Origin', '*')
          ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
          ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

//Usuarios
$app->post('/consultaUsuarios/login', \consultaUsuario::class . ':Login');
$app->post('/consultaUsuarios/crear', \consultaUsuario::class . ':Crear');
$app->get('/consultaUsuarios/leer/{id}', \consultaUsuario::class . ':Leer');
$app->get('/consultaUsuarios/leerTodos', \consultaUsuario::class . ':LeerTodos');
$app->get('/consultaUsuarios/leerTodos/{criterio}/{sentido}', \consultaUsuario::class . ':LeerTodosOrdenado');
$app->post('/consultaUsuarios/actualizar', \consultaUsuario::class . ':Actualizar');
//Jugadas
$app->post('/consultaJugadas/crear', \consultaJugada::class . ':Crear');
$app->get('/consultaJugadas/leerTodos/{criterio}', \consultaJugada::class . ':LeerTodosFiltrado');
/*
$app->group('/consultaJugadas', function() {
  $this->post('/crear', \consultaJugada::class . ':Crear');
  $this->get('/leerTodos/{criterio}', \consultaJugada::class . ':LeerTodosFiltrado');
})->add(\MWparaAutentificar::class . ':VerificarUsuario')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
*/
$app->run();