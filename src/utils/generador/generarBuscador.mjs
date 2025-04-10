import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Actualiza la ruta: se asume que ahora las vistas están en "views"
const RUTA_PAGINAS = path.join(__dirname, "..", "..", "views", "paginas");
const SALIDA_JSON = path.join(__dirname, "..", "..", "contenido_protegido", "assets", "data", "buscador.json");

// Asegurar que la carpeta para el archivo JSON existe
fs.mkdirSync(path.dirname(SALIDA_JSON), { recursive: true });

function extraerTextoPlano(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function generarBuscador() {
  const archivos = fs.readdirSync(RUTA_PAGINAS).filter(f => f.endsWith(".ejs"));

  const resultados = archivos.map(nombreArchivo => {
    const nombre = path.basename(nombreArchivo, ".ejs");
    const slug = nombre;
    const ruta = slug === "index" ? "/" : `/pagina/${slug}`;
    const contenidoEJS = fs.readFileSync(path.join(RUTA_PAGINAS, nombreArchivo), "utf8");

    const matchTitulo = contenidoEJS.match(/<title>(.*?)<\/title>/i);
    const titulo = matchTitulo?.[1]?.trim() || slug;

    const matchResumen = contenidoEJS.match(/<!--\s*buscador:\s*(.*?)\s*-->/i);
    const contenido = matchResumen?.[1]?.trim() || extraerTextoPlano(contenidoEJS).slice(0, 300);

    return { titulo, slug, ruta, contenido };
  });

  fs.writeFileSync(SALIDA_JSON, JSON.stringify(resultados, null, 2));
  console.log(`✅ buscador.json generado con ${resultados.length} entradas.`);
}

generarBuscador();
