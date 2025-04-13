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
  if (!src) return;

  src = ajustarSrc(src);

  try {
    const response = await fetch(src);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const text = await response.text();
    element.textContent = text;

    if (!element.classList.contains('language-python')) {
      element.classList.add('language-python');
    }

    if (window.hljs) {
      hljs.highlightElement(element);

      const preElement = element.closest('pre');
      if (preElement && !preElement.classList.contains('hljs')) {
        preElement.classList.add('hljs');
      }
    }
  } catch (error) {
    element.textContent = "Error al cargar el código.";
  }
}

function initMuestraContenido() {
  document.addEventListener('click', async function (e) {
    const summary = e.target.closest('summary');
    if (summary) {
      const details = summary.parentElement;
      if (details.hasAttribute('open')) return;

      const codeBlocks = details.querySelectorAll('code[data-src]');
      for (const block of codeBlocks) {
        if (!block.textContent.trim()) {
          await cargarCodigo(block);
        }
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
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
