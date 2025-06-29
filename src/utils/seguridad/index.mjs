import { memoize } from "./memoize.mjs";
import { validarEmail, validarTelefono, validarText, validarUrl } from "./validate.mjs";
import { sanitize } from "./sanitize.mjs";

export {
  memoize,
  validarEmail,
  validarTelefono,
  validarText,
  validarUrl,
  sanitize,
  // Aliases opcionales
  validarText as esTextoSeguro,
  sanitize as limpiador
};
