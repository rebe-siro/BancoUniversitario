document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const transferForm = document.getElementById('transferForm');
    const cancelTransferBtn = document.getElementById('cancelTransfer');
    const confirmModal = document.getElementById('confirmModal');
    const successModal = document.getElementById('successModal');
    const cancelConfirmBtn = document.getElementById('cancelConfirm');
    const executeTransferBtn = document.getElementById('executeTransfer');
    const closeSuccessBtn = document.getElementById('closeSuccess');
    const descriptionInput = document.getElementById('description');
    const charCount = document.getElementById('charCount');
    
    // Actualizar contador de caracteres
    descriptionInput.addEventListener('input', function() {
        charCount.textContent = this.value.length;
    });
    
    // Formatear número de cuenta mientras se escribe
    document.getElementById('accountNumber').addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 20) value = value.substring(0, 20);
        this.value = value;
    });
    
    // Formatear monto mientras se escribe
    document.getElementById('amount').addEventListener('input', function(e) {
        let value = this.value.replace(/[^0-9.]/g, '');
        if ((value.match(/\./g) || []).length > 1) {
            value = value.substring(0, value.lastIndexOf('.'));
        }
        this.value = value;
    });
    
    // Mostrar resumen en tiempo real
    transferForm.addEventListener('input', function() {
        document.getElementById('summaryAccount').textContent = 
            document.getElementById('accountNumber').value || '-';
        
        const amount = document.getElementById('amount').value;
        document.getElementById('summaryAmount').textContent = 
            amount ? `$${parseFloat(amount).toFixed(2)}` : '-';
        
        document.getElementById('summaryDescription').textContent = 
            document.getElementById('description').value || '-';
    });
    
    // Cancelar transferencia
    cancelTransferBtn.addEventListener('click', function() {
        if (confirm('¿Deseas cancelar esta transferencia?')) {
            transferForm.reset();
            charCount.textContent = '0';
        }
    });
    
    // Enviar formulario
    transferForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const accountNumber = document.getElementById('accountNumber').value;
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        
        // Validaciones adicionales
        if (accountNumber.length !== 20) {
            alert('El número de cuenta debe tener 20 dígitos');
            return;
        }
        
        if (parseFloat(amount) <= 0) {
            alert('El monto debe ser mayor a cero');
            return;
        }
        
        // Mostrar modal de confirmación
        document.getElementById('confirmAccount').textContent = accountNumber;
        document.getElementById('confirmAmount').textContent = `$${parseFloat(amount).toFixed(2)}`;
        document.getElementById('confirmDescription').textContent = description;
        
        confirmModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Cancelar confirmación
    cancelConfirmBtn.addEventListener('click', function() {
        confirmModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Ejecutar transferencia
    executeTransferBtn.addEventListener('click', function() {
        // Simular envío a API (aquí iría tu AJAX)
        simulateTransfer();
        
        /*
        // Ejemplo de cómo sería con AJAX
        const transferData = {
            accountNumber: document.getElementById('accountNumber').value,
            amount: document.getElementById('amount').value,
            description: document.getElementById('description').value,
            reference: document.getElementById('referenceNumber').value
        };
        
        $.ajax({
            url: '/api/transfers',
            method: 'POST',
            data: transferData,
            success: function(response) {
                showSuccess(response.transactionId, response.date);
            },
            error: function(xhr) {
                alert('Error: ' + (xhr.responseJSON?.message || 'Error en la transferencia'));
            }
        });
        */
    });
    
    // Función de simulación (eliminar en producción)
    function simulateTransfer() {
        confirmModal.style.display = 'none';
        
        // Mostrar loader (opcional)
        setTimeout(() => {
            // Actualizar datos de éxito
            const now = new Date();
            document.getElementById('transactionDate').textContent = 
                now.toLocaleString('es-ES');
            
            document.getElementById('transactionNumber').textContent = 
                `TRX-${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(Math.random()*1000).toString().padStart(3, '0')}`;
            
            // Mostrar modal de éxito
            successModal.style.display = 'flex';
        }, 1000);
    }
    
    // Cerrar modal de éxito
    closeSuccessBtn.addEventListener('click', function() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        transferForm.reset();
        charCount.textContent = '0';
    });
    
    // Cerrar modales al hacer clic fuera
    [confirmModal, successModal].forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            [confirmModal, successModal].forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
    
    // Preparar para API AJAX
    /*
    function showSuccess(transactionId, date) {
        document.getElementById('transactionNumber').textContent = transactionId;
        document.getElementById('transactionDate').textContent = date;
        confirmModal.style.display = 'none';
        successModal.style.display = 'flex';
    }
    */
});