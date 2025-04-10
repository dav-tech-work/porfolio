import rateLimit from 'express-rate-limit';
import config from '../config/index.mjs';
import { registrar } from '../utils/servicios/logger.mjs';

const staticExtensions = [
  '.js', '.css', '.png', '.jpg', '.jpeg', '.gif',
  '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'
];

const rateLimitMiddleware = rateLimit({
  windowMs: config.RATE_LIMIT.WINDOW_MS, // Ejemplo: 15 minutos
  max: config.RATE_LIMIT.MAX_REQUESTS,    // Ejemplo: 100 solicitudes por IP
  // Excluir recursos estáticos para que no cuenten en el límite:
  skip: (req, res) => {
    return staticExtensions.some(ext => req.path.endsWith(ext));
  },
  // Handler para solicitudes que excedan el límite:
  handler: (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const ruta = req.originalUrl || req.url;
    registrar(`Rate limit excedido para IP: ${ip} en ruta: ${ruta}`, "warn");
    const retryAfter = Math.ceil(config.RATE_LIMIT.WINDOW_MS / 1000);
    res.set("Retry-After", retryAfter.toString());
    res.status(429).json({
      error: "Demasiadas solicitudes. Por favor, intenta más tarde.",
      retryAfter: retryAfter
    });
  }
});

export default rateLimitMiddleware;
