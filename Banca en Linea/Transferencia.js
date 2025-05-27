$(document).ready(function() {
    // Actualizar contador de caracteres
    $('#description').on('input', function() {
        $('#charCount').text(this.value.length);
    });

    // Formatear número de cuenta mientras se escribe
    $('#accountNumber').on('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 20) value = value.substring(0, 20);
        this.value = value;
    });

    // Formatear monto mientras se escribe
    $('#amount').on('input', function() {
        let value = this.value.replace(/[^0-9.]/g, '');
        if ((value.match(/\./g) || []).length > 1) {
            value = value.substring(0, value.lastIndexOf('.'));
        }
        this.value = value;
    });

    // Mostrar resumen en tiempo real
    $('#transferForm').on('input', function() {
        $('#summaryAccount').text($('#accountNumber').val() || '-');
        const amount = $('#amount').val();
        $('#summaryAmount').text(amount ? `$${parseFloat(amount).toFixed(2)}` : '-');
        $('#summaryDescription').text($('#description').val() || '-');
    });

    // Cancelar transferencia
    $('#cancelTransfer').on('click', function() {
        if (confirm('¿Deseas cancelar esta transferencia?')) {
            $('#transferForm')[0].reset();
            $('#charCount').text('0');
        }
    });

    // Enviar formulario (mostrar modal de confirmación)
    $('#transferForm').on('submit', function(e) {
        e.preventDefault();

        const accountNumber = $('#accountNumber').val();
        const amount = $('#amount').val();
        const description = $('#description').val();

        if (accountNumber.length !== 20) {
            alert('El número de cuenta debe tener 20 dígitos');
            return;
        }
        if (parseFloat(amount) <= 0) {
            alert('El monto debe ser mayor a cero');
            return;
        }

        // Mostrar datos en el modal de confirmación
        $('#confirmAccount').text(accountNumber);
        $('#confirmAmount').text(`$${parseFloat(amount).toFixed(2)}`);
        $('#confirmDescription').text(description);

        $('#confirmModal').css('display', 'flex');
        $('body').css('overflow', 'hidden');
    });

    // Cancelar confirmación
    $('#cancelConfirm, .close-modal').on('click', function() {
        $('#confirmModal').hide();
        $('body').css('overflow', 'auto');
    });

    // Ejecutar transferencia usando la API real
    $('#executeTransfer').on('click', function() {
        const token = localStorage.getItem('token');
        const transferData = {
            account_number: $('#accountNumber').val(),
            amount: parseFloat($('#amount').val()),
            description: $('#description').val(),
            reference: $('#referenceNumber').val()
        };

        $.ajax({
            url: 'http://localhost:3000/v1/client/movement',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(transferData),
            success: function(response) {
                $('#confirmModal').hide();
                // Mostrar la id del movimiento como número de transacción
                $('#transactionNumber').text(response.data.id || '');
                $('#transactionDate').text(response.date || new Date().toLocaleString('es-ES'));
                $('#successModal').css('display', 'flex');
                $('body').css('overflow', 'hidden');
            },
            error: function(xhr) {
                alert('Error: ' + (xhr.responseJSON?.message || 'Error en la transferencia'));
                $('#confirmModal').hide();
                $('body').css('overflow', 'auto');
            }
        });
    });

    // Cerrar modal de éxito
    $('#closeSuccess').on('click', function() {
        $('#successModal').hide();
        $('body').css('overflow', 'auto');
        $('#transferForm')[0].reset();
        $('#charCount').text('0');
        // Limpiar resumen
        $('#summaryAccount').text('-');
        $('#summaryAmount').text('-');
        $('#summaryDescription').text('-');
    });

    // Cerrar modales al hacer clic fuera
    $('#confirmModal, #successModal').on('click', function(e) {
        if (e.target === this) {
            $(this).hide();
            $('body').css('overflow', 'auto');
        }
    });

    // Cerrar con ESC
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('#confirmModal, #successModal').each(function() {
                if ($(this).css('display') === 'flex') {
                    $(this).hide();
                    $('body').css('overflow', 'auto');
                }
            });
        }
    });
});