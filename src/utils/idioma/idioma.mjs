import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Función para obtener las traducciones del idioma solicitado.
 * Busca el archivo JSON en "contenido_protegido/i18n".
 *
 * @param {string} lang - Código del idioma (por ejemplo, "es", "en", "cat").
 * @returns {object} Objeto con las traducciones, o un objeto vacío en caso de error.
 */
export function obtenerTraducciones(lang) {
  try {
    // Configurar __dirname en ES Modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Desde "src/utils/idioma", se sube dos niveles para llegar a la raíz y de allí a "contenido_protegido/i18n"
    const ruta = path.join(__dirname, "..", "..", "contenido_protegido", "i18n", `${lang}.json`);

    if (fs.existsSync(ruta)) {
      const datos = fs.readFileSync(ruta, "utf-8");
      return JSON.parse(datos);
    } else {
      console.error(`Archivo de traducción no encontrado: ${ruta}`);
      return {};
    }
  } catch (error) {
    console.error("Error al cargar traducciones:", error);
    return {};
  }
}
