/**
 * Ajusta la URL de origen para corregir rutas que apunten a diferentes ubicaciones
 * y las convierte en la ruta correcta.
 *
 * @param {string} src - La URL original.
 * @returns {string} La URL ajustada.
 */
function ajustarSrc(src) {
  if (!src) return '';

  // Eliminar dobles slashes y normalizar la ruta
  src = src.replace(/\/+/g, '/');

  // Convertir rutas específicas
  let rutaAjustada = src;

  if (src.startsWith('/contenido_protegido')) {
    rutaAjustada = src.replace('/contenido_protegido', '/assets');
  } else if (src.startsWith('/public/assets')) {
    rutaAjustada = src.replace('/public/assets', '/assets');
  } else if (src.startsWith('/public/')) {
    rutaAjustada = src.replace('/public/', '/');
  } else if (!src.startsWith('/assets/') && !src.startsWith('/pages/')) {
    // Si la ruta no comienza con /assets/ o /pages/, añadir /assets/
    rutaAjustada = '/assets/' + src.replace(/^\/+/, '');
  }
  return rutaAjustada;
}

/**
 * Detecta el lenguaje basado en la extensión del archivo
 * @param {string} src - La ruta del archivo
 * @returns {string} El lenguaje detectado
 */
function detectarLenguaje(src) {
  const extensiones = {
    '.py': 'python',
    '.js': 'javascript',
    '.jsx': 'javascript',
    '.ts': 'typescript',
    '.tsx': 'typescript',
    '.html': 'html',
    '.css': 'css',
    '.json': 'json',
    '.xml': 'xml',
    '.md': 'markdown',
    '.sql': 'sql',
    '.sh': 'bash',
    '.bash': 'bash',
    '.cpp': 'cpp',
    '.c': 'c',
    '.java': 'java',
    '.php': 'php',
    '.rb': 'ruby',
    '.go': 'go',
    '.rs': 'rust'
  };

  const ext = src.substring(src.lastIndexOf('.')).toLowerCase();
  return extensiones[ext] || 'plaintext';
}

async function cargarCodigo(element) {
  let src = element.dataset.src;
  if (!src) {
    console.warn('No se proporcionó una ruta en data-src');
    return;
  }

  const rutaOriginal = src;
  src = ajustarSrc(src);
  const lenguaje = element.dataset.language || detectarLenguaje(src);

  try {
    const response = await fetch(src);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} - URL: ${src}`);
    }

    const text = await response.text();
    if (!text.trim()) {
      console.warn('El archivo está vacío:', src);
    }

    // Configurar el elemento para highlight.js
    element.classList.add(`language-${lenguaje}`);
    element.classList.add('code-content');
    if (element.parentElement && element.parentElement.tagName.toLowerCase() === 'pre') {
      element.parentElement.classList.add('code-block');
    }

    // Limpiar resaltado anterior si existe
    if (element.dataset.highlighted) {
      delete element.dataset.highlighted;
      element.classList.remove('hljs');
    }

    element.textContent = text;

    // Resaltar el código si highlight.js está disponible
    if (typeof hljs !== 'undefined') {
      try {
        hljs.highlightElement(element);

        // Verificar si el estilo se aplicó correctamente
        const estilosAplicados = window.getComputedStyle(element);
        const colorTexto = estilosAplicados.color;
        const colorFondo = estilosAplicados.backgroundColor;

        // Si el texto parece invisible, agregar clase de corrección
        if (colorTexto === colorFondo || colorTexto === 'rgba(0, 0, 0, 0)') {
          element.classList.add('force-visible-text');
        }
      } catch (highlightError) {
        console.warn('Error al resaltar el código:', highlightError);
      }
    }


  } catch (error) {
    console.error('Error al cargar el código:', {
      error,
      ruta: src,
      rutaOriginal
    });
    element.textContent = error.message;
    element.classList.add('error');
  }
}

function initMuestraContenido() {
  // Cargar código al abrir detalles
  document.addEventListener('click', async function(e) {
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

  // Cargar código en detalles que ya están abiertos
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
