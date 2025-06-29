import { sanitize } from "../utils/seguridad/index.mjs";
import { registrar } from "../utils/servicios/logger.mjs";

export default function sanitizerMiddleware(req, res, next) {
  ["body", "query", "params"].forEach(field => {
    const original = req[field];
    const sanitized = sanitize.json(original);
    if (JSON.stringify(original) !== JSON.stringify(sanitized)) {
      registrar(`Sanitización aplicada en '${field}'`, "info");
    }
    req[field] = sanitized;
  });
  next();
}
