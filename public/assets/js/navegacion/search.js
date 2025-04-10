let resultados = [];

async function cargarDatosBuscador() {
  try {
    const res = await fetch("/assets/data/buscador.json");
    resultados = res.ok ? await res.json() : [];
  } catch (err) {
    console.error("❌ Error al cargar buscador.json:", err);
  }
}

function filtrarResultados(termino) {
  termino = termino.toLowerCase().trim();
  return resultados.filter(item =>
    item.titulo.toLowerCase().includes(termino) ||
    item.slug.toLowerCase().includes(termino)
  );
}

function mostrarResultadosCoincidentes(lista, container) {
  container.innerHTML = lista.length === 0
    ? "<p class='sin-resultados'>Sin coincidencias.</p>"
    : "<ul>" + lista.map(item => `<li><a href="${item.ruta}">${item.titulo}</a></li>`).join("") + "</ul>";
}

function initSearch(inputSelector = "#searchInput", resultSelector = "#searchResults") {
  const input = document.querySelector(inputSelector);
  const lista = document.querySelector(resultSelector);
  if (!input || !lista) return;

  let timeout;
  input.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const filtro = filtrarResultados(input.value);
      mostrarResultadosCoincidentes(filtro, lista);
    }, 300);
  });
}

function initSearchUI() {
  const toggleBtn = document.querySelector(".search-toggle");
  const dropdown = document.querySelector(".search-dropdown");
  const closeBtn = document.querySelector(".close-search");
  const input = document.querySelector("#searchInput");
  const results = document.querySelector("#searchResults");

  if (!toggleBtn || !dropdown || !input) return;

  // Abrir
  toggleBtn.addEventListener("click", () => {
    dropdown.classList.add("activo");
    input.focus();
  });

  // Cerrar
  const cerrar = () => {
    dropdown.classList.remove("activo");
    input.value = "";
    if (results) results.innerHTML = "";
  };

  closeBtn?.addEventListener("click", cerrar);

  // Cerrar con Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") cerrar();
  });

  // Cerrar clic fuera
  document.addEventListener("click", e => {
    if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) cerrar();
  });
}

async function initBuscador() {
  await cargarDatosBuscador();
  initSearch();
  initSearchUI();
}

export { initBuscador as initSearch };
