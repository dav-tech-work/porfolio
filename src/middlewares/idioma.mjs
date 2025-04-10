import { obtenerTraducciones } from "../utils/idioma/idioma.mjs";

function normalizarIdioma(lang) {
  const alias = {
    ca: "cat",
    pt: "pt-br",
    zh: "zh-cn"
    // Agrega más alias si lo necesitas
  };

  lang = lang.toLowerCase().trim();
  if (lang === "cat" || lang === "pt-br" || lang === "zh-cn") {
    return lang;
  }
  const normalizado = lang.substring(0, 2);
  return alias[normalizado] || normalizado;
}

export default function middlewareIdioma(req, res, next) {
  const idiomasSoportados = ["es", "en", "cat", "pt-br", "zh-cn"];

  // Para que siempre se use español al iniciar,
  // solo se revisan query y cookies y se omite el header "accept-language".
  let lang = req.query.lang || req.cookies?.lang || "es"; // Español por defecto

  lang = normalizarIdioma(lang);

  if (!idiomasSoportados.includes(lang)) {
    console.warn(`⚠️ Idioma '${lang}' no soportado. Se usará 'es' por defecto.`);
    lang = "es";
  }

  const traducciones = obtenerTraducciones(lang);

  if (!traducciones || Object.keys(traducciones).length === 0) {
    console.error(`❌ No se pudieron cargar las traducciones para '${lang}'. Usando 'es'.`);
    req.traducciones = obtenerTraducciones("es");
    req.idioma = "es";
  } else {
    req.traducciones = traducciones;
    req.idioma = lang;

    // Si se especifica el idioma en la URL, guardar la cookie para futuras solicitudes.
    if (req.query.lang) {
      res.cookie("lang", lang, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 30
      });
    }

    console.log("🧪 Idioma final aplicado:", lang);
    console.log("🧪 Traducción de home.title:", traducciones?.["home.title"]);
  }

  res.locals.traducciones = req.traducciones;
  res.locals.t = req.traducciones;
  res.locals.idioma = req.idioma;

  next();
}
