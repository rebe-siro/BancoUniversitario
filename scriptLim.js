document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los acordeones
    const acordeones = document.querySelectorAll('.transferencias-container');
    
    // Configurar cada acordeon
    acordeones.forEach(acordeon => {
        const boton = acordeon.querySelector('.acordeon-principal');
        const contenido = acordeon.querySelector('.contenido-desplegable');
        const icono = acordeon.querySelector('.acordeon-icono');
        
        // Función para alternar el acordeón
        const toggleAcordeon = () => {
            const estaAbierto = contenido.classList.contains('mostrar');
            
            // Cerrar otros acordeones al abrir uno nuevo
            if (!estaAbierto) {
                document.querySelectorAll('.contenido-desplegable.mostrar').forEach(abierto => {
                    if (abierto !== contenido) {
                        abierto.style.maxHeight = '0';
                        abierto.classList.remove('mostrar');
                        abierto.previousElementSibling.querySelector('.acordeon-icono').textContent = '+';
                    }
                });
            }
            
            // Alternar estado actual
            contenido.classList.toggle('mostrar');
            icono.textContent = estaAbierto ? '+' : '−';
            contenido.style.maxHeight = estaAbierto ? '0' : contenido.scrollHeight + 'px';
        };
        
        // Evento click
        boton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleAcordeon();
        });
        
        // Inicializar cerrados
        contenido.style.maxHeight = '0';
    });
    
    // Cerrar al hacer click fuera (opcional)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.transferencias-container')) {
            document.querySelectorAll('.contenido-desplegable.mostrar').forEach(abierto => {
                abierto.style.maxHeight = '0';
                abierto.classList.remove('mostrar');
                abierto.previousElementSibling.querySelector('.acordeon-icono').textContent = '+';
            });
        }
    });
});