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
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || '0.0.0.0',

  // Seguridad
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'cookie-secret-dev-only',
  SESSION_SECRET: process.env.SESSION_SECRET || 'session-secret-dev-only',
  CSRF_SECRET: process.env.CSRF_SECRET || 'csrf-secret-dev-only',

  // Rate limiting: ajustado a 500 solicitudes en 5 minutos
  RATE_LIMIT: {
    WINDOW_MS: 0 * 60 * 1000, // 5 minutos
    MAX_REQUESTS: 3500,        // Aumentado de 200 a 500 solicitudes en 5 minutos
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
    FILE_SIZE: 5 * 1024 * 1024 // 5MB
  },

  // Correo
  EMAIL: {
    FROM: 'noreply@example.com',
    ADMIN: 'danielarribasvelazquez@dav-tech.work'
  },

  // Logging
  LOG: {
    LEVEL: ENV === 'production' ? 'info' : 'debug',
    FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_FILES: 5
  }
};

// Asegurar que las carpetas necesarias existan
Object.values(config.PATHS).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

export default config;
