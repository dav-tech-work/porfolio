// src/tools/validadorSeguridad.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, '../');
const archivosAnalizados = [];
const resultados = [];

const funcionesPeligrosas = [/\beval\b/, /new Function/, /child_process/, /execSync/, /spawnSync/];
const cabecerasRecomendadas = [
  'X-Content-Type-Options',
  'X-Frame-Options',
  'Strict-Transport-Security',
  'Content-Security-Policy'
];

function escanearDirectorio(dir) {
  const archivos = fs.readdirSync(dir);
  for (const archivo of archivos) {
    const rutaCompleta = path.join(dir, archivo);
    const stat = fs.statSync(rutaCompleta);

    if (stat.isDirectory()) {
      escanearDirectorio(rutaCompleta);
    } else if (archivo.endsWith('.js') || archivo.endsWith('.mjs')) {
      analizarArchivo(rutaCompleta);
    }
  }
}

function analizarArchivo(ruta) {
  const contenido = fs.readFileSync(ruta, 'utf-8');
  archivosAnalizados.push(ruta);
  const errores = [];

  for (const regex of funcionesPeligrosas) {
    if (regex.test(contenido)) {
      errores.push(`❌ Función peligrosa detectada: ${regex}`);
    }
  }

  if (ruta.includes('/middleware') || ruta.includes('protecciones')) {
    for (const cabecera of cabecerasRecomendadas) {
      if (!contenido.includes(cabecera)) {
        errores.push(`⚠️ Cabecera de seguridad faltante: ${cabecera}`);
      }
    }
  }

  if (!contenido.includes('sanitize') && contenido.includes('req.body')) {
    errores.push('⚠️ Manejo de inputs sin sanitización detectado.');
  }

  if (contenido.includes('require(')) {
    errores.push('⚠️ Uso de require() detectado en módulo ESM.');
  }

  if (contenido.includes('..') && contenido.includes('import')) {
    const rutaRelativaIncorrecta = contenido.match(/import\s+.*?from\s+['"](\.\.\/)+/g);
    if (rutaRelativaIncorrecta) {
      errores.push('⚠️ Posibles imports con rutas incorrectas.');
    }
  }

  if (errores.length > 0) {
    resultados.push({ archivo: ruta, errores });
  }
}

function mostrarInforme() {
  console.log('\n=== RESULTADO DEL VALIDADOR DE SEGURIDAD ===');
  console.log(`Archivos analizados: ${archivosAnalizados.length}`);
  if (resultados.length === 0) {
    console.log('✅ Todo parece seguro. No se encontraron problemas graves.');
  } else {
    for (const r of resultados) {
      console.log(`\n📄 ${r.archivo}`);
      r.errores.forEach(e => console.log('   ' + e));
    }
  }
}

escanearDirectorio(baseDir);
mostrarInforme();
