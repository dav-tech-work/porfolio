const crypto = require("crypto");
const SECRET = process.env.CSRF_SECRET || "clave_por_defecto_insegura";

const csrf = {
  generarToken: (identificador = "") => {
    const raw = crypto.randomBytes(32);
    const sal = crypto.createHash("sha256").update(identificador + SECRET).digest();
    const firma = crypto.createHmac("sha256", sal).update(raw).digest("hex");
    return `${raw.toString("hex")}.${firma}`;
  },

  validarToken: (tokenRecibido, tokenGuardado, identificador = "") => {
    if (!tokenRecibido || !tokenGuardado) return false;
    try {
      const [rawRecibido, firmaRecibida] = tokenRecibido.split(".");
      const [rawGuardado, firmaGuardada] = tokenGuardado.split(".");
      if (!rawRecibido || !firmaRecibida || !rawGuardado || !firmaGuardada) return false;
      if (rawRecibido.length !== rawGuardado.length) return false;

      const sal = crypto.createHash("sha256").update(identificador + SECRET).digest();
      const firmaEsperada = crypto.createHmac("sha256", sal).update(Buffer.from(rawRecibido, "hex")).digest("hex");

      if (firmaRecibida !== firmaEsperada) return false;

      return crypto.timingSafeEqual(Buffer.from(rawRecibido, "hex"), Buffer.from(rawGuardado, "hex"));
    } catch {
      return false;
    }
  }
};

module.exports = csrf;
