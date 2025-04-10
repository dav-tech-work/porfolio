import { validarEmail } from "../seguridad/validate.mjs";
import { sanitize } from "../seguridad/sanitize.mjs";
import csrf from "../seguridad/olds/csrf.mjs";

export function procesarFormularioContacto(req) {
  const { body, cookies } = req;

  // Extraer campos relevantes
  const { email, mensaje, nombre, website, csrf: tokenCliente } = body;
  const tokenServidor = cookies.csrfToken;

  // CSRF
  if (!csrf.validarToken(tokenCliente, tokenServidor)) {
    return { ok: false, error: "Token CSRF inválido." };
  }

  // Honeypot
  if (website && website.trim() !== "") {
    return { ok: false, error: "Spam detectado." };
  }

  // Validación básica
  if (!email || !validarEmail(email)) {
    return { ok: false, error: "Email inválido." };
  }

  if (!mensaje || mensaje.length < 5 || mensaje.length > 1000) {
    return { ok: false, error: "Mensaje fuera de rango." };
  }

  // Sanitizar
  const datosSanitizados = sanitize.json({ email, nombre, mensaje });

  return {
    ok: true,
    datos: datosSanitizados
  };
}
