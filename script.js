let currentIndex = 0;
const images = document.querySelectorAll('.slider-image');

function changeImage() {
    images[currentIndex].style.opacity = 0;

    currentIndex = (currentIndex + 1) % images.length;

    images[currentIndex].style.opacity = 1;
}

setInterval(changeImage, 5000);

document.addEventListener("DOMContentLoaded", () => {
    const tarjetas = document.querySelectorAll(".tarjeta-box");

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("mouseenter", () => {
            tarjeta.classList.add("hover");
        });

        tarjeta.addEventListener("mouseleave", () => {
            tarjeta.classList.remove("hover");
        });
    });
});


