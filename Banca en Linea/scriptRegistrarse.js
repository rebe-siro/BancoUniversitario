$(document).ready(function() {
    $('#registro-form').on('submit', function(e) {
        e.preventDefault();

        const first_name = $('#first_name').val().trim();
        const last_name = $('#last_name').val().trim();
        const document_number = $('#documento').val().trim();
        const birth_date_raw = $('#fechaNacimiento').val();
        const birth_date = birth_date_raw ? `${birth_date_raw}T00:00:00Z` : "";
        const phone_number = $('#telefono').val().trim();
        const email = $('#correo').val().trim();
        const password = $('#contrasena').val();

        $.ajax({
            url: 'http://localhost:3000/v1/public/client/user/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                first_name,
                last_name,
                document_number,
                birth_date,
                phone_number,
                email,
                password
            }),
            success: function(data) {
                console.log(data);
                if (data.message === "OK") {
                    alert('¡Registro exitoso!');
                } else {
                    alert('Error en el registro: ' + (data.message || ''));
                }
            },
            error: function(xhr) {
                let msg = 'Error al registrar usuario.';
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    msg += '\n' + xhr.responseJSON.message;
                }
                alert(msg);
                console.error('Register error:', xhr.responseText);
            }
        });
    });
});


/*document.getElementById('registro-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const first_name = document.getElementById('first_name').value.trim();
    const last_name = document.getElementById('last_name').value.trim();
    const document_number = document.getElementById('documento').value.trim();
    const birth_date = document.getElementById('fechaNacimiento').value;
    const phone_number = document.getElementById('telefono').value.trim();
    const email = document.getElementById('correo').value.trim();
    const password = document.getElementById('contrasena').value;

    fetch('http://localhost:3000/v1/public/client/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            first_name,
            last_name,
            document_number,
            birth_date,
            phone_number,
            email,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.message === "OK") {
            alert('¡Registro exitoso!');
        } else {
            alert('Error en el registro: ' + (data.message || ''));
        }
    })
    .catch(error => {
        alert('Error al registrar usuario.');
        console.error('Register error:', error);
    });
}); */
document.getElementById('registro-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Limpia todos los campos del formulario
  document.getElementById('nombreCompleto').value = '';
  document.getElementById('universidad').selectedIndex = 0;
  document.getElementById('correo').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('usuario').value = '';
  document.getElementById('contrasena').value = '';

  // Mostrar el modal de confirmación
  document.getElementById('modalRegistro').style.display = 'flex';
});

document.getElementById('limpiar').addEventListener('click', function () {
  document.getElementById('nombreCompleto').value = '';
  document.getElementById('universidad').selectedIndex = 0;
  document.getElementById('correo').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('usuario').value = '';
  document.getElementById('contrasena').value = '';
});

// Lógica de los botones del modal
document.getElementById('permanecerBtn').addEventListener('click', function () {
  document.getElementById('modalRegistro').style.display = 'none';
});

document.getElementById('volverBtn').addEventListener('click', function () {
  window.location.href = '../Login.html';
});
