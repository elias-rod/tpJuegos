<?php

class consultaJugada
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

    public static function Crear($request, $response) {
        try{
            $parametros = $request->getParsedBody();

            $consulta = self::$objetoPDO->prepare(
                "INSERT INTO jugadas (idUsuario, idJuego, fecha, hora, gano, puntos)
                VALUES (:idUsuario, :idJuego, :momento, :gano, :puntos)"
            );
            $consulta->bindValue(':idUsuario', $parametros['idUsuario'], PDO::PARAM_INT);
            $consulta->bindValue(':idJuego', $parametros['idJuego'], PDO::PARAM_INT);
            $consulta->bindValue(':momento', $parametros['momento'], PDO::PARAM_STR);
            $consulta->bindValue(':gano', $parametros['gano'], PDO::PARAM_INT);
            $consulta->bindValue(':puntos', $parametros['puntos'], PDO::PARAM_INT);
            $consulta->execute();

            return $response->withJson(true);
        }
        catch(Exception $e){
            return $response->withJson($e->getMessage());
        }
    }

    public static function LeerTodosFiltrado($request, $response, $args) {
        try{
            $consulta = self::$objetoPDO->prepare(
            "SELECT jugadas.*, juegos.nombre
            FROM jugadas, juegos
            WHERE jugadas.idUsuario = :idUsuario
                AND jugadas.idJuego = juegos.id
            ORDER BY jugadas.momento DESC"
        );
        $consulta->bindValue(':idUsuario', $args['criterio'], PDO::PARAM_INT);
		$consulta->execute();
        return $response->withJson($consulta->fetchAll(PDO::FETCH_ASSOC));
        }
        
        catch(Exception $e){
            return $response->withJson($e->getMessage());
        }
    }
}