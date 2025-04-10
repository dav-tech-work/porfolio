import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configurar __filename y __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cargarIdioma(lang = "es") {
  // Desde "src/utils/idioma", sube dos niveles para llegar a "src" y luego a "contenido_protegido/i18n"
  const idiomaPath = path.resolve(__dirname, "..", "..", "contenido_protegido", "i18n", `${lang}.json`);

  console.log("📁 Buscando archivo de idioma en:", idiomaPath);

  if (!fs.existsSync(idiomaPath)) {
    console.warn(`⚠️ Idioma '${lang}' no encontrado.`);
    if (lang !== "es") {
      return cargarIdioma("es");
    }
    return {};
  }

  try {
    const contenido = fs.readFileSync(idiomaPath, "utf-8");
    return JSON.parse(contenido);
  } catch (err) {
    console.warn(`⚠️ Error al parsear idioma '${lang}':`, err.message);
    return {};
  }
}

function obtenerTraducciones(lang = "es") {
  return cargarIdioma(lang);
}

export { obtenerTraducciones, cargarIdioma };
