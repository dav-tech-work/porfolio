import { registrar } from "../utils/servicios/logger.mjs";

function loggerMiddleware(req, res, next) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ignorar = ["/favicon.ico", "/robots.txt", "/sitemap.xml"];

  if (
    ignorar.includes(req.originalUrl) ||
    req.originalUrl.startsWith("/assets") ||
    req.originalUrl.startsWith("/contenido_protegido/assets")
  ) {
    return next();
  }

  res.on("finish", () => {
    const mensaje = `${ip} ${req.method} ${req.originalUrl} ${res.statusCode}`;
    registrar(mensaje, "info");
  });

  next();
}

export default loggerMiddleware;
