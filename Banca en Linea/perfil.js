document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const passwordModal = document.getElementById('passwordModal');
    const passwordForm = document.getElementById('passwordForm');
    const cancelPasswordChange = document.getElementById('cancelPasswordChange');
    const closeModalBtn = document.querySelector('.close-modal');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    
    // Datos de prueba (simulados)
    const currentUserPassword = "M1ll3rA2023"; // Contraseña inventada
    
    // Mostrar modal para cambiar contraseña
    changePasswordBtn.addEventListener('click', function() {
        passwordModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar modal
    function closePasswordModal() {
        passwordModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        passwordForm.reset();
    }
    
    // Eventos para cerrar el modal
    cancelPasswordChange.addEventListener('click', closePasswordModal);
    closeModalBtn.addEventListener('click', closePasswordModal);
    
    // Cerrar al hacer clic fuera del modal
    passwordModal.addEventListener('click', function(e) {
        if (e.target === passwordModal) {
            closePasswordModal();
        }
    });
    
    // Cerrar con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && passwordModal.style.display === 'flex') {
            closePasswordModal();
        }
    });
    
    // Alternar visibilidad de contraseña
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // Validar y procesar cambio de contraseña
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validaciones
        if (currentPassword !== currentUserPassword) {
            alert('La contraseña actual no es correcta');
            return;
        }
        
        if (newPassword.length < 8) {
            alert('La nueva contraseña debe tener al menos 8 caracteres');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('Las nuevas contraseñas no coinciden');
            return;
        }
        
        if (newPassword === currentUserPassword) {
            alert('La nueva contraseña debe ser diferente a la actual');
            return;
        }
        
        // Simular cambio de contraseña (AJAX)
        setTimeout(() => {
            // En una implementación real, aquí actualizarías la contraseña en el backend
            alert('Contraseña actualizada con éxito');
            
            // Mostrar la nueva contraseña (solo para demostración)
            document.querySelector('.password-value').textContent = newPassword;
            
            // Cerrar el modal
            closePasswordModal();
        }, 1000);
    });
    
    // API AJAX
    /*
    function changePasswordAPI(currentPass, newPass, callback) {
        $.ajax({
            url: '/api/change-password',
            method: 'POST',
            data: {
                currentPassword: currentPass,
                newPassword: newPass
            },
            success: function(response) {
                callback(true, response.message);
            },
            error: function(xhr) {
                callback(false, xhr.responseJSON?.message || 'Error al cambiar la contraseña');
            }
        });
    }
    */
});