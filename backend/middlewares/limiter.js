const RateLimiter = require("../utils/seguridad/ratelimiter");
const logger = require("../utils/servicios/logger");

// Global (dev o prod, según entorno)
const globalLimiter = new RateLimiter(
  process.env.NODE_ENV === "production" ? 20 : 100,
  60 * 1000
);

// Más agresivo para formularios de login/contacto
const formLimiter = new RateLimiter(5, 60 * 1000); // 5 por minuto

function rateLimitWrapper(limiterInstance, nombre = "global") {
  return function (req, res, next) {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (!limiterInstance.permitir(ip)) {
      logger.warn(`⛔ Rate limit (${nombre}) excedido para IP: ${ip}`);
      res.set("Retry-After", "60");
      return res.status(429).send("⛔ Demasiadas solicitudes. Espera un poco.");
    }
    next();
  };
}

module.exports = {
  globalLimiter: rateLimitWrapper(globalLimiter, "global"),
  contactoLimiter: rateLimitWrapper(formLimiter, "contacto"),
  loginLimiter: rateLimitWrapper(formLimiter, "login")
};
