<?php
$accion=$_POST['accion'];
$password=$_POST['password'];
$usuario=$_POST['usuario'];

if($accion==='crear'){
    // Codigo para crear los administradores
    // Hashear password
    $opciones=array(
        'cost'=>12
    );
    // password_hash encripta el password en un cadena de 60 caracteres
    $hash_password=password_hash($password, PASSWORD_BCRYPT, $opciones);

    // Importar la conexion
    include '../funciones/conexion.php';

    try{
        // Realizar la consulta a la base de datos
        $stmt=$conn->prepare("INSERT INTO usuarios (usuario, password) VALUES (?, ?) ");
        // Vamos a ingresar dos strign
        $stmt->bind_param('ss', $usuario, $hash_password);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respuesta=array(
                'respuesta'=>'correcto',
                'id_insertado'=>$stmt->insert_id,
                'tipo'=>$accion
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
            'pass'=>$e->getMessage()
        );
    }

    echo json_encode($respuesta);

    
}
if($accion==='login'){
    // Escribir codigo para loguee a los administradores
}
?>