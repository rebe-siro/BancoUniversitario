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
    const contactAlias = document.getElementById('contactAlias');
    const contactAccount = document.getElementById('contactAccount');
    const contactDescription = document.getElementById('contactDescription');
    
    // Campos de vista
    const viewAlias = document.getElementById('viewAlias');
    const viewAccount = document.getElementById('viewAccount');
    const viewDescription = document.getElementById('viewDescription');
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
            alias: contactAlias.value,
            account: contactAccount.value,
            description: contactDescription.value,
            date: new Date().toISOString()
        };
        
        if (!validateContactForm(formData)) return;
        
        const isEdit = !!formData.id;
        
        // Simular llamada a API
        setTimeout(() => {
            alert(isEdit ? 'Contacto actualizado exitosamente' : 'Contacto creado exitosamente');
            closeModal();
            
            // Aquí deberías actualizar la lista de contactos
            if (isEdit) {
                updateContactInTable(formData);
            } else {
                addContactToTable(formData);
            }
        }, 1000);
    });

    // Función para abrir en modo edición
    window.openEditModal = function(contactData) {
        modalTitle.textContent = 'Editar Contacto';
        contactForm.style.display = 'block';
        viewContent.style.display = 'none';
        
        contactIdInput.value = contactData.id || '';
        contactAlias.value = contactData.alias || '';
        contactAccount.value = contactData.account || '';
        contactDescription.value = contactData.description || '';
        
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
        
        viewAlias.textContent = contactData.alias || 'No especificado';
        viewAccount.textContent = contactData.account || 'No especificado';
        viewDescription.textContent = contactData.description || 'No especificado';
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
        if (!data.alias || data.alias.length < 3) {
            alert('El alias debe tener al menos 3 caracteres');
            return false;
        }
        
        if (!data.account || data.account.length < 10) {
            alert('El número de cuenta debe tener al menos 10 dígitos');
            return false;
        }
        
        if (!data.description || data.description.length < 5) {
            alert('La descripción debe tener al menos 5 caracteres');
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

    // Función para agregar contacto a la tabla
    function addContactToTable(contactData) {
        const tbody = document.querySelector('.contacts-table tbody');
        const newRow = document.createElement('tr');
        newRow.dataset.id = Date.now(); // ID temporal
        newRow.dataset.date = contactData.date;
        
        newRow.innerHTML = `
            <td>${contactData.alias}</td>
            <td>${contactData.account}</td>
            <td>${contactData.description}</td>
            <td class="contact-actions">
                <button class="btn-action btn-view" title="Ver"><i class="fas fa-eye"></i></button>
                <button class="btn-action btn-delete" title="Eliminar"><i class="fas fa-trash"></i></button>
            </td>
`;
        
        tbody.appendChild(newRow);
        addRowEventListeners(newRow);
    }

    // Función para actualizar contacto en la tabla
    function updateContactInTable(contactData) {
        const row = document.querySelector(`tr[data-id="${contactData.id}"]`);
        if (row) {
            row.cells[0].textContent = contactData.alias;
            row.cells[1].textContent = contactData.account;
            row.cells[2].textContent = contactData.description;
        }
    }

    // Asignar eventos a las filas de la tabla
    function addRowEventListeners(row) {
        // Botón Ver
        row.querySelector('.btn-view').addEventListener('click', function() {
            const contactData = {
                id: row.dataset.id,
                alias: row.cells[0].textContent,
                account: row.cells[1].textContent,
                description: row.cells[2].textContent,
                date: row.dataset.date
            };
            openViewModal(contactData);
        });
        
        // Botón Eliminar
        row.querySelector('.btn-delete').addEventListener('click', function() {
            if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
                row.remove();
                alert('Contacto eliminado correctamente');
            }
        });
    }

    // Asignar eventos a las filas existentes
    document.querySelectorAll('.contacts-table tbody tr').forEach(row => {
        addRowEventListeners(row);
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