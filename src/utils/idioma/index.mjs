import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Carga el archivo de idioma correspondiente al código recibido.
 * Hace fallback a "es" si el idioma no existe o es inválido.
 * @param {string} lang - Código del idioma, por ejemplo "es", "en", "pt-br".
 * @returns {Object} - Objeto con las traducciones o vacío si falla.
 */
function cargarIdioma(lang = "es") {
  const rutaIdioma = path.resolve(__dirname, "..", "..", "contenido_protegido", "i18n", `${lang}.json`);

  if (process.env.NODE_ENV !== "production") {
    console.log(`📁 Buscando archivo de idioma: ${rutaIdioma}`);
  }

  if (!fs.existsSync(rutaIdioma)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`⚠️ Archivo de idioma '${lang}' no encontrado.`);
    }
    return lang !== "es" ? cargarIdioma("es") : {};
  }

  try {
    const contenido = fs.readFileSync(rutaIdioma, "utf-8");
    const json = JSON.parse(contenido);
    if (typeof json !== "object" || Array.isArray(json)) {
      throw new Error("El contenido no es un objeto válido.");
    }
    return json;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`⚠️ Error al parsear '${lang}.json': ${err.message}`);
    }
    return lang !== "es" ? cargarIdioma("es") : {};
  }
}

/**
 * Función externa para obtener traducciones.
 * @param {string} lang
 * @returns {Object} traducciones
 */
function obtenerTraducciones(lang = "es") {
  return cargarIdioma(lang);
}

export { obtenerTraducciones, cargarIdioma };
