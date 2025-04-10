import express from "express";
const router = express.Router();

// Ruta principal: /formacion
router.get("/formacion", (req, res) => {
  res.render("paginas/formacion", {
    titulo: req.traducciones?.formacion || "Formación",
    tipo: "formacion",
    idioma: req.idioma,
    t: req.traducciones,
    csrfToken: req.csrfToken
  });
});

// Rutas dinámicas para secciones específicas
const secciones = [
  "python/teoria",
  "python/practicas",
  "javascript/teoria",
  "javascript/practicas",
  "html/teoria",
  "html/practicas",
  "sistemas/practicas/practica_01_sistemas"
];

// Renderizado dinámico usando EJS desde views/paginas/formacion/<slug>.ejs
secciones.forEach(slug => {
  router.get(`/formacion/${slug}`, (req, res) => {
    const slugParts = slug.split("/");
    const nombreVista = slugParts.join("_"); // Ejemplo: python_teoria

    res.render(`paginas/formacion/${nombreVista}`, {
      titulo: req.traducciones?.[nombreVista] || slug,
      tipo: nombreVista, 
      idioma: req.idioma,
      t: req.traducciones,
      csrfToken: req.csrfToken
    });
  });
});

export default router;
