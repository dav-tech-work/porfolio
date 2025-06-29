// Inicialización de highlight.js
function initHighlight() {
  if (window.hljs) {
    // console.log('✓ highlight.js está cargado');

    // Verificar que los estilos están cargados
    const estilosHLJS = document.querySelector('link[href*="highlight.js"]');
    if (!estilosHLJS) {
      console.error('❌ No se encontraron los estilos de highlight.js');
      return;
    }
    // console.log('✓ Estilos de highlight.js encontrados:', estilosHLJS.href);

    // Configurar las opciones de highlight.js
    hljs.configure({
      ignoreUnescapedHTML: true,
      languages: ['javascript', 'python', 'sql', 'html', 'css', 'php']
    });
    // console.log('✓ highlight.js configurado');

    // Buscar bloques de código que no tengan data-src (los que tienen data-src son manejados por muestra_contenido.js)
    const bloquesCodigo = document.querySelectorAll('pre code:not([data-src])');
    // console.log(`ℹ️ Encontrados ${bloquesCodigo.length} bloques de código estáticos`);

    if (bloquesCodigo.length === 0) {
      // console.log('ℹ️ No se encontraron bloques de código estáticos para resaltar');
      return;
    }

    // Aplicar el resaltado a todos los bloques de código
    bloquesCodigo.forEach((block, index) => {
      const language = block.getAttribute('class');
      try {
        // Asegurarnos de que tenga las clases necesarias
        block.parentElement.classList.add('code-block');
        block.classList.add('code-content');

        // Limpiar el resaltado anterior si existe
        if (block.dataset.highlighted) {
          block.textContent = block.textContent;
          block.classList.remove('hljs');
          delete block.dataset.highlighted;
        }

        hljs.highlightElement(block);
        // console.log(`✓ Bloque estático ${index + 1} resaltado (${language || 'sin lenguaje especificado'})`);

        // Verificar si el estilo se aplicó
        const estilosAplicados = window.getComputedStyle(block);
        const colorTexto = estilosAplicados.color;
        const colorFondo = estilosAplicados.backgroundColor;
        // console.log(`ℹ️ Bloque ${index + 1} - Color texto: ${colorTexto}, Fondo: ${colorFondo}`);

        // Si el texto parece invisible, agregar clase de corrección
        if (colorTexto === colorFondo || colorTexto === 'rgba(0, 0, 0, 0)') {
          console.warn(`⚠️ Bloque ${index + 1} - Texto invisible detectado, aplicando clase de corrección`);
          block.classList.add('force-visible-text');
        }
      } catch (error) {
        console.error(`❌ Error al resaltar bloque ${index + 1}:`, error);
      }
    });

    // console.log('✓ Proceso de resaltado de bloques estáticos completado');
  } else {
    console.error('❌ highlight.js NO está cargado');
  }
}

// Intentar inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initHighlight);

// Backup: si el DOM ya está listo, inicializar inmediatamente
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initHighlight();
}
