document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const contactModal = document.getElementById('contactModal');
    const modalTitle = document.getElementById('modalTitle');
    const contactForm = document.getElementById('contactForm');
    const viewContent = document.getElementById('viewContent');
    const contactIdInput = document.getElementById('contactId');
    
    // Botones
    const addContactBtn = document.getElementById('addContactBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const closeViewBtn = document.getElementById('closeViewBtn');
    const submitBtn = document.getElementById('submitBtn');
    const editViewBtn = document.getElementById('editViewBtn');
    
    // Campos del formulario
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactPhone = document.getElementById('contactPhone');
    const contactMessage = document.getElementById('contactMessage');
    
    // Campos de vista
    const viewName = document.getElementById('viewName');
    const viewEmail = document.getElementById('viewEmail');
    const viewPhone = document.getElementById('viewPhone');
    const viewMessage = document.getElementById('viewMessage');
    const viewDate = document.getElementById('viewDate');
    
    // Variable para mantener los datos del contacto actual
    let currentContactData = null;

    // Funciones para manejar el modal
    function openModal() {
        contactModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        contactForm.reset();
    }

    // Eventos para abrir/cerrar modal
    addContactBtn?.addEventListener('click', function() {
        modalTitle.textContent = 'Agregar Nuevo Contacto';
        contactForm.style.display = 'block';
        viewContent.style.display = 'none';
        contactIdInput.value = '';
        openModal();
    });

    cancelBtn?.addEventListener('click', closeModal);
    closeViewBtn?.addEventListener('click', closeModal);

    // Cerrar al hacer clic fuera del modal
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeModal();
        }
    });

    // Cerrar con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.style.display === 'flex') {
            closeModal();
        }
    });

    // Manejar envío del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            id: contactIdInput.value,
            name: contactName.value,
            email: contactEmail.value,
            phone: contactPhone.value,
            message: contactMessage.value
        };
        
        if (!validateContactForm(formData)) return;
        
        const isEdit = !!formData.id;
        
        // Simular llamada a API
        setTimeout(() => {
            alert(isEdit ? 'Contacto actualizado exitosamente' : 'Contacto creado exitosamente');
            closeModal();
            
            // Aquí deberías actualizar la lista de contactos
            // Ejemplo: loadContacts();
        }, 1000);
    });

    // Función para abrir en modo edición
    window.openEditModal = function(contactData) {
        modalTitle.textContent = 'Editar Contacto';
        contactForm.style.display = 'block';
        viewContent.style.display = 'none';
        
        contactIdInput.value = contactData.id || '';
        contactName.value = contactData.name || '';
        contactEmail.value = contactData.email || '';
        contactPhone.value = contactData.phone || '';
        contactMessage.value = contactData.message || '';
        
        // Guardar los datos actuales
        currentContactData = contactData;
        
        openModal();
    };

    // Función para abrir en modo vista
    window.openViewModal = function(contactData) {
        modalTitle.textContent = 'Detalles del Contacto';
        contactForm.style.display = 'none';
        viewContent.style.display = 'block';
        
        // Guardar los datos del contacto actual
        currentContactData = contactData;
        
        viewName.textContent = contactData.name || 'No especificado';
        viewEmail.textContent = contactData.email || 'No especificado';
        viewPhone.textContent = contactData.phone || 'No especificado';
        viewMessage.textContent = contactData.message || 'No especificado';
        viewDate.textContent = formatDate(contactData.date) || 'No especificado';
        
        openModal();
    };

    // Evento para el botón de editar en la vista
    editViewBtn?.addEventListener('click', function() {
        if (currentContactData) {
            openEditModal(currentContactData);
        }
    });

    // Funciones auxiliares
    function validateContactForm(data) {
        if (!data.name || data.name.length < 2) {
            alert('El nombre debe tener al menos 2 caracteres');
            return false;
        }
        
        if (!data.email || !data.email.includes('@')) {
            alert('Por favor ingresa un email válido');
            return false;
        }
        
        if (!data.message || data.message.length < 10) {
            alert('El mensaje debe tener al menos 10 caracteres');
            return false;
        }
        
        return true;
    }

    function formatDate(dateString) {
        if (!dateString) return 'No especificado';
        
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        
        try {
            return new Date(dateString).toLocaleDateString('es-ES', options);
        } catch (e) {
            return dateString;
        }
    }

    // Asignar eventos a los botones de la tabla
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const contactData = {
                id: row.dataset.id || '',
                name: row.cells[0].textContent,
                email: row.cells[1].textContent,
                phone: row.cells[2].textContent,
                message: row.dataset.message || "Mensaje de ejemplo",
                date: row.dataset.date || new Date().toISOString()
            };
            
            openViewModal(contactData);
        });
    });
    
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const contactData = {
                id: row.dataset.id || '',
                name: row.cells[0].textContent,
                email: row.cells[1].textContent,
                phone: row.cells[2].textContent,
                message: row.dataset.message || "Mensaje de ejemplo"
            };
            
            openEditModal(contactData);
        });
    });

    // Evento para botones de eliminar (ejemplo básico)
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
                const row = this.closest('tr');
                // Aquí iría la lógica para eliminar el contacto
                row.remove();
                alert('Contacto eliminado correctamente');
            }
        });
    });
});

// Funciones globales para cerrar el modal
function closeModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('closing');
    
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
        document.body.style.overflow = 'auto';
    }, 200);
}

document.querySelector('.close-modal')?.addEventListener('click', closeModal);

document.getElementById('contactModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});