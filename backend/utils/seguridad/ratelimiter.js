// utils/seguridad/ratelimiter.js
const fs = require("fs");
const path = require("path");

class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.map = new Map();
    this.almacenamiento = null;
    this.interval = setInterval(() => this.limpiar(), this.windowMs).unref();
  }

  permitir(ip) {
    const ahora = Date.now();
    const info = this.map.get(ip) || { count: 0, firstRequest: ahora };

    if (ahora - info.firstRequest > this.windowMs) {
      info.count = 0;
      info.firstRequest = ahora;
    }

    info.count++;
    this.map.set(ip, info);

    return info.count <= this.maxRequests;
  }

  limpiar() {
    const ahora = Date.now();
    for (const [ip, info] of this.map.entries()) {
      if (ahora - info.firstRequest > this.windowMs) {
        this.map.delete(ip);
      }
    }
    if (this.almacenamiento) this._guardarEnArchivo();
  }

  ajustarLimite(nuevoMax, nuevoWindowMs) {
    this.maxRequests = nuevoMax;
    this.windowMs = nuevoWindowMs;
    clearInterval(this.interval);
    this.interval = setInterval(() => this.limpiar(), this.windowMs).unref();
  }

  usarAlmacenamientoJSON(ruta = path.join(__dirname, "ratelimit_data.json")) {
    this.almacenamiento = ruta;

    try {
      if (fs.existsSync(ruta)) {
        const data = JSON.parse(fs.readFileSync(ruta, "utf8"));
        for (const [ip, info] of Object.entries(data)) {
          this.map.set(ip, info);
        }
      }
    } catch (e) {
      console.warn("⚠️ No se pudo cargar el almacenamiento de rate limit:", e.message);
    }
  }

  _guardarEnArchivo() {
    try {
      const data = Object.fromEntries(this.map);
      fs.writeFileSync(this.almacenamiento, JSON.stringify(data), "utf8");
    } catch (e) {
      console.warn("⚠️ No se pudo guardar el almacenamiento de rate limit:", e.message);
    }
  }

  usarAlmacenamientoExterno(getStoreFn) {
    this.getStore = getStoreFn;
    this.permitir = async (ip) => {
      const store = await this.getStore();
      const ahora = Date.now();
      const info = await store.get(ip) || { count: 0, firstRequest: ahora };

      if (ahora - info.firstRequest > this.windowMs) {
        info.count = 0;
        info.firstRequest = ahora;
      }

      info.count++;
      await store.set(ip, info);

      return info.count <= this.maxRequests;
    };
  }
}

module.exports = RateLimiter;