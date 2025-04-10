import express from "express";
import { validarTokenCSRF } from "../middlewares/csrf.mjs";

const router = express.Router();

// Middleware local para bloquear en producción
router.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).send("⛔ Ruta no disponible en producción.");
  }
  next();
});

// GET: Muestra el formulario de prueba
router.get("/test", (req, res) => {
  res.render("test", {
    titulo: "🔧 Prueba del sistema",
    idioma: req.idioma,
    csrfToken: req.csrfToken,
    mensajeExito: null,
    mensajeError: null,
    tipo: null
  });
});

// POST: Procesa el formulario con validación CSRF
router.post("/test", validarTokenCSRF, (req, res) => {
  const nombre = req.body.nombre;

  if (!nombre || nombre.trim().length === 0) {
    return res.status(400).render("test", {
      titulo: "🔧 Prueba del sistema",
      idioma: req.idioma,
      csrfToken: req.csrfToken,
      mensajeExito: null,
      mensajeError: "❌ Nombre inválido. Inténtalo de nuevo.",
      tipo: null
    });
  }

  res.render("test", {
    titulo: "🔧 Prueba del sistema",
    idioma: req.idioma,
    csrfToken: req.csrfToken,
    mensajeError: null,
    mensajeExito: `✅ Hola, ${nombre.trim()}! Tu formulario fue enviado correctamente.`,
    tipo: null
  });
});

// GET: Verificación del idioma cargado
router.get("/idioma-test", (req, res) => {
  res.send(`
    <h1>🧪 Verificación de idioma</h1>
    <p><strong>Idioma detectado:</strong> ${req.idioma}</p>
    <p><strong>home.title:</strong> ${req.traducciones?.["home.title"] || "❌ No disponible"}</p>
    <p><strong>cv.skills.title:</strong> ${req.traducciones?.["cv.skills.title"] || "❌ No disponible"}</p>
    <hr>
    <p>
      <a href="/idioma-test?lang=es">🇪🇸 Español</a> |
      <a href="/idioma-test?lang=en">🇬🇧 Inglés</a> |
      <a href="/idioma-test?lang=cat">🏴 Català</a>
    </p>
  `);
});

export default router;
