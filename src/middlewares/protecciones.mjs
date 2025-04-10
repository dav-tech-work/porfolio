import config from "../config/index.mjs";
import { registrar } from "../utils/servicios/logger.mjs";

export default function proteccionesMiddleware(req, res, next) {
  // Refuerza headers HTTP para seguridad general
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=()");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  
  // Añadir cabecera de seguridad adicional
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  
  // Prevenir clickjacking
  res.setHeader("X-Frame-Options", "DENY");
  
  // Si hay nonce disponible, aplicar política CSP dinámica
  if (res.locals.nonce) {
    const nonce = res.locals.nonce;
    
    // Política CSP mejorada
    const cspDirectives = [
      `default-src 'self'`,
      `script-src 'self' 'nonce-${nonce}' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://static.cloudflareinsights.com`,
      // Usar nonce también para estilos en lugar de unsafe-inline
      `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com https://cdnjs.cloudflare.com`,
      `img-src 'self' data: https:`,
      `font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com`,
      `connect-src 'self'`,
      `object-src 'none'`,
      `frame-ancestors 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
      `manifest-src 'self'`,
      `media-src 'self'`,
      `worker-src 'self'`
    ];
    
    res.setHeader("Content-Security-Policy", cspDirectives.join("; "));
    
    // Registrar violaciones de CSP en entorno de desarrollo
    if (config.IS_DEV) {
      res.setHeader("Content-Security-Policy-Report-Only", 
        cspDirectives.concat([`report-uri /api/csp-report`]).join("; "));
    }
  }
  
  // Añadir cabeceras de caché para prevenir almacenamiento de información sensible
  if (req.path.includes("/api/") || req.path.includes("/zona-secreta")) {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
  }
  
  // Detectar y registrar posibles ataques
  const userAgent = req.headers["user-agent"] || "";
  const requestUrl = req.originalUrl || req.url;
  
  // Detectar posibles intentos de escaneo o ataques
  const patrones = [
    /\.(php|asp|aspx|jsp|cgi|env|git|sql|bak)$/i,
    /\/(wp-admin|wp-content|wp-login|admin|administrator|phpmyadmin|mysql|dbadmin)/i,
    /(union\s+select|information_schema|sysdatabases|etc\/passwd|\/etc\/shadow)/i
  ];
  
  if (patrones.some(patron => patron.test(requestUrl))) {
    registrar(`Posible intento de escaneo detectado: ${requestUrl} desde ${req.ip} (${userAgent})`, "warn");
  }

  next();
}
