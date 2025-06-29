import express from "express";
import { verifyCSRFToken } from "../middlewares/csrf-modern.mjs";
import { sanitize } from "../utils/seguridad/sanitize.mjs";

const router = express.Router();

// Middleware local para bloquear esta ruta en producción
router.use((_req, res, next) => {
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
router.post("/test", verifyCSRFToken, (req, res) => {
  const nombre = sanitize.text(req.body.nombre);

  if (!nombre || nombre.length === 0) {
    return res.status(400).render("test", {
      titulo: "🔧 Prueba del sistema",
      idioma: req.idioma,
      csrfToken: req.csrfToken,
      mensajeExito: null,
      mensajeError: "❌ Nombre inválido. Inténtalo de nuevo.",
      tipo: "error"
    });
  }

  res.render("test", {
    titulo: "🔧 Prueba del sistema",
    idioma: req.idioma,
    csrfToken: req.csrfToken,
    mensajeExito: `✅ ¡Hola, ${nombre}!`,
    mensajeError: null,
    tipo: "exito"
  });
});

export default router;
