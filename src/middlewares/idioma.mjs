import { obtenerTraducciones } from "../utils/idioma/idioma.mjs";

function normalizarIdioma(lang) {
  const alias = { ca: "cat", pt: "pt-br", zh: "zh-cn" };
  lang = lang.toLowerCase().trim().replace(/[^\w-]/g, '');
  if (["cat", "pt-br", "zh-cn"].includes(lang)) return lang;
  return alias[lang.substring(0, 2)] || lang.substring(0, 2);
}

export default function middlewareIdioma(req, res, next) {
  const idiomasSoportados = ["es", "en", "cat", "pt-br", "zh-cn"];
  let lang = req.query.lang || req.cookies?.lang || "es";
  lang = normalizarIdioma(lang);
  if (!idiomasSoportados.includes(lang)) lang = "es";

  const traducciones = obtenerTraducciones(lang);

  if (!traducciones || Object.keys(traducciones).length === 0) {
    req.traducciones = obtenerTraducciones("es");
    req.idioma = "es";
  } else {
    req.traducciones = traducciones;
    req.idioma = lang;

    if (req.query.lang) {
      res.cookie("lang", lang, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 30
      });
    }
  }

  res.setHeader("Vary", "Accept-Language");
  res.locals.traducciones = req.traducciones;
  res.locals.t = req.traducciones;
  res.locals.idioma = req.idioma;

  next();
}
