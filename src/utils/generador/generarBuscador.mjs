import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RUTA_PAGINAS = path.join(__dirname, "..", "..", "views", "paginas");
const SALIDA_JSON = path.join(__dirname, "..", "..", "contenido_protegido", "assets", "data", "buscador.json");

fs.mkdirSync(path.dirname(SALIDA_JSON), { recursive: true });

function extraerTextoPlano(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function generarBuscador() {
  try {
    const archivos = fs.readdirSync(RUTA_PAGINAS)
      .filter(f => f.endsWith(".ejs") && !f.includes("404") && !f.includes("error"));

    const resultados = archivos.map(archivo => {
      const ruta = path.join(RUTA_PAGINAS, archivo);
      try {
        const contenido = fs.readFileSync(ruta, "utf-8");
        return {
          archivo: archivo.replace(".ejs", ""),
          texto: extraerTextoPlano(contenido)
        };
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`⚠️ No se pudo leer el archivo ${archivo}: ${e.message}`);
        }
        return null;
      }
    }).filter(Boolean);

    fs.writeFileSync(SALIDA_JSON, JSON.stringify(resultados, null, 2), "utf-8");

    if (process.env.NODE_ENV !== "production") {
      console.log(`✅ Buscador generado: ${resultados.length} páginas indexadas.`);
    }
  } catch (err) {
    console.error("❌ Error al generar el buscador:", err.message);
  }
}

// Si se ejecuta directamente
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generarBuscador();
}

export { generarBuscador };
