import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determinar el entorno actual
const ENV = process.env.NODE_ENV || 'development';

// Configuración base
const config = {
  // Entorno
  ENV,
  IS_PROD: ENV === 'production',
  IS_DEV: ENV === 'development',
  IS_TEST: ENV === 'test',

  // Servidor
  PORT: process.env.PORT || 3001,
  HOST: process.env.HOST || '0.0.0.0',

  // Seguridad - Validar que los secretos estén configurados en producción
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'cookie-secret-dev-only',
  SESSION_SECRET: process.env.SESSION_SECRET || 'session-secret-dev-only',
  CSRF_SECRET: process.env.CSRF_SECRET || 'csrf-secret-dev-only',

  // Rate limiting: configuración desde variables de entorno
  RATE_LIMIT: {
    WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 5 * 60 * 1000, // 5 minutos
    MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 500,        // 500 solicitudes en 5 minutos
    STORE_SIZE: 10000
  },

  // Rutas
  PATHS: {
    ROOT: path.resolve(__dirname, '..'),
    UPLOADS: path.resolve(__dirname, '../../uploads'),
    LOGS: path.resolve(__dirname, '../../logs'),
    CONTENT: path.resolve(__dirname, '../../contenido_protegido')
  },

  // Caché
  CACHE: {
    STATIC_MAX_AGE: ENV === 'production' ? '1d' : 0,
    MEMOIZE_SIZE: 500
  },

  // Límites
  LIMITS: {
    JSON_BODY: '50kb',
    FORM_BODY: '50kb',
    FILE_SIZE: 5 * 1024 * 1024, // 5MB
    JSON_FIELD_LENGTH: 1000,
    JSON_ARRAY_SIZE: 100,
    JSON_MAX_PROPERTIES: 50
  },

  // Correo
  EMAIL: {
    FROM: 'noreply@dav-tech.work',
    ADMIN: 'danielarribasvelazquez@dav-tech.work'
  },

  // Logging
  LOG: {
    LEVEL: ENV === 'production' ? 'info' : 'debug',
    FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_FILES: 5
  },

  // CSP Configuration - Función que genera la política CSP con nonce
  CSP: (nonce) => {
    const directives = [
      "default-src 'none'",
      `script-src 'self' 'nonce-${nonce}' https://cdnjs.cloudflare.com`,
      "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
      "img-src 'self' data:",
      "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
      "connect-src 'self'",
      "manifest-src 'self'",
      "base-uri 'none'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "frame-src 'self'"
    ];
    return directives.join('; ');
  },

  // Dominios bloqueados
  BLACKLISTED_DOMAINS: ['evil.com', 'malware.org', 'phishing.net']
};

// Asegurar que las carpetas necesarias existan
try {
  Object.values(config.PATHS).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
} catch (error) {
  console.warn('Warning: Could not create directories:', error.message);
}

export default config;
