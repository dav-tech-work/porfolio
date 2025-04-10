function initTheme() {
  const themeToggle = document.querySelector(".theme-toggle");
  if (!themeToggle) return;

  const themeIcon = themeToggle.querySelector("i");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const setTheme = (theme) => {
    const html = document.documentElement;
    html.setAttribute("data-bs-theme", theme);
    themeIcon.classList.toggle("fa-moon", theme === "light");
    themeIcon.classList.toggle("fa-sun", theme === "dark");
    localStorage.setItem("theme", theme);
  };

  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved);
  else if (prefersDark.matches) setTheme("dark");

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-bs-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}

export { initTheme };
