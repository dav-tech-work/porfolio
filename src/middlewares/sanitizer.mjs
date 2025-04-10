import { sanitize } from "../utils/seguridad/index.mjs";

export default function sanitizerMiddleware(req, res, next) {
  if (req.body) req.body = sanitize.json(req.body);
  if (req.query) req.query = sanitize.json(req.query);
  if (req.params) req.params = sanitize.json(req.params);
  next();
}
