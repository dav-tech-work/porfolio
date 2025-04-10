// personalizacion_modal_dinamico.js (módulo ES)

function initPersonalizacionModal() {
  // Evento dinámico para imágenes
    const imgs = document.querySelectorAll('.project-image');
    imgs.forEach(img => {
        img.addEventListener('click', () => abrirModal(img));
    });
}

function abrirModal(img) {
    const existing = document.getElementById("modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "modal";
    modal.className = "modal";
    modal.style.display = "flex";
    modal.innerHTML = `<img id="modal-img" class="modal-content" src="${img.src}" alt="${img.alt || ''}">`;

    modal.addEventListener("click", () => modal.remove());
    document.body.appendChild(modal);
}

// Escape para cerrar modal dinámico
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        const modal = document.getElementById("modal");
        if (modal) modal.remove();
    }
});

export { initPersonalizacionModal };
