import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ruta principal: /
router.get("/", (req, res) => {
  res.render("paginas/formacion", {
    titulo: req.traducciones?.formacion || "Formación",
    tipo: "formacion",
    idioma: req.idioma,
    t: req.traducciones,
    csrfToken: res.locals.csrfToken || req.csrfToken,
    nonce: res.locals.nonce
  });
});

// Rutas dinámicas para secciones específicas
const secciones = [
  "python/teoria",
  "python/practicas",
  "javascript/teoria",
  "javascript/practicas",
  "html",
  "php",
  "sistemas/practicas/practica_01_sistemas",
  "construccion"
].map(s => s.replace(/^\/+|\/+$/g, ''));

// ✅ CORREGIDO: Cache para verificación de vistas (optimización)
const vistaCache = new Map();

// Función para verificar si existe una vista
function existeVista(app, nombreVista) {
  // ✅ CORREGIDO: Usar caché para evitar verificaciones repetidas
  if (vistaCache.has(nombreVista)) {
    return vistaCache.get(nombreVista);
  }

  try {
    const viewsPath = app.get("views");
    const rutaVista = path.join(viewsPath, "paginas", "formacion", `${nombreVista}.ejs`);
    const existe = fs.existsSync(rutaVista);

    // Cachear resultado
    vistaCache.set(nombreVista, existe);
    return existe;
  } catch (error) {
    vistaCache.set(nombreVista, false);
    return false;
  }
}

// Renderizado dinámico usando EJS desde views/paginas/formacion/<slug>.ejs
secciones.forEach(slug => {
  router.get(`/${slug}`, (req, res) => {
    const slugParts = slug.split("/");
    const nombreVista = slugParts.join("_"); // Ejemplo: python_teoria

    // Verifica si la vista existe
    if (!existeVista(req.app, nombreVista)) {
      return res.render("paginas/construccion", {
        titulo: req.traducciones?.construccion || "En construcción",
        tipo: "construccion",
        idioma: req.idioma,
        t: req.traducciones,
        csrfToken: res.locals.csrfToken || req.csrfToken,
        nonce: res.locals.nonce
      });
    }

    // Renderiza la vista correspondiente
    res.render(`paginas/formacion/${nombreVista}`, {
      titulo: req.traducciones?.[nombreVista] || slug,
      tipo: nombreVista,
      idioma: req.idioma,
      t: req.traducciones,
      csrfToken: res.locals.csrfToken || req.csrfToken,
      nonce: res.locals.nonce
    });
  });
});

export default router;
