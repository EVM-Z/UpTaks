<?php

$accion=$_POST['accion'];
$id_tarea=(int) $_POST['id'];


if ($accion === 'eliminar') {
    // Importar la conexion
    include '../funciones/conexion.php';

    try{
        // Realizar la consulta a la base de datos
        $stmt=$conn->prepare("DELETE from tareas WHERE id = ?");
        // Vamos a ingresar dos strign
        $stmt->bind_param('i', $id_tarea);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respuesta=array(
                'respuesta'=>'correcto'
            );
        }
        else{
            $respuesta=array(
                'respuesta'=>'error'
            );
        }
        // Cerramos el stament
        $stmt->close();
        // Cerramos la conexion
        $conn->close();
    } catch(Exception $e){
        // En caso de error, tomar la exception
        $respuesta=array(
            'error'=>$e->getMessage()
        );
    }
    echo json_encode($respuesta);
    
}

?>