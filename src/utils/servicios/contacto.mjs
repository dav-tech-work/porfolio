import { validarEmail } from "../seguridad/validate.mjs";
import { sanitize } from "../seguridad/sanitize.mjs";

export async function procesarFormularioContacto(req) {
  const { body, session } = req;

  // Extraer campos relevantes
  const { email, mensaje, nombre, website, _csrf: tokenCliente } = body;
  const tokenServidor = session?.csrfToken;

  // CSRF - Verificación manual usando crypto.timingSafeEqual
  if (!tokenCliente || !tokenServidor) {
    return { ok: false, error: "Token CSRF inválido." };
  }

  try {
    const crypto = await import('crypto');
    if (!crypto.timingSafeEqual(
      Buffer.from(tokenServidor, 'hex'),
      Buffer.from(tokenCliente, 'hex')
    )) {
      return { ok: false, error: "Token CSRF inválido." };
    }
  } catch (error) {
    return { ok: false, error: "Error de validación CSRF." };
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
