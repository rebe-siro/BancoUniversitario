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
                    alert((data.message || ''));
                }
            },
            error: function(xhr) {
                    let msg = 'Error al registrar usuario.';
                    if (xhr.responseJSON.message.toLowerCase().includes('éxito') || xhr.responseJSON.message.toLowerCase().includes('exito')) {
                        msg += '\n' + xhr.responseJSON.message;
                        // Workaround: treat as success if message indicates success
                        if (xhr.responseJSON.message.toLowerCase().includes('exito')) {
                            alert('¡Registro exitoso!');
                            return;
                        }
                    }
                    alert(msg);
                    console.error('Register error:', xhr.responseText);
                    console.error('Status:', xhr.status);
                    console.error('XHR object:', xhr);
            }
        });
    });
});



