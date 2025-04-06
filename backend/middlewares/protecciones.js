function proteccionesMiddleware(req, res, next) {
  // Cabeceras de seguridad general
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=()");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

  // Añadir soporte para reportes de CSP
  res.setHeader("Report-To", JSON.stringify({
    group: "csp-endpoint",
    max_age: 10886400,
    endpoints: [{ url: "/csp-report" }],
    include_subdomains: true
  }));

  res.setHeader("NEL", JSON.stringify({
    report_to: "csp-endpoint",
    max_age: 10886400,
    include_subdomains: true
  }));

  // CSP dinámica con nonce
  if (res.locals.nonce) {
    const nonce = res.locals.nonce;
    res.setHeader("Content-Security-Policy", [
      `default-src 'self';`,
      `script-src 'self' 'nonce-${nonce}';`,
      `style-src 'self' https://fonts.googleapis.com;`, // ❌ sin 'unsafe-inline'
      `img-src 'self' data: https:;`,
      `font-src 'self' https://fonts.gstatic.com;`,
      `object-src 'none';`,
      `frame-ancestors 'none';`,
      `base-uri 'self';`,
      `form-action 'self';`,
      `report-uri /csp-report;`,
      `report-to csp-endpoint;`
    ].join(" "));
  }

  next();
}

module.exports = proteccionesMiddleware;
