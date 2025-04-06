// compression.js - Activador de compresión HTTP con Express
const compression = require("compression");

function usarCompresion(opciones = {}) {
  return compression({
    threshold: 1024, // Comprime solo si el contenido es mayor a 1KB
    ...opciones
  });
}

module.exports = usarCompresion;
