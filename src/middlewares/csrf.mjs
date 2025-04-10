import crypto from "crypto";

/**
 * Genera un token CSRF único.
 *
 * @returns {string} Token CSRF generado.
 */
export function generarTokenCSRF() {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Valida que dos tokens CSRF sean iguales utilizando comparación segura.
 *
 * @param {string} tokenRecibido - Token proporcionado por el cliente.
 * @param {string} tokenGuardado - Token que se tiene almacenado en el servidor.
 * @returns {boolean} True si son iguales, false en caso contrario.
 */
export function validarTokenCSRF(tokenRecibido, tokenGuardado) {
  if (!tokenRecibido || !tokenGuardado) return false;
  try {
    // Verifica que ambos tokens tengan la misma longitud
    if (tokenRecibido.length !== tokenGuardado.length) return false;
    // Realiza una comparación segura
    return crypto.timingSafeEqual(
      Buffer.from(tokenRecibido),
      Buffer.from(tokenGuardado)
    );
  } catch (err) {
    return false;
  }
}
