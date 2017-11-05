<?php
require_once "AutentificadorJWT.php";
class consultaUsuario
{
    private static $objetoPDO;

    public function __construct()
    {
        try {
            /*MIPC*/ //self::$objetoPDO = new PDO('mysql:host=localhost;dbname=id2718207_bd;charset=utf8', 'root', '', array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            /*ONLINE*/ self::$objetoPDO = new PDO('mysql:host=localhost;dbname=id2718207_bd;charset=utf8', 'id2718207_elias', 'garbarino', array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        }
        catch (PDOException $e) {
            print "Error!: " . $e->getMessage();
            die();
        }
    }

    public static function Login($request, $response, $args) {
        $parametros = json_decode($request->getBody(), true);
        $consulta = self::$objetoPDO->prepare(
            "SELECT usuarios.*, resumenjugadas.puntos, resumenjugadas.jugadas, resumenjugadas.ganadas, resumenjugadas.perdidas
            FROM usuarios, resumenjugadas
            WHERE usuarios.email = :email
                AND usuarios.password = :password
                AND usuarios.id = resumenjugadas.jugadorId
                AND usuarios.habilitado = 1"
        );
        $consulta->bindValue(':email', $parametros['email'], PDO::PARAM_STR);
        $consulta->bindValue(':password', $parametros['password'], PDO::PARAM_STR);
        $consulta->execute();
        $usuario = $consulta->fetch(PDO::FETCH_ASSOC);
        if (!$usuario) {
            return $response->withJson(["respuesta" => 'Usuario inexistente']);
        }
        $usuario['token'] = AutentificadorJWT::CrearToken($usuario);
        return $response->withJson($usuario);
    }

    public static function Crear($request, $response) {
        try{
            $parametros = $request->getParams();
            //VERIFICACION CONTRA USUARIO DUPLICADO
            $consulta = self::$objetoPDO->prepare(
                "SELECT *
                FROM usuarios
                WHERE email = :email OR alias = :alias"
            );
            $consulta->bindValue(':email', $parametros['email'], PDO::PARAM_STR);
            $consulta->bindValue(':alias', $parametros['alias'], PDO::PARAM_STR);
            $consulta->execute();

            $usuario = $consulta->fetch(PDO::FETCH_ASSOC);
            if ($usuario) {
                return $response->withJson(["respuesta" => 'Email o alias ocupado']);
            }
            
            //IMAGEN-------------------------------------------------------
            //VALIDACION DEL TAMAÑO DE LA IMAGEN
            if ($_FILES['foto']['size'] > (1  * 1024 * 1024)) { //1MB
                return $response->withJson(["respuesta" => 'Cambie la imagen, solo se permiten tamaños imagenes de tamaño inferior a 1 MB']);
            }
            //VALIDACION DE TIPO DE IMAGEN MEDIANTE EL INTENTO DE PROCESARLA COMO IMAGEN, SI IMAGENINICIAL ES FALSE, FALLO LA VALIDACION
            else if(!($imagenInicial = imagecreatefromstring(file_get_contents($_FILES['foto']['tmp_name'])))) {
                return $response->withJson(["respuesta" => 'Cambie la imagen, sólo se permiten imágenes con extensión .jpg .jpeg .bmp .gif o .png']);
            }
            //---------------------------------------------------------------
            
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

            $idUsuario = self::$objetoPDO->lastInsertId();

            //CREACIÓN DEL RESUMEN DE JUGADAS
            $consulta = self::$objetoPDO->prepare(
                "INSERT INTO resumenjugadas (jugadorId, puntos, jugadas, ganadas, perdidas)
                VALUES (:jugadorId, 0, 0, 0, 0)"
            );
            $consulta->bindValue(':jugadorId', $idUsuario, PDO::PARAM_STR);
            $consulta->execute();

            //CREACIÓN DEL ROL
            $consulta = self::$objetoPDO->prepare(
                "INSERT INTO roles (idRol, idUsuario)
                VALUES (:idRol, :idUsuario)"
            );
            $consulta->bindValue(':idRol', $parametros['idRol'], PDO::PARAM_STR);
            $consulta->bindValue(':idUsuario', $idUsuario, PDO::PARAM_STR);
            $consulta->execute();
            
            //CONTINUACION DE CREACION DE IMAGEN-------------------------------------
            //OBTENCION DE LAS DIMENSIONES DE LA IMAGEN INICIAL
            $imagenInicialAncho = imagesx($imagenInicial);
            $imagenInicialAlto = imagesy($imagenInicial);
            //CREACION DE UNA IMAGEN VACIA CON LAS DIMENSIONES DE LA IMAGEN INCIAL
            $imagenFinal = imagecreatetruecolor($imagenInicialAncho, $imagenInicialAlto);
            //COPIA DE LA IMAGEN INCIAL EN LA FINAL
            imagecopy($imagenFinal, $imagenInicial, 0, 0, 0, 0, $imagenInicialAncho, $imagenInicialAlto);
            //LIBERACION DE LA MEMORIA DE LA IMAGEN INICIAL
            imagedestroy($imagenInicial);
            //GUARDADO DEFINITIVO DE LA IMAGEN EN EL SERVIDOR CONVIRTIENDOLA EN FORMATO PNG
            imagepng($imagenFinal, 'fotos/' . $idUsuario . '.png');
            //LIBERACION DE LA MEMORIA DE LA IMAGEN FINAL
            imagedestroy($imagenFinal);
            //-----------------------------------------------------------------------------
            return $response->withJson(true);
        }
        catch(Exception $e){
            return $response->withJson($e->getMessage());   
        }
    }

    public static function Leer($request, $response, $args) {
        $consulta = self::$objetoPDO->prepare(
            "SELECT usuarios.*, roles.idRol
            FROM usuarios, roles
            WHERE usuarios.id = :id
                AND roles.idUsuario = :id2"
        );
        $consulta->bindValue(':id', $args['id'], PDO::PARAM_INT);
        $consulta->bindValue(':id2', $args['id'], PDO::PARAM_INT);
		$consulta->execute();
        return $response->withJson($consulta->fetchAll(PDO::FETCH_ASSOC));
    }

    public static function LeerTodosOrdenado($request, $response, $args) {
        $consulta = self::$objetoPDO->prepare(
            "SELECT usuarios.*, roles.idRol, resumenjugadas.puntos, resumenjugadas.jugadas, resumenjugadas.ganadas, resumenjugadas.perdidas
            FROM usuarios, roles, resumenjugadas
            WHERE usuarios.id = roles.idUsuario
                AND usuarios.id = resumenjugadas.jugadorId
                AND usuarios.habilitado = 1
            ORDER BY " . $args['criterio'] . " " . $args['sentido']
        );
		$consulta->execute();
        return $response->withJson($consulta->fetchAll(PDO::FETCH_ASSOC));
    }

    public static function Actualizar($request, $response) {
        $parametros = $request->getParsedBody();
        //ACTUALIZACIÓN DEL USUARIO
        $consulta = self::$objetoPDO->prepare(
            "UPDATE usuarios
            SET nombre = :nombre, apellido = :apellido, email = :email, password = :password, alias = :alias, habilitado = :habilitado, puntos = :puntos
            WHERE id = :id"
        );
        $consulta->bindValue(':nombre', $parametros['nombre'], PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $parametros['apellido'], PDO::PARAM_STR);
        $consulta->bindValue(':email', $parametros['email'], PDO::PARAM_STR);
        $consulta->bindValue(':password', $parametros['password'], PDO::PARAM_STR);
        $consulta->bindValue(':alias', $parametros['alias'], PDO::PARAM_STR);
        $consulta->bindValue(':habilitado', $parametros['habilitado'], PDO::PARAM_INT);
        $consulta->bindValue(':puntos', $parametros['puntos'], PDO::PARAM_INT);
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
}