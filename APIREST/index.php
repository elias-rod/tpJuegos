<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './composer/vendor/autoload.php';
require_once './clases/usuario.php';
require_once './clases/AutentificadorJWT.php';
require_once './clases/MWparaCORS.php';
require_once './clases/MWparaAutentificar.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);


/*LLAMADA A METODOS DE INSTANCIA DE UNA CLASE*/
$app->group('/usuario', function() {
  $this->post('/crear', \Usuario::class . ':Crear');
  $this->post('/leer', \Usuario::class . ':Leer');
  $this->post('/leerTodos', \Usuario::class . ':LeerTodos');
  $this->put('/actualizar', \Usuario::class . ':Actualizar');
})->add(\MWparaAutentificar::class . ':VerificarUsuario')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->post('/usuario/loguear', \Usuario::class . ':Loguear')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->run();