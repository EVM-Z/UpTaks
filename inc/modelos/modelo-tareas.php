<?php

$accion=$_POST['accion'];
$id_proyecto=(int)$_POST['id_proyecto'];
$tarea=$_POST['tarea'];

if($accion==='crear'){
    // Importar la conexion
    include '../funciones/conexion.php';

    try{
        // Realizar la consulta a la base de datos
        $stmt=$conn->prepare("INSERT INTO tareas (nombre, id_proyecto) VALUES (?, ?) ");
        // Vamos a ingresar dos strign
        $stmt->bind_param('si', $tarea, $id_proyecto);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respuesta=array(
                'respuesta'=>'correcto',
                'id_insertado'=>$stmt->insert_id,
                'tipo'=>$accion,
                'tarea'=>$tarea
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