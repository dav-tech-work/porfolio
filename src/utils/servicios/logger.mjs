import fs from "fs";
import path from "path";
import { createWriteStream, createReadStream } from "fs";
import { createGzip } from "zlib";
import { fileURLToPath } from "url";
import config from "../../config/index.mjs";

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Buffer para almacenar logs antes de escribirlos
const logBuffer = [];
let isWriting = false;
let writeTimer = null;

// Crear carpeta de logs si no existe
if (!fs.existsSync(config.PATHS.LOGS)) {
  fs.mkdirSync(config.PATHS.LOGS, { recursive: true });
}

/**
 * Registra un mensaje en el log con rotación de archivos.
 * @param {string} mensaje - Contenido del mensaje.
 * @param {string} tipo - Tipo de log: info, error, warn, etc.
 */
function registrar(mensaje, tipo = "info") {
  // Filtrar logs según nivel configurado
  const nivelLog = config.LOG.LEVEL;
  const niveles = { debug: 0, info: 1, warn: 2, error: 3 };

  if (niveles[tipo] < niveles[nivelLog] && config.IS_PROD) {
    return; // No registrar logs de nivel inferior en producción
  }

  const timestamp = new Date().toISOString();
  const entrada = `[${timestamp}] [${tipo.toUpperCase()}] ${mensaje}`;

  // Mostrar en consola solo en desarrollo o si es error/warn
  if (!config.IS_PROD || tipo === "error" || tipo === "warn") {
    console.log(entrada);
  }

  // Añadir al buffer
  logBuffer.push(entrada + "\n");

  // Programar escritura asíncrona
  if (!writeTimer) {
    writeTimer = setTimeout(flushLogs, 1000); // Escribir cada segundo o cuando el buffer esté lleno
  }

  // Si el buffer es grande, forzar escritura inmediata
  if (logBuffer.length > 100) {
    clearTimeout(writeTimer);
    writeTimer = null;
    flushLogs();
  }
}

/**
 * Escribe los logs acumulados en el buffer al archivo.
 */
function flushLogs() {
  if (isWriting || logBuffer.length === 0) return;

  isWriting = true;
  writeTimer = null;

  const logsToWrite = logBuffer.splice(0, logBuffer.length);
  const logContent = logsToWrite.join("");

  // Verificar si necesitamos rotar el archivo
  const archivoLog = path.join(config.PATHS.LOGS, "app.log");

  try {
    // Verificar tamaño del archivo actual
    if (fs.existsSync(archivoLog)) {
      const stats = fs.statSync(archivoLog);
      if (stats.size > config.LOG.FILE_SIZE) {
        rotarLogs();
      }
    }

    // Escribir logs de forma asíncrona
    fs.appendFile(archivoLog, logContent, (err) => {
      isWriting = false;

      if (err) {
        console.error("❌ Error al escribir en el log:", err.message);
        // Reintentar en caso de error
        logBuffer.unshift(...logsToWrite);
      }

      // Si hay más logs pendientes, programar otra escritura
      if (logBuffer.length > 0) {
        writeTimer = setTimeout(flushLogs, 500);
      }
    });
  } catch (err) {
    console.error("❌ Error al verificar archivo de log:", err.message);
    isWriting = false;

    // Reintentar
    logBuffer.unshift(...logsToWrite);
    writeTimer = setTimeout(flushLogs, 1000);
  }
}

/**
 * Rota los archivos de log, comprimiendo los antiguos.
 */
function rotarLogs() {
  const archivoLog = path.join(config.PATHS.LOGS, "app.log");
  const fecha = new Date().toISOString().replace(/[:.]/g, "-");
  const archivoAntiguo = path.join(config.PATHS.LOGS, `app-${fecha}.log.gz`);

  try {
    // Verificar archivos antiguos y eliminar si hay demasiados
    const archivos = fs.readdirSync(config.PATHS.LOGS)
      .filter(f => f.startsWith("app-") && f.endsWith(".log.gz"))
      .sort();

    // Eliminar archivos más antiguos si excedemos el límite
    while (archivos.length >= config.LOG.MAX_FILES) {
      const archivoAEliminar = path.join(config.PATHS.LOGS, archivos.shift());
      fs.unlinkSync(archivoAEliminar);
    }

    // Comprimir y mover el archivo actual
    const gzip = createGzip();
    const source = createReadStream(archivoLog);
    const destination = createWriteStream(archivoAntiguo);

    source.pipe(gzip).pipe(destination);

    destination.on("finish", () => {
      // Limpiar el archivo original
      fs.writeFileSync(archivoLog, "");
      registrar("Archivo de log rotado y comprimido", "info");
    });
  } catch (err) {
    console.error("❌ Error al rotar logs:", err.message);
    // Si falla la rotación, intentar al menos limpiar el archivo
    try {
      fs.writeFileSync(archivoLog, "");
    } catch (e) {
      // No hacer nada si falla
    }
  }
}

// Asegurar que los logs se escriban antes de cerrar la aplicación
process.on("beforeExit", () => {
  if (logBuffer.length > 0) {
    clearTimeout(writeTimer);
    writeTimer = null;
    const archivoLog = path.join(config.PATHS.LOGS, "app.log");
    fs.appendFileSync(archivoLog, logBuffer.join(""));
    logBuffer.length = 0;
  }
});

export { registrar };
