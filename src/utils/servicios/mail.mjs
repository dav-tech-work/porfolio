export function prepararCorreo({ de, para, asunto, mensaje }) {
  // Validación básica de campos obligatorios
  if (!de || !para || !asunto || !mensaje) {
    return { ok: false, error: "Faltan campos obligatorios." };
  }

  // Validación básica de formato de correo
  const emailRegex = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i;

  if (!emailRegex.test(de) || !emailRegex.test(para)) {
    return { ok: false, error: "Formato de correo inválido." };
  }

  // Preparación del mensaje
  const contenido = {
    from: de,
    to: para,
    subject: asunto,
    text: mensaje,
    html: `<p>${mensaje.replace(/\\n/g, "<br>")}</p>` // opción html opcional
  };

  return {
    ok: true,
    contenido
  };
}
