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
            'error'=>$e->getMessage()
        );
    }

    echo json_encode($respuesta);
}



if($accion==='login'){
    // Escribir codigo para loguee a los administradores

    // Importamos la conexion
    include '../funciones/conexion.php';
    try {
        // Seleccionar el adminsitrador de la base de datos
        $stmt=$conn->prepare("SELECT usuario, id, password FROM usuarios WHERE usuario = ?" );
        $stmt->bind_param('s', $usuario);
        $stmt->execute();
        // Loguear el usuario
        $stmt->bind_result($nombre_usuario, $id_usuario, $pass_usuario);
        $stmt->fetch();
        // $password es la contraseña que escribe el usuario
        // $pass_usuario es el passward hasheado
        if (password_verify($password, $pass_usuario)) {
            // Iniciar la sesion
            session_start();
            $_SESSION['nombre']=$usuario;
            $_SESSION['id']=$id_usuario;
            $_SESSION['login']=true;
            // Login correcto
            // Si existe el usuario entra en el if
            $respuesta=array(
                'respuesta'=>'correcto',
                'nombre'=>$nombre_usuario,
                'tipo'=>$accion
            );
        }
        else{
            // Login incorrecto, enviar error
            $respuesta=array(
                'resultado'=>'Password Incorrecto'
            );
        }
        
        // }
        // else{
        //     $respuesta=array(
        //         'error'=>'Usuario no existe'
        //     );
        // }
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        // En caso de un error, tomar la exception
        $respuesta=array(
            'pass'=>$e->getMessage()
        );
    }
    echo json_encode($respuesta);
}
?>