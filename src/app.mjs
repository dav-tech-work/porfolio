// app.mjs - Versión simplificada para debugging

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import expressLayouts from "express-ejs-layouts";
import crypto from "crypto";
import { fileURLToPath } from "url";
import session from "express-session";

// Middlewares
import idioma from "./middlewares/idioma.mjs";
import logger from "./middlewares/logger.mjs";
import protecciones from "./middlewares/protecciones.mjs";
import sanitizer from "./middlewares/sanitizer.mjs";
import limiter from "./middlewares/limiter.mjs";
import { attachCSRFToken, verifyCSRFToken } from "./middlewares/csrf-modern.mjs";

// Utilidades y configuración
import { usarCompresion } from "./utils/optimizacion/index.mjs";
import { registrar } from "./utils/servicios/logger.mjs";
import config from "./config/index.mjs";

// Rutas
import homeRoutes from "./routes/home.mjs";
import formacionRoutes from "./routes/formacion.mjs";
import contactoRoutes from "./routes/api/contacto.mjs";
import protegidasRoutes from "./routes/protegidas.mjs";
import testRoutes from "./routes/test.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = config.PORT || 3001;

console.log('🚀 Iniciando servidor...');
console.log('📁 __dirname:', __dirname);
console.log('🔧 Puerto:', PORT);
console.log('🌍 Entorno:', config.ENV);

// Configuración de tipos MIME para archivos estáticos
express.static.mime.define({'text/css': ['css']});

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

// Middleware para nonce
app.use((_req, res, next) => {
  const nonce = crypto.randomBytes(16).toString("base64");
  res.locals.nonce = nonce;
  next();
});

// Configuración básica de Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'self'", (_req, res) => `'nonce-${res.locals.nonce}'`, "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      connectSrc: ["'self'"],
      manifestSrc: ["'self'"],
      baseUri: ["'none'"],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      frameSrc: ["'self'"]
    }
  }
}));

// Configuración básica
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(usarCompresion({ level: 6, threshold: 500 }));

// Configuración de archivos estáticos
const cacheOptions = {
  maxAge: config.CACHE.STATIC_MAX_AGE,
  etag: true,
  lastModified: true
};

app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets'), cacheOptions));
app.use('/favicon.ico', express.static(path.join(__dirname, '..', 'public', 'favicon.ico'), { maxAge: '1d' }));

// Middlewares básicos
app.use(logger);
app.use(protecciones);
app.use(idioma);

// Configuración de sesiones
app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict"
  }
}));

// CSRF simplificado
const csrfExcludedPaths = ["/api/webhook"];
app.use((req, res, next) => {
  if (csrfExcludedPaths.includes(req.path)) return next();

  attachCSRFToken(req, res, (err) => {
    if (err) return next(err);

    const methodsToCheck = ['POST', 'PUT', 'DELETE', 'PATCH'];
    if (methodsToCheck.includes(req.method)) {
      verifyCSRFToken(req, res, next);
    } else {
      next();
    }
  });
});

app.use(limiter);
app.use(sanitizer);
app.use(express.json({ limit: config.LIMITS.JSON_BODY }));
app.use(express.urlencoded({ extended: true, limit: config.LIMITS.FORM_BODY }));

// Rutas principales
app.use("/", homeRoutes);
app.use("/formacion", formacionRoutes);
app.use("/", contactoRoutes);
app.use("/", protegidasRoutes);

if (config.IS_DEV || config.IS_TEST) {
  app.use("/", testRoutes);
  console.log("⚠️ Rutas de prueba habilitadas");
}

// Ruta de construcción
app.get("/construccion", (req, res) => {
  res.render("paginas/construccion", {
    titulo: req.traducciones?.construccion || "En construcción",
    tipo: "construccion",
    idioma: req.idioma,
    t: req.traducciones,
    csrfToken: res.locals.csrfToken,
    nonce: res.locals.nonce,
    layout: 'layout'
  });
});

// Manejo de errores
app.use((err, req, res, _next) => {
  console.error('❌ Error:', err.message);
  registrar(`Error no controlado: ${err.message}`, "error");
  res.status(500).render("paginas/error", {
    titulo: "Error",
    tipo: "error",
    idioma: req.idioma || "es",
    t: req.traducciones || {},
    mensaje: config.IS_PROD ? "Ha ocurrido un error inesperado" : `Error: ${err.message}`,
    nonce: res.locals.nonce
  });
});

// 404
app.use((req, res) => {
  console.log('🔍 404 para:', req.originalUrl);
  res.status(404).render("paginas/404", {
    titulo: "404",
    tipo: "error",
    idioma: req.idioma || "es",
    t: req.traducciones || {},
    mensaje: "Página no encontrada",
    nonce: res.locals.nonce
  });
});

const server = app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🌍 Entorno: ${config.ENV}`);
  registrar(`Servidor corriendo en http://localhost:${PORT} (Entorno: ${config.ENV})`, "info");
});

process.on("SIGTERM", () => {
  console.log('🛑 SIGTERM recibido, cerrando servidor...');
  registrar("SIGTERM recibido, cerrando servidor...", "info");
  server.close(() => {
    console.log('✅ Proceso terminado correctamente');
    registrar("Proceso terminado correctamente", "info");
  });
});

export default app;
