$(document).ready(function() {
    const token = localStorage.getItem('token');

    // Obtener datos del perfil y llenar el HTML
    $.ajax({
        url: 'http://localhost:3000/v1/client/user/whoami',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(response) {
            // Ajusta estos campos según lo que devuelve tu backend
            const data = response.data;
            $('.profile-info .info-row:nth-child(1) .info-value').text(data.first_name || '');
            $('.profile-info .info-row:nth-child(2) .info-value').text(data.last_name || '');
            $('.profile-info .info-row:nth-child(3) .info-value').text(data.account_number || '');
            $('.profile-info .info-row:nth-child(4) .info-value').text(data.email || '');
            $('.profile-info .info-row:nth-child(5) .info-value').text(data.document_number || '');
            $('.profile-info .info-row:nth-child(6) .info-value').text(data.phone_number || '');
        },
        error: function(xhr) {
            alert('No se pudo cargar el perfil');
        }
    });

    // Mostrar modal para cambiar contraseña
    $('#changePasswordBtn').on('click', function() {
        $('#passwordModal').css('display', 'flex');
        $('body').css('overflow', 'hidden');
    });

    // Cerrar modal
    function closePasswordModal() {
        $('#passwordModal').hide();
        $('body').css('overflow', 'auto');
        $('#passwordForm')[0].reset();
    }

    $('#cancelPasswordChange, .close-modal').on('click', closePasswordModal);

    $('#passwordModal').on('click', function(e) {
        if (e.target === this) closePasswordModal();
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#passwordModal').css('display') === 'flex') {
            closePasswordModal();
        }
    });

    // Alternar visibilidad de contraseña
    $('.toggle-password').on('click', function() {
        const targetId = $(this).data('target');
        const input = $('#' + targetId);
        const type = input.attr('type') === 'password' ? 'text' : 'password';
        input.attr('type', type);
        $(this).toggleClass('fa-eye-slash');
    });

    // Cambiar contraseña por AJAX
    $('#passwordForm').on('submit', function(e) {
        e.preventDefault();

        const currentPassword = $('#currentPassword').val();
        const newPassword = $('#newPassword').val();
        const confirmPassword = $('#confirmPassword').val();

        if (newPassword.length < 8) {
            alert('La nueva contraseña debe tener al menos 8 caracteres');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('Las nuevas contraseñas no coinciden');
            return;
        }
        if (newPassword === currentPassword) {
            alert('La nueva contraseña debe ser diferente a la actual');
            return;
        }

        $.ajax({
            url: 'http://localhost:3000/v1/client/user/password',
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                password: currentPassword,
                new_password: newPassword
            }),
            success: function(response) {
                alert('Contraseña actualizada con éxito');
                closePasswordModal();
            },
            error: function(xhr) {
                alert(xhr.responseJSON?.message || 'Error al cambiar la contraseña');
            }
        });
    });
});