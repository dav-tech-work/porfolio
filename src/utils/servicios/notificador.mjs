/**
 * Envía una notificación externa (Telegram, Discord, Slack, etc.)
 * @param {Object} opciones
 * @param {string} opciones.tipo - Tipo de notificación: "telegram", "discord", "slack"
 * @param {string} opciones.destino - ID o URL del canal/destinatario
 * @param {string} opciones.mensaje - Contenido del mensaje
 * @returns {Object}
 */
export function enviarNotificacion({ tipo, destino, mensaje }) {
  if (!tipo || !destino || !mensaje) {
    return { ok: false, error: "Parámetros incompletos" };
  }

  const permitidos = ["telegram", "discord", "slack"];
  if (!permitidos.includes(tipo)) {
    return { ok: false, error: `Tipo de notificación no permitido: ${tipo}` };
  }

  // Aquí iría la lógica real de envío (futura implementación)
  // Ej: enviarATelegram(destino, mensaje)

  return {
    ok: true,
    pendiente: true,
    info: `Notificación preparada para ${tipo} -> ${destino}`
  };
}
