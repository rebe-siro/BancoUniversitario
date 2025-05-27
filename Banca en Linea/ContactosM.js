


 $(document).ready(function() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión primero.');
        window.location.href = '../Login.html';
        return;
    }


    // Botón flotante para abrir el modal de agregar contacto
    $('#addContactBtn').on('click', function() {
        $('#modalTitle').text('Agregar Nuevo Contacto');
        $('#contactForm')[0].reset();
        $('#contactId').val('');
        $('#contactModal').show();
        $('#contactForm').show();
        $('#viewContent').hide();
    });

    // Función para cargar contactos
    function cargarContactos() {
        $.ajax({
            url: 'http://localhost:3000/v1/client/contact',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(response) {
                const contactos = response.data || [];
                const $tbody = $('#contacts-body');
                $tbody.empty();

                if (contactos.length === 0) {
                    $tbody.append('<tr><td colspan="5">No tienes contactos guardados.</td></tr>');
                } else {
                    contactos.forEach(function(contact) {
                        const row = `
                            <tr>
                                <td>${contact.alias || ''}</td>
                                <td>${contact.account_number || ''}</td>
                                <td>${contact.description || ''}</td>
                                <td>
                                    <button class="edit-btn btn-edit-view btn-action" data-id="${contact.id}">Editar</button>
                                    <button class="delete-btn btn-edit-view btn-action btn-secondary" data-id="${contact.id}">Eliminar<i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `;
                        $tbody.append(row);
                    });
                }
            },
            error: function(xhr) {
                alert('No se pudieron cargar los contactos.');
                console.error(xhr.responseText);
            }
        });
    }

    cargarContactos();

    // Agregar o actualizar contacto
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        const id = $('#contactId').val();
        const alias = $('#contactAlias').val().trim();
        const account_number = $('#contactAccountNumber').val().trim();
        const description = $('#contactDescription').val().trim();

        if (!alias || !account_number) {
            alert('Alias y número de cuenta son obligatorios.');
            return;
        }

        const isEdit = !!id;
        const ajaxOptions = {
            url: isEdit ? `http://localhost:3000/v1/client/contact/${id}` : 'http://localhost:3000/v1/client/contact',
            type: isEdit ? 'PATCH' : 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                alias,
                account_number,
                description: description || null
            }),
            success: function() {
                alert(isEdit ? 'Contacto actualizado.' : 'Contacto agregado exitosamente.');
                $('#contactForm')[0].reset();
                $('#contactId').val('');
                $('#contactForm').removeAttr('data-editing');
                cargarContactos();
            },
            error: function(xhr) {
                alert(isEdit ? 'Error al actualizar contacto.' : 'Error al agregar contacto.');
                console.error(xhr.responseText);
            }
        };
        $.ajax(ajaxOptions);
    });

    // Editar contacto (cargar datos en el formulario)
    $(document).on('click', '.edit-btn', function() {
        const id = $(this).data('id');
        $.ajax({
            url: `http://localhost:3000/v1/client/contact/${id}`,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(response) {
                const contact = response.data;
                $('#contactId').val(contact.id);
                $('#contactAlias').val(contact.alias);
                $('#contactAccountNumber').val(contact.account_number);
                $('#contactDescription').val(contact.description || '');
                $('#contactForm').attr('data-editing', 'true');
                $('#modalTitle').text('Editar Contacto');
                $('#contactModal').show();
                $('#contactForm').show();
                $('#viewContent').hide();
            },
            error: function(xhr) {
                alert('No se pudo cargar el contacto.');
                console.error(xhr.responseText);
            }
        });
    });

    // Eliminar contacto
    $(document).on('click', '.delete-btn', function() {
        const id = $(this).data('id');
        if (confirm('¿Seguro que deseas eliminar este contacto?')) {
            $.ajax({
                url: `http://localhost:3000/v1/client/contact/${id}`,
                type: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function() {
                    alert('Contacto eliminado.');
                    cargarContactos();
                },
                error: function(xhr) {
                    alert('Error al eliminar contacto.');
                    console.error(xhr.responseText);
                }
            });
        }
    });

        //Sección de cerrar el modal    
            $(document).on('click', '#closeViewBtn', function() {
            $('#contactModal').hide();
            $('#viewContent').hide();
            $('#contactForm').hide();
            $('#contactForm')[0].reset();
            $('#contactId').val('');
            
            });

            $(document).on('click', '.close-modal', function() {
                $('#contactModal').hide();
                $('#viewContent').hide();
                $('#contactForm').hide();
                $('#contactForm')[0].reset();
                $('#contactId').val('');
            
            });

            $(document).on('click', '#cancelBtn', function() {
                $('#contactModal').hide();
                $('#viewContent').hide();
                $('#contactForm').hide();
                $('#contactForm')[0].reset();
                $('#contactId').val('');
            
            });

    // Botón para editar desde la vista de detalles
    $('#editViewBtn').on('click', function(e) {
        e.preventDefault();
        $('#viewContent').hide();
        $('#contactForm').show();
        $('#modalTitle').text('Editar Contacto');
    });

    // También asegúrate de que al hacer click en "Ver" se rellene el formulario oculto:
    $(document).on('click', '.view-btn', function() {
        const id = $(this).data('id');
        $.ajax({
            url: `http://localhost:3000/v1/client/contact/${id}`,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(response) {
                const contact = response.data;
                $('#viewAlias').text(contact.alias || '');
                $('#viewAccount').text(contact.account_number || '');
                $('#viewDescription').text(contact.description || '');
                $('#viewDate').text(contact.created_at ? new Date(contact.created_at).toLocaleString('es-VE') : '');
                // Rellenar el formulario para edición
                $('#contactId').val(contact.id);
                $('#contactAlias').val(contact.alias);
                $('#contactAccountNumber').val(contact.account_number);
                $('#contactDescription').val(contact.description || '');
                $('#contactModal').show();
                $('#contactForm').hide();
                $('#viewContent').show();
            },
            error: function(xhr) {
                alert('No se pudo cargar el contacto.');
                console.error(xhr.responseText);
            }
        });
    });
});