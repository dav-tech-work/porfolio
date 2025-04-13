import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensionesValidas = [".js", ".mjs", ".html", ".ejs"];
const carpetasIgnoradas = ["node_modules", "dist", "logs", ".git", "tmp", "coverage"];
const rutasIgnoradas = [
  "public/assets/programacion",      // contenido educativo
  "src/scripts/verificarCodigo.js", // para no autoanalizarse
];

// Errores que sí están permitidos en rutas específicas (falsos positivos conocidos)
const falsosPositivos = [
  { ruta: "src/utils/seguridad/sanitize.mjs", tipo: "Uso de var" },
  { ruta: "public/pages/sistemas/practica_02.html", tipo: "Uso de var" },
  { ruta: "public/pages/sistemas/practica_02.html", tipo: "Script sin type=module" },
  { ruta: "src/scripts/checkCSP.mjs", tipo: "Uso de console.log" },
  { ruta: "src/scripts/checkHelmet.mjs", tipo: "Uso de console.log" },
  { ruta: "src/scripts/checkRoutes.mjs", tipo: "Uso de console.log" },
  { ruta: "src/utils/generador/generarBuscador.mjs", tipo: "Uso de console.log" },
  { ruta: "src/utils/idioma/index.mjs", tipo: "Uso de console.log" },
  { ruta: "src/utils/optimizacion/tiempoEjecucion.mjs", tipo: "Uso de console.log" }
];


// Excepciones para plantillas que no cumplen con los estándares de HTML5
const excepcionesPlantillas = [
  { ruta: "src/views/partials/", tipo: "DOCTYPE faltante" },
  { ruta: "src/views/partials/", tipo: "Etiqueta mal cerrada" },
  { ruta: "src/views/partials/", tipo: "Script sin type=module" },
  { ruta: "src/views/partials/", tipo: "Uso de console.log" },
  { ruta: "src/views/partials/head.ejs", tipo: "Uso de console.log" },
  { ruta: "src/views/partials/head.ejs", tipo: "Script sin type=module" },
  { ruta: "src/views/layout.ejs", tipo: "Etiqueta mal cerrada" },
  { ruta: "src/views/layout.ejs", tipo: "DOCTYPE faltante" },
  { ruta: "src/views/paginas/", tipo: "DOCTYPE faltante" },
  { ruta: "src/views/paginas/", tipo: "Etiqueta mal cerrada" },
  { ruta: "src/views/test.ejs", tipo: "DOCTYPE faltante" }
];

const baseDir = path.resolve(__dirname, "../..");
const erroresDetectados = [];

function estaIgnorada(ruta) {
  const normalizada = ruta.split(path.sep).join("/");
  return rutasIgnoradas.some(p => normalizada.includes(p)) ||
         carpetasIgnoradas.some(carp => normalizada.includes(`/${carp}/`));
}

function esFalsoPositivo(ruta, tipo) {
  const normalizada = ruta.split(path.sep).join("/");
  return falsosPositivos.some(fp => normalizada.includes(fp.ruta) && tipo === fp.tipo)
      || excepcionesPlantillas.some(ex => normalizada.includes(ex.ruta) && tipo === ex.tipo);
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

function analizarArchivo(rutaArchivo) {
  try {
    const contenido = fs.readFileSync(rutaArchivo, "utf-8");

    if (/\bvar\b/.test(contenido)) {
      const tipo = "Uso de var";
      if (!esFalsoPositivo(rutaArchivo, tipo)) {
        erroresDetectados.push({ archivo: rutaArchivo, tipo, detalle: "Evita usar 'var', prefiere 'let' o 'const'." });
      }
    }

    if (/\bconsole\.log\b/.test(contenido)) {
      const tipo = "Uso de console.log";
      if (!esFalsoPositivo(rutaArchivo, tipo)) {
        erroresDetectados.push({ archivo: rutaArchivo, tipo, detalle: "No dejes console.log en producción." });
      }
    }

    if (/\bdebugger\b/.test(contenido)) {
      erroresDetectados.push({ archivo: rutaArchivo, tipo: "Uso de debugger", detalle: "No dejes debugger en el código final." });
    }

    const aperturaComentarios = (contenido.match(/\/\*/g) || []).length;
    const cierreComentarios = (contenido.match(/\*\//g) || []).length;
    if (aperturaComentarios !== cierreComentarios) {
      const tipo = "Comentario sin cerrar";
      if (!esFalsoPositivo(rutaArchivo, tipo)) {
        erroresDetectados.push({ archivo: rutaArchivo, tipo, detalle: "Hay comentarios /* sin su cierre */ correspondiente." });
      }
    }

    if (rutaArchivo.endsWith(".html") || rutaArchivo.endsWith(".ejs")) {
      if (!/<!DOCTYPE\s+html>/i.test(contenido)) {
        const tipo = "DOCTYPE faltante";
        if (!esFalsoPositivo(rutaArchivo, tipo)) {
          erroresDetectados.push({ archivo: rutaArchivo, tipo, detalle: "Falta <!DOCTYPE html> al inicio del archivo." });
        }
      }

      if (/<html[\s>]/.test(contenido) && !/<\/html>/.test(contenido)) {
        const tipo = "Etiqueta html sin cerrar";
        if (!esFalsoPositivo(rutaArchivo, tipo)) {
          erroresDetectados.push({ archivo: rutaArchivo, tipo, detalle: "Falta </html>" });
        }
      }

      const scripts = [...contenido.matchAll(/<script\s+[^>]*>/g)];
      for (const script of scripts) {
        if (!/type\s*=\s*['"]module['"]/.test(script[0]) && /src=/.test(script[0])) {
          const tipo = "Script sin type=module";
          if (!esFalsoPositivo(rutaArchivo, tipo)) {
            erroresDetectados.push({ archivo: rutaArchivo, tipo, detalle: "Falta type=\"module\" en un script con src externo." });
          }
        }
      }

      const scriptSrcs = [...contenido.matchAll(/<script\s+[^>]*src="([^"]+)"/g)].map(m => m[1]);
      const duplicados = scriptSrcs.reduce((acc, src) => {
        acc[src] = (acc[src] || 0) + 1;
        return acc;
      }, {});

      for (const [src, count] of Object.entries(duplicados)) {
        if (count > 1) {
          erroresDetectados.push({ archivo: rutaArchivo, tipo: "Script duplicado", detalle: `El script "${src}" aparece ${count} veces.` });
        }
      }

      const metaCharset = (contenido.match(/<meta\s+charset=["'][^"']+["']>/gi) || []).length;
      if (metaCharset > 1) {
        erroresDetectados.push({ archivo: rutaArchivo, tipo: "Duplicado meta charset", detalle: "Hay múltiples etiquetas <meta charset>." });
      }

      const titles = (contenido.match(/<title>/gi) || []).length;
      if (titles > 1) {
        erroresDetectados.push({ archivo: rutaArchivo, tipo: "Duplicado title", detalle: "Hay múltiples etiquetas <title>." });
      }

      const etiquetasNoCerradas = contenido.match(/<[^\/!][^>]*$/gm);
      if (etiquetasNoCerradas && etiquetasNoCerradas.length > 0) {
        const tipo = "Etiqueta mal cerrada";
        if (!esFalsoPositivo(rutaArchivo, tipo)) {
          erroresDetectados.push({ archivo: rutaArchivo, tipo, detalle: "Hay una o más etiquetas HTML potencialmente mal cerradas." });
        }
      }
    }
  } catch (error) {
    erroresDetectados.push({ archivo: rutaArchivo, tipo: "Error de lectura", detalle: error.message });
  }
}

// Ejecutar análisis
recorrerArchivos(baseDir);

// Mostrar resultados
console.log("\n📋 Resultado de verificación:\n");

if (erroresDetectados.length === 0) {
  console.log("✅ Sin errores encontrados.");
} else {
  for (const err of erroresDetectados) {
    console.log(`❌ ${err.archivo} → [${err.tipo}] ${err.detalle}`);
  }
}
