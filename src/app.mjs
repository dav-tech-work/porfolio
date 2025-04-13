// src/app.mjs

// Importar módulos nativos y de terceros con ES Modules
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import fs from "fs";
import helmet from "helmet";
import expressLayouts from "express-ejs-layouts";
import crypto from "crypto";
import { fileURLToPath } from "url";
import csurf from "csurf";

// Importar middlewares y utilidades personalizados
import idioma from "./middlewares/idioma.mjs";
import logger from "./middlewares/logger.mjs";
import protecciones from "./middlewares/protecciones.mjs";
import sanitizer from "./middlewares/sanitizer.mjs";
import limiter from "./middlewares/limiter.mjs";
import { attachCsrfToken } from "./middlewares/csrf-token-handler.mjs";
import { usarCompresion } from "./utils/optimizacion/index.mjs";
import { registrar } from "./utils/servicios/logger.mjs";

// Importar configuración centralizada
import config from "./config/index.mjs";

// Importar rutas
import homeRoutes from "./routes/home.mjs";
import formacionRoutes from "./routes/formacion.mjs";
import contactoRoutes from "./routes/api/contacto.mjs";
import protegidasRoutes from "./routes/protegidas.mjs";
import testRoutes from "./routes/test.mjs";

// Configuración para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar la aplicación Express y definir puerto
const app = express();
const PORT = config.PORT || 3000;

// Configuración del motor de vistas EJS + layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

// Middleware para generar un nonce para CSP
app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString("base64");
  res.locals.nonce = nonce;
  next();
});

// Configuración de seguridad con Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`, "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net", "https://static.cloudflareinsights.com"],
        styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`, "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"]
      }
    },
    xssFilter: true,
    noSniff: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    hsts: {
      maxAge: 15552000,
      includeSubDomains: true,
      preload: true
    },
    frameguard: { action: "deny" }
  })
);

// Configurar proxy trust
app.set("trust proxy", 1);

// Middlewares esenciales
app.use(cookieParser({ secure: config.ENV === "production", httpOnly: true, sameSite: "strict" }));
app.use(usarCompresion({ level: 6, threshold: 500 }));

// Archivos estáticos
const cacheOptions = { maxAge: config.ENV === "production" ? "1d" : 0, etag: true, lastModified: true };
app.use("/assets", express.static(path.join(__dirname, "..", "public", "assets"), cacheOptions));
app.use("/pages/sistemas", express.static(path.join(__dirname, "..", "public", "pages", "sistemas"), cacheOptions));
app.use("/assets/programacion", express.static(path.join(__dirname, "..", "public", "assets", "programacion"), cacheOptions));

// Middlewares personalizados
app.use(logger);
app.use(protecciones);
app.use(idioma);

// CSRF
const csrfExcludedPaths = ["/api/webhook"];
app.use((req, res, next) => {
  if (csrfExcludedPaths.includes(req.path)) return next();
  return csurf({ cookie: { httpOnly: true, secure: config.ENV === "production", sameSite: "strict" } })(req, res, next);
});
app.use(attachCsrfToken);

app.use(limiter);
app.use(sanitizer);
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

// Rutas
app.use("/", homeRoutes);
app.use("/", formacionRoutes);
app.use("/", contactoRoutes);
app.use("/", protegidasRoutes);
if (config.ENV === "development" || config.ENV === "test") {
  app.use("/", testRoutes);
  registrar("Rutas de prueba habilitadas en entorno: " + config.ENV, "warn");
}

// Ruta raíz personalizada
app.get("/", (req, res) => {
  try {
    res.render("paginas/index", {
      titulo: req.traducciones?.home || "Inicio",
      tipo: "home",
      idioma: req.idioma,
      t: req.traducciones,
      csrfToken: res.locals.csrfToken,
      nonce: res.locals.nonce
    });
  } catch (err) {
    registrar(`Error al renderizar index.ejs: ${err.message}`, "error");
    const mensajeError = config.ENV === "production" ? "Ha ocurrido un error al cargar la página" : `Error al renderizar index.ejs: ${err.message}`;
    res.status(500).render("paginas/error", {
      titulo: "Error",
      tipo: "error",
      idioma: req.idioma || "es",
      t: req.traducciones || {},
      mensaje: mensajeError,
      nonce: res.locals.nonce
    });
  }
});

// Ruta dinámica
app.get("/pagina/:nombre", async (req, res) => {
  const { nombre } = req.params;
  const paginasPermitidas = ["curriculum", "proyectos", "formacion", "python_teoria", "python_practicas", "javascript_teoria", "javascript_practicas", "html_teoria", "html_teorias"];
  if (!nombre || /[\/\\.]/.test(nombre) || nombre.includes("..") || !paginasPermitidas.includes(nombre)) {
    return res.status(404).render("paginas/404", { titulo: "404", tipo: "error", idioma: req.idioma, t: req.traducciones, nonce: res.locals.nonce });
  }

  const rutasPosibles = [`paginas/formacion/${nombre}`, `paginas/${nombre}`];
  for (const ruta of rutasPosibles) {
    const filePath = path.join(__dirname, "views", `${ruta}.ejs`);
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      return res.render(ruta, {
        tipo: nombre,
        titulo: req.traducciones[nombre] || nombre,
        idioma: req.idioma,
        t: req.traducciones,
        csrfToken: res.locals.csrfToken,
        nonce: res.locals.nonce
      });
    } catch (err) {}
  }

  res.status(404).render("paginas/404", {
    titulo: "404",
    tipo: "error",
    idioma: req.idioma,
    t: req.traducciones,
    nonce: res.locals.nonce
  });
});

// Errores globales
app.use((err, req, res, next) => {
  registrar(`Error no controlado: ${err.message}\n${err.stack}`, "error");
  const mensajeError = config.ENV === "production" ? "Ha ocurrido un error inesperado" : `Error: ${err.message}`;
  res.status(500).render("paginas/error", {
    titulo: "Error",
    tipo: "error",
    idioma: req.idioma || "es",
    t: req.traducciones || {},
    mensaje: mensajeError,
    nonce: res.locals.nonce
  });
});

// Fallback 404
app.use((req, res) => {
  try {
    registrar(`Fallback 404 activado para: ${req.originalUrl}`, "warn");
    res.status(404).render("paginas/404", {
      titulo: "404",
      tipo: "error",
      idioma: req.idioma || "es",
      t: req.traducciones || {},
      mensaje: "Página no encontrada",
      nonce: res.locals.nonce
    });
  } catch (err) {
    registrar(`Error en el fallback 404: ${err.message}`, "error");
    res.status(500).send("Error interno del servidor");
  }
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  registrar(`Servidor corriendo en http://localhost:${PORT} (Entorno: ${config.ENV})`, "info");
});

// Cierre limpio
process.on("SIGTERM", () => {
  registrar("SIGTERM recibido, cerrando servidor...", "info");
  server.close(() => {
    registrar("Proceso terminado correctamente", "info");
  });
});

export default app;
