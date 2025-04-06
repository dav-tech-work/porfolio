const fs = require("fs");
const path = require("path");

const RUTA_IDIOMAS = path.join(__dirname, "..", "..", "contenido_protegido", "i18n");

function obtenerTraducciones(lang = "es") {
  const archivo = path.join(RUTA_IDIOMAS, `${lang}.json`);
  console.log(`📁 Buscando archivo de idioma en: ${archivo}`);

  try {
    if (!fs.existsSync(archivo)) {
      console.warn(`⚠️ Idioma '${lang}' no encontrado.`);
      return {};
    }

    const contenido = fs.readFileSync(archivo, "utf8");
    return JSON.parse(contenido);
  } catch (err) {
    console.error(`❌ Error al cargar traducciones para '${lang}':`, err.message);
    return {};
  }
}

module.exports = {
  obtenerTraducciones
};
