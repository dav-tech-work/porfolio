require('dotenv').config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const helmet = require("helmet");
const expressLayouts = require("express-ejs-layouts");

const {
  generarTokenCSRF,
  idioma,
  logger,
  protecciones,
  sanitizer
} = require("./middlewares");

const { usarCompresion } = require("./utils/optimizacion");

const homeRoutes = require("./routes/home");
const formacionRoutes = require("./routes/formacion");
const contactoRoutes = require("./routes/api/contacto");
const protegidasRoutes = require("./routes/protegidas");
const testRoutes = require("./routes/test");

const { globalLimiter, contactoLimiter, loginLimiter } = require("./middlewares/limiter");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del motor de vistas EJS + layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "vistas"));
app.use(expressLayouts);
app.set("layout", "layout");

// Helper global para estilos inline con nonce (con fallback a this.nonce)
app.locals.styleWithNonce = function (css) {
  const nonce = this.locals?.nonce || '';
  return `<style nonce="${nonce}">
${css}
</style>`;
};


// Seguridad con Helmet (puedes quitar esto si usas protecciones.js en su lugar)
app.use(
  helmet({
    contentSecurityPolicy: false, // Desactivado si usas CSP manual desde protecciones.js
    xssFilter: true,
    noSniff: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    hsts: {
      maxAge: 15552000,
      includeSubDomains: true
    },
    frameguard: { action: "deny" }
  })
);

app.set("trust proxy", 1);

// 🤨 Middlewares esenciales
app.use(cookieParser());
app.use(usarCompresion());

// ✅ Sirve los archivos estáticos
app.use("/assets", express.static(path.join(__dirname, "..", "contenido_protegido", "assets")));
app.use("/contenido_protegido/pages/sistemas", express.static(
  path.join(__dirname, "..", "contenido_protegido", "pages", "sistemas"))
);
app.use("/contenido_protegido/assets/programacion", express.static(
  path.join(__dirname, "..", "contenido_protegido", "assets", "programacion"))
);

// 📦 Middlewares personalizados
app.use(logger);
app.use(protecciones); // CSP con nonce, report-uri y sin 'unsafe-inline'
app.use(idioma);
app.use(generarTokenCSRF);
app.use(globalLimiter);
app.use("/api/contacto", contactoLimiter);
app.use("/login", loginLimiter);
app.use(sanitizer);

// 📨 Parsing de formularios
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// 🌐 Rutas principales
app.use("/", homeRoutes);
app.use("/", formacionRoutes);
app.use("/", contactoRoutes);
app.use("/", protegidasRoutes);
if (process.env.NODE_ENV !== "production") {
  app.use("/", testRoutes);
}

// 🌍 Ruta /
app.get("/", (req, res) => {
  try {
    res.render("paginas/index", {
      titulo: req.traducciones?.home || "Inicio",
      tipo: "home",
      idioma: req.idioma,
      t: req.traducciones,
      csrfToken: req.csrfToken,
      nonce: res.locals.nonce // ✅ nonce disponible en plantilla
    });
  } catch (err) {
    console.error("❌ Error al renderizar index.ejs:", err.message);
    res.status(500).send(`<pre>Error al renderizar index.ejs:\n${err.stack}</pre>`);
  }
});

// 🧱 Ruta dinámica /pagina/:nombre
app.get("/pagina/:nombre", (req, res) => {
  const { nombre } = req.params;

  if (!nombre || /[\/\\.]/.test(nombre) || nombre.includes("..")) {
    return res.status(400).render("paginas/404", {
      titulo: "404",
      tipo: "error",
      idioma: req.idioma,
      t: req.traducciones
    });
  }

  const rutasPosibles = [
    `paginas/formacion/${nombre}`,
    `paginas/${nombre}`
  ];

  for (const ruta of rutasPosibles) {
    const filePath = path.join(__dirname, "vistas", `${ruta}.ejs`);
    if (fs.existsSync(filePath)) {
      return res.render(ruta, {
        tipo: nombre,
        titulo: req.traducciones[nombre] || nombre,
        idioma: req.idioma,
        t: req.traducciones,
        csrfToken: req.csrfToken,
        nonce: res.locals.nonce
      });
    }
  }

  res.status(404).render("paginas/404", {
    titulo: "404",
    tipo: "error",
    idioma: req.idioma,
    t: req.traducciones
  });
});

// 🤨 Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("paginas/error", {
    titulo: "Error",
    tipo: "error",
    idioma: req.idioma || "es",
    t: req.traducciones || {},
    mensaje:
      process.env.NODE_ENV === "production"
        ? "Ha ocurrido un error inesperado"
        : err.message
  });
});

// 🚒 Fallback 404
app.use((req, res) => {
  try {
    console.warn(`⚠️ Fallback 404 activado para: ${req.originalUrl}`);
    res.status(404).render("paginas/404", {
      titulo: "404",
      tipo: "error",
      idioma: req.idioma || "es",
      t: req.traducciones || {},
      mensaje: "Página no encontrada"
    });
  } catch (err) {
    console.error("❌ Error en el fallback 404:", err.message);
    res.status(500).send(`<pre>Error en el fallback 404:\n${err.stack}</pre>`);
  }
});

// 🚀 Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// 🚑 Manejo de cierre limpio
process.on("SIGTERM", () => {
  console.log("SIGTERM recibido, cerrando servidor...");
  server.close(() => {
    console.log("Proceso terminado");
  });
});

module.exports = app;
