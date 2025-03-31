let currentIndex = 0;
const images = document.querySelectorAll('.slider-image');

function changeImage() {
    images[currentIndex].style.opacity = 0;

    currentIndex = (currentIndex + 1) % images.length;

    images[currentIndex].style.opacity = 1;
}

setInterval(changeImage, 5000);