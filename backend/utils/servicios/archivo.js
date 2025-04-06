const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Si usás UUID (opcional)

const carpetaUploads = path.join(__dirname, "..", "..", "..", "uploads");

if (!fs.existsSync(carpetaUploads)) {
  fs.mkdirSync(carpetaUploads, { recursive: true });
}

/**
 * Guarda un archivo binario en disco de forma segura.
 * @param {string} nombre - Nombre original del archivo.
 * @param {Buffer} contenidoBuffer - Contenido del archivo.
 * @returns {Promise<{ok: boolean, ruta?: string, error?: string}>}
 */
async function guardarArchivo(nombre, contenidoBuffer) {
  if (!nombre || !Buffer.isBuffer(contenidoBuffer)) {
    return { ok: false, error: "Datos inválidos" };
  }

  // Normalizar y evitar sobrescrituras
  const ext = path.extname(nombre).toLowerCase();
  const nombreSeguro = `${Date.now()}-${uuidv4()}${ext}`;
  const ruta = path.join(carpetaUploads, nombreSeguro);

  try {
    await fs.promises.writeFile(ruta, contenidoBuffer);
    return { ok: true, ruta };
  } catch (err) {
    console.error("❌ Error al guardar archivo:", err.message);
    return { ok: false, error: "No se pudo guardar el archivo." };
  }
}

module.exports = { guardarArchivo };
