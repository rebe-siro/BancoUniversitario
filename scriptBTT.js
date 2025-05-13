// Mostrará el botón "Volver al inicio" cuando el usuario haya desplazado la página un 75% hacia abajo
document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Mostrar el botón si el usuario ha desplazado la página un 75% hacia abajo
        if (scrollPosition > pageHeight * 0.75) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
});

  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  window.addEventListener('scroll', function () {
    const bar = document.querySelector('.location-bar');
    if (window.scrollY > 50) {
      bar.classList.add('scrolled');
    } else {
      bar.classList.remove('scrolled');
    }
  });