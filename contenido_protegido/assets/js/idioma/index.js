function initIdioma() {
  const languageSelect = document.getElementById('languageSelect');
  if (!languageSelect) return;

  languageSelect.addEventListener('change', () => {
    const selected = languageSelect.value;
    document.cookie = `lang=${selected}; path=/; max-age=31536000; SameSite=Lax`; // 1 año, SameSite para mayor seguridad
    window.location.reload();
  });
}

export { initIdioma };
