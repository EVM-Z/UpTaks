eventListeners();

function eventListeners() {
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
    e.preventDefault();
    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value;

    if (usuario === '' || password === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Ambos campos son obligatorios'
        })
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Escribiste ambos campos'
        })
    }
}