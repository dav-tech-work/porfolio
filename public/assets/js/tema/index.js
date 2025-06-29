function initTheme() {
  const themeToggle = document.querySelector(".theme-toggle");
  if (!themeToggle) return;

  const themeIcon = themeToggle.querySelector("i");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const setTheme = (theme) => {
    const html = document.documentElement;
    html.setAttribute("data-tema", theme);
    themeIcon.classList.toggle("fa-moon", theme === "light");
    themeIcon.classList.toggle("fa-sun", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.warn("No se pudo guardar el tema en localStorage:", e);
    }
  };

  try {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
    } else if (prefersDark.matches) {
      setTheme("dark");
    }
  } catch (e) {
    console.warn("No se pudo leer el tema de localStorage:", e);
    // Usar preferencia del sistema como fallback
    if (prefersDark.matches) setTheme("dark");
  }

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-tema");
    setTheme(current === "dark" ? "light" : "dark");
  });
}

export { initTheme };
