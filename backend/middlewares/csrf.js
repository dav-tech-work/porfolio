const csrf = require("../utils/seguridad/csrf");
const logger = require("../utils/servicios/logger");

// Función para derivar un ID único de cliente (usado como sal de firma)
function obtenerIdentificadorCliente(req) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"] || "navegador-desconocido";
  return `${ip}_${userAgent}`;
}

function generarTokenCSRF(req, res, next) {
  const identificador = obtenerIdentificadorCliente(req);

  if (!req.cookies.csrfToken) {
    const token = csrf.generarToken(identificador);

    const cookieOptions = {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 24h
    };

    res.cookie("csrfToken", token, cookieOptions);
    req.csrfToken = token;
  } else {
    req.csrfToken = req.cookies.csrfToken;
  }

  res.locals.csrfToken = req.csrfToken;
  next();
}

function validarTokenCSRF(req, res, next) {
  const identificador = obtenerIdentificadorCliente(req);
  const tokenCliente = req.body.csrf || req.headers["x-csrf-token"];
  const tokenServidor = req.cookies.csrfToken;

  if (!csrf.validarToken(tokenCliente, tokenServidor, identificador)) {
    logger.warn(`⛔ CSRF inválido desde ${req.ip} - Token: ${tokenCliente || "ninguno"}`);
    return res.status(403).send("⛔ Solicitud no permitida.");
  }

  next();
}

module.exports = {
  generarTokenCSRF,
  validarTokenCSRF
};
