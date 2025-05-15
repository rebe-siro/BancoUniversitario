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