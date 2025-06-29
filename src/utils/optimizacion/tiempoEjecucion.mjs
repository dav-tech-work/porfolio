/**
 * Envuelve una función asíncrona y mide su tiempo de ejecución.
 * También registra errores y controla el entorno de logs.
 *
 * @param {Function} fn - Función asíncrona a medir.
 * @param {string} etiqueta - Nombre descriptivo para el log.
 * @returns {Function} - Función decorada.
 */
export function tiempoEjecucion(fn, etiqueta = "Ejecutando") {
  if (typeof fn !== "function") {
    throw new TypeError("El argumento debe ser una función.");
  }

  return async function (...args) {
    const inicio = process.hrtime.bigint();
    try {
      const resultado = await fn(...args);
      return resultado;
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`❌ Error en "${etiqueta}":`, error);
      }
      throw error;
    } finally {
      const fin = process.hrtime.bigint();
      const duracionMs = Number(fin - inicio) / 1_000_000;
      if (process.env.NODE_ENV === "development") {
        console.log(`⏱ ${etiqueta}: ${duracionMs.toFixed(2)} ms`);
      }
    }
  };
}
