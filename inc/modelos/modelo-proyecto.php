<?php
$accion=$_POST['accion'];
$proyecto=$_POST['proyecto'];

if($accion==='crear'){
    // Importar la conexion
    include '../funciones/conexion.php';

    try{
        // Realizar la consulta a la base de datos
        $stmt=$conn->prepare("INSERT INTO proyectos (nombre) VALUES (?) ");
        // Vamos a ingresar dos strign
        $stmt->bind_param('s', $proyecto);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respuesta=array(
                'respuesta'=>'correcto',
                'id_insertado'=>$stmt->insert_id,
                'tipo'=>$accion,
                'nombre_proyecto'=>$proyecto
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