// verificarImportaciones.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, "../..");
const extensionesValidas = [".js", ".mjs"];
const rutasIgnoradas = ["node_modules", ".git", "dist", "logs"];
const rutasImportacionIgnoradas = [
  "public/assets/js", // Ignorar todo lo de frontend construido
];

const importRegex = /import\s+(?:[^'"\n]+\s+from\s+)?["']([^"']+)["']/g;

const errores = [];

function estaIgnorada(ruta) {
  const normalizada = ruta.split(path.sep).join("/");
  return rutasIgnoradas.some(p => normalizada.includes(`/${p}/`));
}

function ignorarRutaDeImportacion(rutaArchivo) {
  const normalizada = rutaArchivo.split(path.sep).join("/");
  return rutasImportacionIgnoradas.some(p => normalizada.includes(p));
}

function resolverRutaImport(rutaBase, importPath) {
  if (importPath.startsWith(".")) {
    const completa = path.resolve(path.dirname(rutaBase), importPath);
    for (const ext of extensionesValidas) {
      if (fs.existsSync(completa + ext)) return completa + ext;
      if (fs.existsSync(path.join(completa, "index" + ext))) return path.join(completa, "index" + ext);
    }
    return null;
  }
  return "externa"; // ignoramos paquetes externos por ahora
}

function analizarArchivo(rutaArchivo) {
  if (ignorarRutaDeImportacion(rutaArchivo)) return;

  const contenido = fs.readFileSync(rutaArchivo, "utf-8");
  let match;

  while ((match = importRegex.exec(contenido)) !== null) {
    const importPath = match[1];
    const rutaResuelta = resolverRutaImport(rutaArchivo, importPath);
    if (rutaResuelta === null) {
      errores.push({ archivo: rutaArchivo, tipo: "Importación rota", detalle: importPath });
    }
  }
}

function recorrerArchivos(directorio) {
  for (const archivo of fs.readdirSync(directorio)) {
    const ruta = path.join(directorio, archivo);
    const stat = fs.statSync(ruta);
    if (estaIgnorada(ruta)) continue;
    if (stat.isDirectory()) {
      recorrerArchivos(ruta);
    } else if (extensionesValidas.includes(path.extname(ruta))) {
      analizarArchivo(ruta);
    }
  }
}

// Ejecutar análisis
recorrerArchivos(baseDir);

// Mostrar resultados
console.log("\n📦 Verificación de importaciones:\n");

if (errores.length === 0) {
  console.log("✅ Todas las importaciones locales son válidas.");
} else {
  for (const err of errores) {
    console.log(`❌ ${err.archivo} → [${err.tipo}] ${err.detalle}`);
  }
}
