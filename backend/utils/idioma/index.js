// backend/utils/idioma/index.js
const path = require("path");
const fs = require("fs");

function cargarIdioma(lang = "es") {
  const idiomaPath = path.resolve(__dirname, "../../../contenido_protegido/i18n", `${lang}.json`);

  console.log("📁 Buscando archivo de idioma en:", idiomaPath); // útil para depurar

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

module.exports = {
  obtenerTraducciones,
  cargarIdioma
};
