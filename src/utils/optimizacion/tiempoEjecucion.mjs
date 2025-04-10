export function tiempoEjecucion(fn, etiqueta = "Ejecutando") {
  return async function (...args) {
    const inicio = process.hrtime.bigint();
    const resultado = await fn(...args);
    const fin = process.hrtime.bigint();
    const ms = Number(fin - inicio) / 1_000_000;
    console.log(`⏱ ${etiqueta}: ${ms.toFixed(2)} ms`);
    return resultado;
  };
}
