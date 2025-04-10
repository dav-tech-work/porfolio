function initIdioma() {
  const languageSelect = document.getElementById('languageSelect');
  if (!languageSelect) return;

  languageSelect.addEventListener('change', () => {
    const selected = languageSelect.value;
    // Establecer la cookie para mantener el idioma (por si se utiliza en otros momentos)
    document.cookie = `lang=${selected}; path=/; max-age=31536000; SameSite=Lax`; // 1 año

    // Actualizar la URL con el query parameter para forzar que el backend detecte el cambio
    const url = new URL(window.location.href);
    url.searchParams.set('lang', selected);
    window.location.href = url.toString();
  });
}

export { initIdioma };
