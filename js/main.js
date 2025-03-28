import { seguridad } from './modulos/seguridad.js';
import { initPersonalizacion } from './modulos/personalizacion.js';
import { initIdioma } from './modulos/idioma.js';
import { initNavegacion } from './modulos/navegacion.js';
import { initSearch } from './modulos/search.js';
import { initMuestraContenido } from './modulos/muestra_contenido.js';
import { initMail } from './modulos/mail.js';
import { abrirModal, cerrarModal, activarModalImagenes, configurarEscapeCierreModal } from './modulos/modal_img.js';

document.addEventListener('DOMContentLoaded', () => {
    initPersonalizacion();
    initIdioma();
    initNavegacion();
    initSearch();
    initMuestraContenido();
    initMail();

    // Activar modal de imagen solo si hay elementos con clase específica
    const modalTargets = document.querySelectorAll('.modal-img-activable');
    if (modalTargets.length > 0) {
        activarModalImagenes('.modal-img-activable');
        configurarEscapeCierreModal();
    }

    console.log("✅ App inicializada con módulos");
});
