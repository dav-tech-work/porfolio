import compression from "compression";

export default function usarCompresion(opciones = {}) {
  return compression({
    threshold: 1024, // Comprime solo si el contenido es mayor a 1KB
    ...opciones
  });
}
