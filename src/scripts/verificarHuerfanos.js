import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ajusta si tu código fuente está en otra carpeta base
const ruta_base = path.resolve(__dirname, "../..");

// Extensiones de archivos a considerar
const extensiones = [".js", ".mjs", ".html", ".ejs", ".css"];

// Archivos o carpetas a ignorar
const ignorar = ["node_modules", ".git", "logs", "dist", "coverage", "tmp", "assets/img"];

// Recorre todo el proyecto y lista archivos con extensiones válidas
function listarArchivos(dir) {
  let archivos = [];
  for (const entrada of fs.readdirSync(dir)) {
    const ruta = path.join(dir, entrada);
    const stat = fs.statSync(ruta);
    const relativa = path.relative(ruta_base, ruta);

    if (ignorar.some(p => relativa.includes(p))) continue;

    if (stat.isDirectory()) {
      archivos = archivos.concat(listarArchivos(ruta));
    } else if (extensiones.includes(path.extname(ruta))) {
      archivos.push(ruta);
    }
  }
  return archivos;
}

// Buscar referencias dentro del contenido de los archivos
function buscarReferencias(archivos) {
  const referencias = new Set();

  for (const archivo of archivos) {
    const contenido = fs.readFileSync(archivo, "utf-8");

    // Buscar patrones comunes de inclusión o importación
    const matches = [
      ...contenido.matchAll(/(?:import|require|src=|href=|fetch\(|readFileSync\(|readFile\()["'`](.+?)["'`]/g)
    ];

    for (const [, match] of matches) {
      const refPath = match.split(/[?#]/)[0]; // Elimina query params
      if (refPath.startsWith(".")) {
        const origen = path.dirname(archivo);
        const destino = path.resolve(origen, refPath);
        extensiones.forEach(ext => referencias.add(destino + ext));
      } else {
        referencias.add(refPath);
      }
    }
  }

  return referencias;
}

// --- EJECUCIÓN ---

const todos_los_archivos = listarArchivos(ruta_base);
const referencias = buscarReferencias(todos_los_archivos);

const huerfanos = todos_los_archivos.filter(archivo => {
  const normalizado = path.resolve(archivo);
  return !Array.from(referencias).some(ref => path.resolve(ref) === normalizado);
});

console.log("\n📦 Verificación de archivos huérfanos:\n");
if (huerfanos.length === 0) {
  console.log("✅ No se han encontrado archivos huérfanos.");
} else {
  for (const archivo of huerfanos) {
    console.log(`❌ ${archivo}`);
  }
}
