import { initIdioma } from "./idioma/index.js";
import { initTheme } from "./tema/index.js";
import { initSearch } from "./navegacion/search.js";
import { initMail } from "./navegacion/mail.js";
import { initPersonalizacionModal } from "./tema/personalizacion_modal_dinamico.js";
import { initNavegacion } from "./navegacion/navegacion.js";
import { initMuestraContenido } from "./muestra_contenido.js";

document.addEventListener("DOMContentLoaded", () => {
  // 🌍 Idioma con persistencia en cookie
  initIdioma();

  // 🌓 Tema claro/oscuro
  initTheme();

  // 🔎 Buscador con interfaz y debounce
  initSearch();

  // 📬 Formulario de contacto con validación
  initMail();

  // 🎨 Modal de personalización
  initPersonalizacionModal();

  // 🚀 Navegación y comportamiento general
  initNavegacion();
  
  // 📄 Carga de código bajo demanda
  initMuestraContenido();
});
