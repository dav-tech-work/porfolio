import crypto from 'crypto';
import { registrar } from '../utils/servicios/logger.mjs';

/**
 * Middleware personalizado para protección CSRF
 * Reemplaza csurf que está desactualizado
 */

// Generar token CSRF
function generateCSRFToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Verificar token CSRF
function validateCSRFToken(sessionToken, requestToken) {
    if (!sessionToken || !requestToken) {
        return false;
    }
    return crypto.timingSafeEqual(
        Buffer.from(sessionToken, 'hex'),
        Buffer.from(requestToken, 'hex')
    );
}

// Middleware para generar y adjuntar token CSRF
export function attachCSRFToken(req, res, next) {
    // Generar token si no existe en la sesión
    if (!req.session?.csrfToken) {
        if (!req.session) {
            req.session = {};
        }
        req.session.csrfToken = generateCSRFToken();
    }

    // Hacer el token disponible en las vistas
    res.locals.csrfToken = req.session.csrfToken;

    next();
}

// Middleware para verificar token CSRF
export function verifyCSRFToken(req, res, next) {
    // Métodos que requieren verificación CSRF
    const methodsToCheck = ['POST', 'PUT', 'DELETE', 'PATCH'];

    if (!methodsToCheck.includes(req.method)) {
        return next();
    }

    const sessionToken = req.session?.csrfToken;
    const requestToken = req.body._csrf || req.headers['x-csrf-token'];

    if (!validateCSRFToken(sessionToken, requestToken)) {
        registrar(`Intento de CSRF detectado desde IP: ${req.ip} en ruta: ${req.originalUrl}`, 'warn');
        return res.status(403).json({
            error: 'Token CSRF inválido',
            code: 'CSRF_INVALID'
        });
    }

    next();
}

// Middleware combinado para rutas que necesitan ambos
export default function csrfProtection(req, res, next) {
    attachCSRFToken(req, res, (err) => {
        if (err) return next(err);
        verifyCSRFToken(req, res, next);
    });
}
