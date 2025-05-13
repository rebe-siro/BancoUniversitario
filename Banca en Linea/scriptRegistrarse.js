document.getElementById('registro-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Limpia todos los campos del formulario
    document.getElementById('nombreCompleto').value = '';
    document.getElementById('universidad').selectedIndex = 0;
    document.getElementById('correo').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('usuario').value = '';
    document.getElementById('contrasena').value = '';
  });
  
  document.getElementById('limpiar').addEventListener('click', function () {
    document.getElementById('nombreCompleto').value = '';
    document.getElementById('universidad').selectedIndex = 0;
    document.getElementById('correo').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('usuario').value = '';
    document.getElementById('contrasena').value = '';
  });