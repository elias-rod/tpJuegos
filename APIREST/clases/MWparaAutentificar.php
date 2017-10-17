<?php

require_once "AutentificadorJWT.php";
class MWparaAutentificar
{
 	/**
	* @api {any} /MWparaAutenticar/  Verificar Usuario
	* @apiVersion 0.1.0
	* @apiName VerificarUsuario
	* @apiGroup MIDDLEWARE
	* @apiDescription  Por medio de este MiddleWare verifico las credeciales antes de ingresar al correspondiente metodo 
	*
	* @apiParam {ServerRequestInterface} request  El objeto REQUEST.
 	* @apiParam {ResponseInterface} response El objeto RESPONSE.
	* @apiParam {Callable} next  The next middleware callable.
	*
	* @apiExample Como usarlo:
	*    ->add(\MWparaAutenticar::class . ':VerificarUsuario')
	*/
	public function VerificarUsuario($request, $response, $next) {
		$operacion = $request->getParsedBody()['operacion'];
		$token = $request->getParsedBody()['token'];
		$permitido = false;
		$permisos = [
			'usuarios' => [
				1 => [//administrador
					'get' => true,
					'post' => true,
					'put' => true,
					'delete' => true
				],
				2 => [//comprador
					'get' => true,
					'post' => false,
					'put' => false,
					'delete' => false
				],
				3 => [//vendedor
					'get' => true,
					'post' => true,
					'put' => true,
					'delete' => false
				]
			]
		];

		try
		{
			AutentificadorJWT::VerificarToken($token);
			$idRol = AutentificadorJWT::ObtenerData($token)->idRol;
		}

		catch (Exception $e) {
			return $response->withJson($e->getMessage());
		}

		switch ($request->getMethod()) {
			case 'GET':
				if($permisos[$operacion][$idRol]['get']){
					$permitido = true;
					$response = $next($request, $response);
				}
				break;
			case 'POST':
				if($permisos[$operacion][$idRol]['post']){
					$permitido = true;
					$response = $next($request, $response);
				}
				break;
			case 'PUT':
				if($permisos[$operacion][$idRol]['put']){
					$permitido = true;
					$response = $next($request, $response);
				}
				break;
			case 'DELETE':
				if($permisos[$operacion][$idRol]['delete']){
					$permitido = true;
					$response = $next($request, $response);
				}
				break;
			default:
				return $response->withJson('La operación que desea realizar no está contemplada.');
		}
		if(!$permitido){
			return $response->withJson('No tiene permiso para realizar esta operación');
		}
		return $response;
	}
}

		/*
		PARA CREAR TOKEN

		$parametros = $request->getParsedBody();
		$datos = array(//Se excluye la contraseña
			'id' => $parametros['id'],
			'nombre' => $parametros['nombre'],
			'apellido' => $parametros['apellido'],
			'email' => $parametros['email'],
			'alias' => $parametros['alias'],
			'habilitado' => $parametros['habilitado'],
			'idRol' => $parametros['idRol']
		);
		$token = AutentificadorJWT::CrearToken($datos);

		//tomo el token del header
			$arrayConToken = $request->getHeader('token');
			$token=$arrayConToken[0];
		*/