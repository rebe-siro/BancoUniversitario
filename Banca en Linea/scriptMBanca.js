$(document).ready(function() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must log in first.');
        window.location.href = '../Login.html';
        return;
    }

    $.ajax({
        url: 'http://localhost:3000/v1/client/movement?page=1&page_size=20&multiplier=1',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(response) {
            const transactions = response.data || [];
            const $tbody = $('#transactions-body');
            $tbody.empty();

            transactions.forEach(function(tx) {
                const row = `
                    <tr class="transaction">
                        <td class="reference">${tx.id || ''}</td>
                        <td class="description">${tx.description || ''}</td>
                        <td class="date">${tx.created_at ? new Date(tx.created_at).toLocaleString('es-VE') : ''}</td>
                        <td class="amount">${tx.amount !== undefined ? parseFloat(tx.amount).toLocaleString('es-VE') : ''}</td>
                    </tr>
                `;
                $tbody.append(row);
            });

            // Solo usa los datos del primer movimiento
            let firstName = '';
            let lastName = '';
            let accountNumber = '';
            let balance = '';

            if (transactions.length > 0) {
                const userTx = transactions[0];
                firstName = userTx.first_name || '';
                lastName = userTx.last_name || '';
                accountNumber = userTx.account_number || '';
                balance = userTx.balance !== undefined ? userTx.balance : '';
            }

            $('.account-name').text(`Cuenta de ${firstName} ${lastName}`);
            $('.account-number').text(`Número de cuenta: ${accountNumber}`);
            if (balance !== '') {
                $('.balance-amount-value')
                    .text(`$${parseFloat(balance).toLocaleString('es-VE')}`)
                    .attr('data-real-balance', balance);
            }
        },
        error: function(xhr) {
            alert('Could not load transactions.');
            console.error(xhr.responseText);
        }
    });

    // Mostrar/Quitar Visibilidad del Balance
    $('#toggleBalance').on('click', function() {
        const $amount = $('.balance-amount-value');
        const isHidden = $amount.hasClass('hidden-balance');
        if (isHidden) {
            // Mostrar el Balance real
            const realBalance = $amount.attr('data-real-balance');
            $amount.text(`$${parseFloat(realBalance).toLocaleString('es-VE')}`);
            $amount.removeClass('hidden-balance');
            $(this).find('i').removeClass('fa-unlock').addClass('fa-lock');
        } else {
            // Esconder el Balance
            $amount.text('****');
            $amount.addClass('hidden-balance');
            $(this).find('i').removeClass('fa-lock').addClass('fa-unlock');
        }
    });
});






/*$(document).ready(function() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must log in first.');
        window.location.href = '../Login.html';
        return;
    }

    $.ajax({
        url: 'http://localhost:3000/v1/client/movement?page=1&page_size=20&multiplier=1',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(response) {
            const transactions = response.data || [];
            const $tbody = $('#transactions-body');
        $tbody.empty();

        transactions.forEach(function(tx) {
            const row = `
                <tr class="transaction">
                    <td class="reference">${tx.id || ''}</td>
                    <td class="description">${tx.description || ''}</td>
                    <td class="date">${tx.created_at ? new Date(tx.created_at).toLocaleString('es-VE') : ''}</td>
                    <td class="amount">${tx.amount !== undefined ? parseFloat(tx.amount).toLocaleString('es-VE') : ''}</td>
                </tr>
            `;
            $tbody.append(row);
        });

        // Muestra la información de la cuenta, si no la hay usa el LocalStorage al logearse
            let firstName = '';
            let lastName = '';
            let accountNumber = '';
            let balance = '';

            if (transactions.length > 0) {
                const userTx = transactions[0];
                firstName = userTx.first_name || '';
                lastName = userTx.last_name || '';
                accountNumber = userTx.account_number || '';
                balance = userTx.balance !== undefined ? userTx.balance : '';

                // Si firt_name o last_name no estan, los busca en el localStorage
                if (!firstName) {
                    firstName = localStorage.getItem('first_name') || '';
                }
                if (!lastName) {
                    lastName = localStorage.getItem('last_name') || '';
                }
            } else {
                // Si no hay transacciones, usa el localStorage
                firstName = localStorage.getItem('first_name') || '';
                lastName = localStorage.getItem('last_name') || '';
                accountNumber = localStorage.getItem('account_number') || '';
                balance = localStorage.getItem('balance') || '';
            }

            $('.account-name').text(`Cuenta de ${firstName} ${lastName}`);
            $('.account-number').text(`Número de cuenta: ${accountNumber}`);
            if (balance !== '') {
                $('.balance-amount-value')
                    .text(`$${parseFloat(balance).toLocaleString('es-VE')}`)
                    .attr('data-real-balance', balance);
            }
        },
        error: function(xhr) {
            alert('Could not load transactions.');
            console.error(xhr.responseText);
        }

    });

    // Mostrar/Quitar Visibilidad del Balance
    $('#toggleBalance').on('click', function() {
        const $amount = $('.balance-amount-value');
        const isHidden = $amount.hasClass('hidden-balance');
        if (isHidden) {
            // Mostrar el Balance real
            const realBalance = $amount.attr('data-real-balance');
            $amount.text(`$${parseFloat(realBalance).toLocaleString('es-VE')}`);
            $amount.removeClass('hidden-balance');
            $(this).find('i').removeClass('fa-unlock').addClass('fa-lock');
        } else {
            // Esconder el Balance
            $amount.text('****');
            $amount.addClass('hidden-balance');
            $(this).find('i').removeClass('fa-lock').addClass('fa-unlock');
        }
    });

});*/

