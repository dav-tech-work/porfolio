const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "..", "..", "..", "logs");

// Crear carpeta si no existe
if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath, { recursive: true });
}

/**
 * Registra un mensaje en el log.
 * @param {string} mensaje - Contenido del mensaje.
 * @param {string} tipo - Tipo de log: info, error, warn, etc.
 */
function registrar(mensaje, tipo = "info") {
  const timestamp = new Date().toISOString();
  const entrada = `[${timestamp}] [${tipo.toUpperCase()}] ${mensaje}`;

  // Mostrar en consola
  console.log(entrada);

  // Escribir asíncronamente en el log
  const archivoLog = path.join(logPath, "app.log");
  fs.appendFile(archivoLog, entrada + "\n", (err) => {
    if (err) {
      console.error("❌ Error al escribir en el log:", err.message);
    }
  });
}

module.exports = { registrar };
