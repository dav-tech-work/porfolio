// src/scripts/checkCSP.mjs
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const posiblesRutas = [
  "../../views/partials/head.ejs",
  "../../views/shared/head.ejs",
  "../views/partials/head.ejs",
  "../../public/partials/head.ejs"
];

let archivoEncontrado = null;
for (const rutaRelativa of posiblesRutas) {
  const ruta = path.resolve(__dirname, rutaRelativa);
  try {
    await fs.access(ruta);
    archivoEncontrado = ruta;
    break;
  } catch {}
}

if (!archivoEncontrado) {
  console.error("❌ No se encontró ningún archivo head.ejs en rutas conocidas.");
  process.exit(1);
}

const contenido = await fs.readFile(archivoEncontrado, "utf-8");
if (contenido.includes("Content-Security-Policy")) {
  console.log(`✅ Política CSP detectada en: ${archivoEncontrado}`);
} else {
  console.warn(`⚠️ No se detectó ninguna política CSP en: ${archivoEncontrado}`);
}
