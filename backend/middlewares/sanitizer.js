// middlewares/sanitizer.js
const { sanitize } = require("../utils/seguridad/sanitize");
const { validate } = require("../utils/seguridad/validate");

const esquemas = {
  "/contacto": {
    email: [validate.email, (v) => v.trim().toLowerCase()],
    nombre: [validate.text, sanitize.text],
    mensaje: [validate.text, sanitize.text]
  },
  "/test": {
    nombre: [validate.text, sanitize.text]
  }
  // Puedes seguir añadiendo rutas aquí
};

function procesar(obj, esquema) {
  const limpio = {};
  for (const campo in esquema) {
    const [validador, limpiador] = esquema[campo];
    const valor = obj[campo];

    if (!validador(valor)) continue;

    limpio[campo] = limpiador ? limpiador(valor) : valor;
  }
  return limpio;
}

function sanitizerMiddleware(req, res, next) {
  const rutaBase = req.route?.path || req.originalUrl?.split("?")[0];

  const esquema = esquemas[rutaBase];

  if (esquema && req.body) req.body = procesar(req.body, esquema);
  else if (req.body) req.body = sanitize.json(req.body);

  if (req.query) req.query = sanitize.json(req.query);
  if (req.params) req.params = sanitize.json(req.params);

  next();
}

module.exports = sanitizerMiddleware;
