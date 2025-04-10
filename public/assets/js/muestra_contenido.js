/**
 * Ajusta la URL de origen para corregir rutas que apunten a "/contenido_protegido" 
 * o "/public/assets", y las convierte en la ruta correcta "/assets".
 *
 * @param {string} src - La URL original.
 * @returns {string} La URL ajustada.
 */
function ajustarSrc(src) {
  if (src.startsWith("/contenido_protegido")) {
    return src.replace("/contenido_protegido", "/assets");
  } else if (src.startsWith("/public/assets")) {
    return src.replace("/public/assets", "/assets");
  }
  return src;
}

async function cargarCodigo(element) {
  let src = element.dataset.src;
  if (!src) {
    console.error('No se encontró el atributo data-src');
    return;
  }

  // Ajustar la URL en caso de que contenga prefijos incorrectos
  src = ajustarSrc(src);
  console.log('Intentando cargar:', src);

  try {
    const response = await fetch(src);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const text = await response.text();
    console.log('Código cargado correctamente:', text.substring(0, 50) + '...');
    element.textContent = text;

    // Añadir clase de lenguaje si no la tiene
    if (!element.classList.contains('language-python')) {
      element.classList.add('language-python');
    }

    // Aplicar resaltado si highlight.js está disponible
    if (window.hljs) {
      console.log('Aplicando highlight.js al elemento');
      hljs.highlightElement(element);

      // Añadir clase al contenedor <pre> para temas CSS
      const preElement = element.closest('pre');
      if (preElement && !preElement.classList.contains('hljs')) {
        preElement.classList.add('hljs');
        console.log('Clase hljs añadida al elemento <pre>');
      }
    } else {
      console.warn('highlight.js no está disponible');
    }
  } catch (error) {
    console.error("Error al cargar el archivo:", error);
    element.textContent = "Error al cargar el código.";
  }
}

function initMuestraContenido() {
  console.log('Inicializando muestra_contenido.js');

  // Evento para cargar código al abrir un <details>
  document.addEventListener('click', async function (e) {
    const summary = e.target.closest('summary');
    if (summary) {
      const details = summary.parentElement;
      if (details.hasAttribute('open')) return;

      console.log('Abriendo <details>, cargando código...');
      const codeBlocks = details.querySelectorAll('code[data-src]');
      console.log(`Encontrados ${codeBlocks.length} bloques de código para cargar`);

      for (const block of codeBlocks) {
        if (!block.textContent.trim()) {
          await cargarCodigo(block);
        }
      }
    }
  });

  // Cargar bloques abiertos por defecto (útil para SSR o pruebas)
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado');
    const openDetails = document.querySelectorAll('details[open]');
    openDetails.forEach(details => {
      const codeBlocks = details.querySelectorAll('code[data-src]');
      codeBlocks.forEach(block => {
        if (!block.textContent.trim()) {
          cargarCodigo(block);
        }
      });
    });
  });
}

export { initMuestraContenido };
