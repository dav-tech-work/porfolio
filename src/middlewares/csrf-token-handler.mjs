/**
 * Middleware para adjuntar el token CSRF a res.locals.
 *
 * Se asume que el middleware csurf ya ha sido aplicado previamente.
 *
 * @param {import('express').Request} req - La solicitud Express.
 * @param {import('express').Response} res - La respuesta Express.
 * @param {import('express').NextFunction} next - Función de siguiente middleware.
 */
export function attachCsrfToken(req, res, next) {
    try {
      // Obtén el token CSRF proporcionado por csurf
      const token = req.csrfToken();
      res.locals.csrfToken = token;
      next();
    } catch (error) {
      next(error);
    }
  }
  