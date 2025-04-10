import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Determina el tipo de página (para cargar CSS personalizado).
 * @param {string} nombrePagina - Nombre base del HTML (sin extensión).
 * @returns {Promise<string|null>} - Devuelve el nombre si hay CSS, si no devuelve null.
 */
export default async function determinarTipo(nombrePagina) {
  // Validar nombre para evitar path traversal o caracteres peligrosos
  const valido = /^[a-zA-Z0-9_-]+$/.test(nombrePagina);
  if (!valido) return null;

  const rutaCss = path.join(
    __dirname,
    "..", "..",
    "contenido_protegido",
    "assets",
    "css",
    "secciones",
    `${nombrePagina}.css`
  );

  try {
    await fs.access(rutaCss);
    return nombrePagina;
  } catch {
    return null;
  }
}
