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

            
function exportarAExcel() {
    const form = document.getElementById('formulario');
    const datos = new FormData(form);
    const nuevoRegistro = {};
  
    for (let [key, value] of datos.entries()) {
      nuevoRegistro[key] = value;
    }
  
    let registros = JSON.parse(localStorage.getItem("datosEmpresa")) || [];
  
    registros.push(nuevoRegistro);
  
    localStorage.setItem("datosEmpresa", JSON.stringify(registros));
  
    const ws = XLSX.utils.json_to_sheet(registros);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Formulario");
  
    XLSX.writeFile(wb, "datos_empresa.xlsx");
  
    const mensajeExito = document.getElementById("mensaje-exito");
    mensajeExito.style.display = "block";
  
    setTimeout(() => {
      mensajeExito.style.display = "none";
    }, 5000);
  
    form.reset();
  }