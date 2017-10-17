<?php
require_once './clases/AutentificadorJWT.php';

class Usuario
{
    private static $objetoPDO;

    public function __construct()
    {
        try {
            /*MIPC*/ self::$objetoPDO = new PDO('mysql:host=localhost;dbname=usuarios;charset=utf8', 'root', '', array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            /*ONLINE*/ //self::$objetoPDO = new PDO('mysql:host=localhost;dbname=id2718207_bd;charset=utf8', 'id2718207_elias', 'garbarino', array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        }
        catch (PDOException $e) {
            print "Error!: " . $e->getMessage();
            die();
        }
    }

    public static function Crear($request, $response) {
        try{
            $parametros = $request->getParsedBody();
            //CREACIÓN DEL USUARIO
            $consulta = self::$objetoPDO->prepare(
                "INSERT INTO usuarios (nombre, apellido, email, password, alias, habilitado)
                VALUES (:nombre, :apellido, :email, :password, :alias, 1)"
            );
            $consulta->bindValue(':nombre', $parametros['nombre'], PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $parametros['apellido'], PDO::PARAM_STR);
            $consulta->bindValue(':email', $parametros['email'], PDO::PARAM_STR);
            $consulta->bindValue(':password', $parametros['password'], PDO::PARAM_STR);
            $consulta->bindValue(':alias', $parametros['alias'], PDO::PARAM_STR);
            $consulta->execute();

            //CREACIÓN DEL ROL
            $consulta = self::$objetoPDO->prepare(
                "INSERT INTO roles (idRol, idUsuario)
                VALUES (:idRol, :idUsuario)"
            );
            $consulta->bindValue(':idRol', $parametros['idRol'], PDO::PARAM_STR);
            $consulta->bindValue(':idUsuario', self::$objetoPDO->lastInsertId(), PDO::PARAM_STR);
            $consulta->execute();

            return $response->withJson(true);
        }
        catch(Exception $e){
            if($e->getCode() === '23000'){
                return $response->withJson('Usuario con e-mail duplicado.');
            }
            else{
                return $response->withJson($e->getMessage());   
            }
        }
    }

    public static function Leer($request, $response) {
        $parametros = $request->getParsedBody();
        $consulta = self::$objetoPDO->prepare(
            "SELECT usuarios.*, roles.idRol
            FROM usuarios, roles
            WHERE usuarios.id = :id
                AND roles.idUsuario = :id2"
        );
        $consulta->bindValue(':id', $parametros['id'], PDO::PARAM_INT);
        $consulta->bindValue(':id2', $parametros['id'], PDO::PARAM_INT);
		$consulta->execute();
        return $response->withJson($consulta->fetchAll(PDO::FETCH_ASSOC));
    }

    public static function LeerTodos($request, $response) {
        $consulta = self::$objetoPDO->prepare(
            "SELECT usuarios.*, roles.idRol
            FROM usuarios, roles
            WHERE usuarios.id = roles.idUsuario
            ORDER BY usuarios.apellido, usuarios.nombre"
        );
		$consulta->execute();
        return $response->withJson($consulta->fetchAll(PDO::FETCH_ASSOC));
    }

    public static function Actualizar($request, $response) {
        $parametros = $request->getParsedBody();
        //ACTUALIZACIÓN DEL USUARIO
        $consulta = self::$Leer->prepare(
            "UPDATE usuarios
            SET nombre = :nombre, apellido = :apellido, email = :email, password = :password, alias = :alias, habilitado = :habilitado
            WHERE id = :id"
        );
        $consulta->bindValue(':nombre', $parametros['nombre'], PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $parametros['apellido'], PDO::PARAM_STR);
        $consulta->bindValue(':email', $parametros['email'], PDO::PARAM_STR);
        $consulta->bindValue(':password', $parametros['password'], PDO::PARAM_STR);
        $consulta->bindValue(':alias', $parametros['alias'], PDO::PARAM_STR);
        $consulta->bindValue(':habilitado', $parametros['habilitado'], PDO::PARAM_INT);
        $consulta->bindValue(':id', $parametros['id'], PDO::PARAM_INT);
        $consulta->execute();

        //ACTUALIZACIÓN DEL ROL
        $consulta = self::$objetoPDO->prepare(
            "UPDATE roles
            SET idRol = :idRol
            WHERE idUsuario = :id"
        );
        $consulta->bindValue(':idRol', $parametros['idRol'], PDO::PARAM_INT);
        $consulta->bindValue(':id', $parametros['id'], PDO::PARAM_INT);
        $consulta->execute();
        
        return $response->withJson(true);
    }

    public static function Loguear($request, $response) {
        $parametros = $request->getParsedBody();
        $consulta = self::$objetoPDO->prepare(
            "SELECT usuarios.*, roles.idRol
            FROM usuarios, roles
            WHERE usuarios.email = :email
                AND usuarios.password = :password
                AND usuarios.id = roles.idUsuario"
        );
        $consulta->bindValue(':email', $parametros['email'], PDO::PARAM_STR);
        $consulta->bindValue(':password', $parametros['password'], PDO::PARAM_STR);
        $consulta->execute();
        return $response->withJson(AutentificadorJWT::CrearToken($consulta->fetch(PDO::FETCH_ASSOC)));
    }
}