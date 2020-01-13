eventListeners();
// Lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners() {
    // Boton para crear proyectos
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

    // Boton para nueva tarea
    document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);

    // Botones para las acciones de las tareas
    document.querySelector('.listado-pendientes').addEventListener('click', accionesTareas);
}

function nuevoProyecto(e) {
    e.preventDefault();
    console.log('Presionaste en nuevo proyecto');

    // Crea un input para el nombre del nuevo proyecto
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);

    // Selecionar el ID con el nuevoProyecto
    var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

    // Al presionar ENTER crear el proyecto
    inputNuevoProyecto.addEventListener('keypress', function(e) {
        // wiich o keycode es el codigo de las teclas
        var tecla = e.which || e.keyCode;

        if (tecla === 13) {
            guardarProyectoDB(inputNuevoProyecto.value);
            // removemos el input creado
            listaProyectos.removeChild(nuevoProyecto);
        }
    });
}

function guardarProyectoDB(nombreProyecto) {
    //  Crear llamado AJAX
    var xhr = new XMLHttpRequest();

    // Enviar datos por formdata
    var datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');

    // Abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);
    // En la carga
    xhr.onload = function() {
            if (this.status === 200) {
                // Obtener datos de la respuesta
                var respuesta = JSON.parse(xhr.responseText);
                var proyecto = respuesta.nombre_proyecto,
                    id_proyecto = respuesta.id_insertado,
                    tipo = respuesta.tipo,
                    resultado = respuesta.respuesta;

                // Comprobar la insercion
                if (resultado === 'correcto') {
                    // Fue exitoso
                    if (tipo === 'crear') {
                        // Se creo un nuevo proyecto
                        // Inyectar en el HTML
                        var nuevoProyecto = document.createElement('li');
                        nuevoProyecto.innerHTML = `
                            <a href="index.php?id_proyecto=${id_proyecto}" id="proyecto:${id_proyecto}">
                                ${proyecto}
                            </a>
                        `;
                        // Agregar al HTML
                        listaProyectos.appendChild(nuevoProyecto);

                        // Enviar alerta
                        swal({
                                title: 'Proyecto Creado',
                                text: 'El proyecto: ' + proyecto + ' se creó correctamente',
                                type: 'success'
                            })
                            .then(resultado => {
                                // Redireccionar a la nueva URL
                                if (resultado.value) {
                                    window.location.href = 'index.php?id_proyecto=' + id_proyecto;
                                }
                            })

                    } else {
                        // Se actualizo o se elimino
                    }
                } else {
                    // Hubo un error
                    swal({
                        title: 'Error',
                        text: 'Hubo un error',
                        type: 'error'
                    });
                }
            }
        }
        // Enviar el request
    xhr.send(datos);
}

// Agregar una nueva tarea al proyecto actual
function agregarTarea(e) {
    e.preventDefault();

    var nombreTarea = document.querySelector('.nombre-tarea').value;

    // Validar que el campo tenga algo escrito
    if (nombreTarea === '') {
        swal({
            title: 'Error',
            text: 'Una tarea no puede estar vacia',
            type: 'error'
        });
    } else {
        // La tarea tiene algo, insertar PHP

        // Crear el llamado AJAX
        var xhr = new XMLHttpRequest();

        // crear el formdata
        var datos = new FormData();
        datos.append('tarea', nombreTarea);
        datos.append('accion', 'crear');
        datos.append('id_proyecto', document.querySelector('#id_proyecto').value);

        // Abrir la conexion
        xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);

        // Ejecutarlo y respuesta
        xhr.onload = function() {
            if (this.status === 200) {

                // Todo correcto
                var respuesta = JSON.parse(xhr.responseText);

                // Asignar valores
                var resultado = respuesta.respuesta,
                    tarea = respuesta.tarea,
                    id_insertado = respuesta.id_insertado,
                    tipo = respuesta.tipo;

                if (resultado === 'correcto') {
                    // Se agregó correctamente
                    if (tipo === 'crear') {
                        // Lanzar la alerta
                        swal({
                            title: 'Tarea Creada',
                            text: 'La tarea: ' + tarea + ' se creo correctamente',
                            type: 'success'
                        });

                        // Contruir el template
                        var nuevaTarea = document.createElement('li');

                        // Agregamos el ID
                        nuevaTarea.id = 'tarea' + id_insertado;

                        // Agregar la clase tarea
                        nuevaTarea.classList.add('tarea');

                        // Contruir el HTML
                        nuevaTarea.innerHTML = `
                            <p>${tarea}</p>
                            <div class="acciones">
                                <i class="far fa-check-circle"></i>
                                <i class="fas fa-trash"></i>
                            <div>
                        `;

                        // Agregarlo al HTML
                        var listado = document.querySelector('.listado-pendientes ul');
                        listado.appendChild(nuevaTarea);

                        // Limpiar formulario
                        document.querySelector('.agregar-tarea').reset();
                    }
                } else {
                    // Hubo un error
                    swal({
                        title: 'Error',
                        text: 'Hubo un error',
                        type: 'error'
                    });
                }
            }
        }

        // Enviar la consulta
        xhr.send(datos);
    }

}

// Cambia el estado de las tareas o las elimina
function accionesTareas(e) {
    e.preventDefault();

    if (e.target.classList.contains('fa-check-circle')) {
        console.log('Hiciste click en el circulo');
    }

    if (e.target.classList.contains('fa-trash')) {
        console.log('Hiciste click en el icono de borrar');
    }
}