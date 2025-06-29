// src/tools/analizadorLogs.js
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.resolve(__dirname, '../../logs');
const patronesSospechosos = [
  /scan|escaneo|path traversal/i,
  /login-fallido|acceso-denegado|restringido/i,
  /sql|select.*from|union.*select|etc\/passwd/i,
  /script|<script>|<img.*onerror|eval\(|alert\(/i,
  /\/wp-admin|\/admin|\/phpmyadmin/i
];

function analizarArchivoLog(ruta) {
  return new Promise((resolve) => {
    const sospechosas = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(ruta),
      crlfDelay: Infinity
    });

    rl.on('line', (linea) => {
      for (const patron of patronesSospechosos) {
        if (patron.test(linea)) {
          sospechosas.push(linea);
          break;
        }
      }
    });

    rl.on('close', () => {
      resolve({ archivo: path.basename(ruta), entradas: sospechosas });
    });
  });
}

async function escanearLogs() {
  const archivos = fs.readdirSync(logsDir).filter(f => f.endsWith('.log'));
  const resultados = [];

  for (const archivo of archivos) {
    const ruta = path.join(logsDir, archivo);
    const resultado = await analizarArchivoLog(ruta);
    if (resultado.entradas.length > 0) resultados.push(resultado);
  }

  console.log('\n=== ANÁLISIS DE LOGS SOSPECHOSOS ===');
  if (resultados.length === 0) {
    console.log('✅ No se detectaron entradas sospechosas en los logs.');
  } else {
    for (const r of resultados) {
      console.log(`\n📄 Archivo: ${r.archivo}`);
      r.entradas.forEach(e => console.log('   ⚠️  ' + e));
    }
  }
}

escanearLogs();
