document.addEventListener('DOMContentLoaded', function() {
    // Toggle para mostrar/ocultar el saldo
    const toggleBalance = document.getElementById('toggleBalance');
    const balanceAmount = document.querySelector('.amount');
    const balanceIcon = toggleBalance.querySelector('i');
    
    toggleBalance.addEventListener('click', function() {
        if (balanceAmount.textContent === '$*******') {
            balanceAmount.textContent = '$12,345.67';
            balanceIcon.classList.remove('fa-lock');
            balanceIcon.classList.add('fa-unlock');
        } else {
            balanceAmount.textContent = '$*******';
            balanceIcon.classList.remove('fa-unlock');
            balanceIcon.classList.add('fa-lock');
        }
    });

    // Filtrado de transacciones
    const filterButtons = document.querySelectorAll('.filter-btn');
    const transactions = document.querySelectorAll('.transaction');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            transactions.forEach(transaction => {
                if (filter === 'all') {
                    transaction.style.display = '';
                } else {
                    if (transaction.dataset.type === filter) {
                        transaction.style.display = '';
                    } else {
                        transaction.style.display = 'none';
                    }
                }
            });
        });
    });

    // Simular datos dinámicos 
    function formatDate(date) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('es-MX', options).replace(',', '');
    }

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});