import config from "../config/index.mjs";
import { registrar } from "../utils/servicios/logger.mjs";
import { auditar } from "../utils/servicios/loggerAuditoria.mjs";

export default function proteccionesMiddleware(req, res, next) {
  // Security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "accelerometer=(), autoplay=(), camera=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), screen-wake-lock=(), usb=(), web-share=(), xr-spatial-tracking=()");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

  // Apply CSP using the centralized configuration if nonce is available
  if (res.locals.nonce) {
    res.setHeader("Content-Security-Policy", config.CSP(res.locals.nonce));
  }

  // Cache prevention for sensitive routes
  if (req.path.includes("/api/") || req.path.includes("/zona-secreta")) {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
  }

  // Security scanning detection
  const userAgent = req.headers["user-agent"] || "";
  const requestUrl = req.originalUrl || req.url;
  const patrones = [
    /\.(php|asp|aspx|jsp|cgi|env|git|sql|bak)$/i,
    /\/(wp-admin|wp-content|wp-login|admin|administrator|phpmyadmin|mysql|dbadmin)/i,
    /(union\s+select|information_schema|sysdatabases|etc\/passwd|\/etc\/shadow)/i
  ];

  if (patrones.some(patron => patron.test(requestUrl))) {
    registrar(`Posible intento de escaneo detectado: ${requestUrl} desde ${req.ip} (${userAgent})`, "warn");
    auditar({
      tipo: "scan",
      usuario: req.usuario?.id || "anonimo",
      ip: req.ip,
      mensaje: `Acceso sospechoso a ${requestUrl}`,
      agente: userAgent
    });
  }

  next();
}
