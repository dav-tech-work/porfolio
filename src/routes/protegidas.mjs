import express from "express";
const router = express.Router();

// Middleware simulado de autenticación
function requireAuth(req, res, next) {
  const autenticado = false; // 🔐 Sustituir por lógica real (JWT, sesión, etc.)

  if (!autenticado) {
    return res.status(403).render("paginas/403", {
      titulo: "Acceso Denegado",
      tipo: "error",
      idioma: req.idioma,
      t: req.traducciones,
      mensaje: "🔒 Necesitas estar autenticado para acceder a esta sección."
    });
  }

  next();
}

// Ruta protegida
router.get("/zona-secreta", requireAuth, (req, res) => {
  res.render("paginas/zona-secreta", {
    titulo: req.traducciones?.secreto || "Zona Secreta",
    tipo: "protegida",
    idioma: req.idioma,
    t: req.traducciones,
    csrfToken: req.csrfToken
  });
});

export default router;
