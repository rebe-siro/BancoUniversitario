function mostrarMensaje() {
    const saludo = document.getElementById('saludo');
    saludo.textContent = '¡Gracias por visitar mi página!';
}


// FUNCIONES LOGIN

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
}


 
