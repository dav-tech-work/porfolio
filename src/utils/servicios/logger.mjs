import fs from "fs";
import path from "path";
import { createWriteStream } from "fs";
import { createGzip } from "zlib";
import { fileURLToPath } from "url";
import config from "../../config/index.mjs";

// __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear carpeta de logs si no existe
if (!fs.existsSync(config.PATHS.LOGS)) {
  fs.mkdirSync(config.PATHS.LOGS, { recursive: true });
}

// Buffer y configuración
const logBuffer = [];
const MAX_BUFFER_SIZE = 100;
let isWriting = false;
let writeTimer = null;

/**
 * Sanitiza cualquier entrada al logger para evitar escapes o secuencias peligrosas.
 */
function sanitizarMensaje(mensaje) {
  return mensaje.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

/**
 * Registra un mensaje en el log con rotación automática.
 */
function registrar(mensaje, tipo = "info") {
  const nivelLog = config.LOG.LEVEL;
  const niveles = { debug: 0, info: 1, warn: 2, error: 3 };
  if (niveles[tipo] < niveles[nivelLog]) return;

  const fecha = new Date().toISOString();
  const entrada = `[${fecha}] [${tipo.toUpperCase()}] ${sanitizarMensaje(mensaje)}\n`;
  logBuffer.push(entrada);

  if (logBuffer.length >= MAX_BUFFER_SIZE) {
    escribirBuffer();
  } else {
    if (!writeTimer) {
      writeTimer = setTimeout(escribirBuffer, 2000);
    }
  }
}

/**
 * Escribe el buffer en disco.
 */
function escribirBuffer() {
  if (isWriting || logBuffer.length === 0) return;
  isWriting = true;

  const logPath = path.join(config.PATHS.LOGS, `${obtenerFechaHoy()}.log`);
  const data = logBuffer.splice(0, logBuffer.length).join("");

  fs.appendFile(logPath, data, (err) => {
    if (err) console.error("❌ Error al escribir log:", err);
    isWriting = false;
    clearTimeout(writeTimer);
    writeTimer = null;
  });
}

/**
 * Genera nombre de archivo de log por fecha.
 */
function obtenerFechaHoy() {
  const ahora = new Date();
  return ahora.toISOString().split("T")[0];
}

/**
 * Comprime y rota el log del día anterior.
 */
function rotarLogs() {
  const ayer = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const origen = path.join(config.PATHS.LOGS, `${ayer}.log`);
  const destino = path.join(config.PATHS.LOGS, `${ayer}.log.gz`);

  if (fs.existsSync(origen)) {
    const read = createReadStream(origen);
    const write = createWriteStream(destino);
    const gzip = createGzip();

    read.pipe(gzip).pipe(write).on("finish", () => {
      fs.unlinkSync(origen);
    });
  }
}

// Exportar funciones
export { registrar, rotarLogs };
