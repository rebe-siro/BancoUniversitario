// include.js
function includeHTML() {
    const elements = document.querySelectorAll('[w3-include-html]');
    
    elements.forEach(element => {
        const file = element.getAttribute('w3-include-html');
        fetch(file)
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;
            })
            .catch(err => {
                console.error('Error al cargar el menú:', err);
            });
    });
}


window.onload = includeHTML;