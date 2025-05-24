function mostrarMensaje() {
    const saludo = document.getElementById('saludo');
    saludo.textContent = '¡Gracias por visitar mi página!';
}


// FUNCIONES LOGIN
/*
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;
  
    if (usuario && contrasena) {
      alert(`¡Bienvenido, ${usuario}!`);
      // Redirigir a dashboard (simulado)
      // window.location.href = "dashboard.html";
    } else {
      alert('Por favor, completa todos los campos.');
    }

    clear()
  });
  
  // Opcional: Funcionalidad para "Olvidé contraseña" y "Registro"
  document.getElementById('olvide-contrasena').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Función en construcción: Recuperar contraseña');
  });

  function clear() {
    document.getElementById('usuario').value = '';
    document.getElementById('contrasena').value = '';
}*/

// FUNCIONES LOGINNN

$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        const email = $('#email').val().trim();
        const password = $('#password').val();

        if (email && password) {
            $.ajax({
                url: 'http://localhost:3000/v1/public/client/user/login',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    email: email,
                    password: password
                }),
                success: function(data) {
                    console.log(data);

                    // Log del token jwt
                    if (data.data) {
                        console.log("Token:", data.data.jwt);
                    }

                    if (
                        (data.message === "OK" || data.message === "Usuario logueado con éxito") &&
                        data.data && data.data.jwt
                    ) {
                        alert('¡Bienvenido!');
                        localStorage.setItem('token', data.data.jwt);
                        // Guarda el nombre del usuario para usos posteriores
                        localStorage.setItem('first_name', data.data.first_name || '');
                        localStorage.setItem('last_name', data.data.last_name || '');
                        window.location.href = "Banca en Linea/menu.html"
                    } else {
                        alert('Credenciales incorrectas.');
                    }
                },
                error: function(xhr) {
                    alert('Error al iniciar sesión.');
                    console.error('Login error:', xhr.responseText);
                }
            });
        } else {
            alert('Por favor, completa todos los campos.');
        }

        // Limpiar los campos del formulario
        $('#email').val('');
        $('#password').val('');
    });
});
 
