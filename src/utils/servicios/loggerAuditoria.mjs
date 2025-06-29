// loggerAuditoria.mjs
import fs from "fs";
import path from "path";
import { createWriteStream } from "fs";
import { createGzip } from "zlib";
import { fileURLToPath } from "url";
import config from "../../config/index.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RUTA_LOGS_AUDITORIA = path.join(config.PATHS.LOGS, "auditoria");
if (!fs.existsSync(RUTA_LOGS_AUDITORIA)) {
  fs.mkdirSync(RUTA_LOGS_AUDITORIA, { recursive: true });
}

const buffer = [];
const MAX_BUFFER = 50;
let escribiendo = false;
let temporizador = null;

function obtenerFecha() {
  const ahora = new Date();
  return ahora.toISOString().split("T")[0];
}

function sanitizar(texto) {
  return String(texto).replace(/[\n\r\t]/g, ' ').replace(/[\u001b\u009b][[()#;?]*[0-9]{0,4}(?:;[0-9]{0,4})*[0-9A-ORZcf-nqry=><]/g, '');
}

function formatearEntrada({ tipo, usuario, ip, mensaje, agente }) {
  const fecha = new Date().toISOString();
  return `[${fecha}] [${tipo.toUpperCase()}] [IP:${ip}] [User:${usuario}] [UA:${agente || "-"}] ${sanitizar(mensaje)}\n`;
}

function escribirBuffer() {
  if (escribiendo || buffer.length === 0) return;
  escribiendo = true;

  const rutaArchivo = path.join(RUTA_LOGS_AUDITORIA, `${obtenerFecha()}.log`);
  const datos = buffer.splice(0, buffer.length).join("");

  fs.appendFile(rutaArchivo, datos, (err) => {
    if (err) console.error("❌ Error al escribir log de auditoría:", err);
    escribiendo = false;
    clearTimeout(temporizador);
    temporizador = null;
  });
}

function auditar({ tipo = "evento", usuario = "anonimo", ip = "-", mensaje = "", agente = "" }) {
  const entrada = formatearEntrada({ tipo, usuario, ip, mensaje, agente });
  buffer.push(entrada);
  if (buffer.length >= MAX_BUFFER) {
    escribirBuffer();
  } else if (!temporizador) {
    temporizador = setTimeout(escribirBuffer, 1500);
  }
}

function rotarAuditoria() {
  const ayer = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const origen = path.join(RUTA_LOGS_AUDITORIA, `${ayer}.log`);
  const destino = path.join(RUTA_LOGS_AUDITORIA, `${ayer}.log.gz`);
  if (fs.existsSync(origen)) {
    const read = fs.createReadStream(origen);
    const write = createWriteStream(destino);
    const gzip = createGzip();
    read.pipe(gzip).pipe(write).on("finish", () => fs.unlinkSync(origen));
  }
}

export { auditar, rotarAuditoria };
