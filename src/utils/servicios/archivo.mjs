import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
export async function guardarArchivo(nombre, contenidoBuffer) {
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
