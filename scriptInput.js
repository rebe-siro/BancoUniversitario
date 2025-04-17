function buscarTexto() {
  const input = document.getElementById("searchInput");
  const value = input.value.toLowerCase();
  const bodyText = document.body.innerText.toLowerCase();

  if (value.trim() === "") {
    alert("Escribe una palabra para buscar.");
    return;
  }

  if (bodyText.includes(value)) {
    const match = document.evaluate(
      `//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), "${value}")]`,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    if (match.snapshotLength > 0) {
      const firstMatch = match.snapshotItem(0);
      firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
      firstMatch.style.backgroundColor = "yellow"; // resalta la coincidencia
    }
  } else {
    alert("No se encontró la palabra.");
  }

  // Limpia el input
  input.value = "";
}

// Evento click en el botón de búsqueda
document.getElementById("searchBtn").addEventListener("click", buscarTexto);

// Evento tecla Enter en el input
document.getElementById("searchInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evita que el formulario se envíe si hay uno
    buscarTexto();
  }
});