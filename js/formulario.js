eventListeners();

function eventListeners() {
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
    e.preventDefault();
    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;

    if (usuario === '' || password === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Ambos campos son obligatorios'
        })
    } else {
        // Ambos campos son correctos, mandar mensaje Ajax
        // Datos que se envian al servidor
        var datos = new FormData();
        datos.append('usuario', usuario);
        datos.append('password', password);
        datos.append('accion', tipo);

        // Crear el llamado Ajax
        var xhr = new XMLHttpRequest();
        // Abrir la conexion
        xhr.open('POST', 'inc/modelos/modelo-admin.php', true);
        // Retorno de datos
        xhr.onload = function() {
                // Si el llamado fue exitoso
                if (this.status === 200) {
                    // Convertimos en JSON en un objeto
                    console.log(JSON.parse(xhr.responseText));
                }
            }
            // Enviar la peticion
        xhr.send(datos);

    }
}