const { obtenerTraducciones } = require("../utils/idioma");

// 🧠 Función para mapear alias y normalizar
function normalizarIdioma(lang) {
  const alias = {
    ca: "cat",
    pt: "pt-br",
    zh: "zh-cn"
    // Agrega más alias si lo necesitas
  };

  const normalizado = lang.toLowerCase().substring(0, 2);
  return alias[normalizado] || normalizado;
}

function middlewareIdioma(req, res, next) {
  const idiomasSoportados = ["es", "en", "cat"];

  let lang =
    req.query.lang ||
    req.cookies?.lang ||
    req.headers["accept-language"]?.split(",")[0]?.substring(0, 2) ||
    "es";

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

    if (req.query.lang) {
      res.cookie("lang", lang, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production", // Solo en producción
        // secure: false, // Solo en dev
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

module.exports = middlewareIdioma;
