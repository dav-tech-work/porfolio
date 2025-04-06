// sanitize.js - Seguridad reforzada para backend

const REGEX = {
  DANGEROUS_CHARS: /[<>"'`=&\/\\(){}\[\];!%$#@*+,:?^~]/g,
  DANGEROUS_PATTERNS: /\b(?:on\w+|srcdoc|formaction|javascript:|data:|vbscript:|expression\(|eval\(|alert\(|document\.|window\.|localStorage\.|sessionStorage\.|indexedDB\.|XMLHttpRequest|fetch|Function|constructor)\b/gi,
  HTML_COMMENTS: /<!--[\s\S]*?-->/g,
  URL_SAFE_CHARS: /[^\w\-\/\?\&\=\.\#]/g
};

const escapeHtml = (str) => {
  return str.replace(/[&<>"']/g, (char) => {
    const escapes = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return escapes[char];
  });
};

const sanitize = {
  text: (input, escape = true) => {
    if (typeof input !== 'string') return '';
    let cleaned = input
      .replace(REGEX.DANGEROUS_CHARS, '')
      .replace(REGEX.DANGEROUS_PATTERNS, '')
      .replace(REGEX.HTML_COMMENTS, '')
      .replace(/&#\d+;/g, '')
      .substring(0, 500);
    return escape ? escapeHtml(cleaned) : cleaned;
  },

  url: (url) => {
    if (typeof url !== 'string') return '';
    try {
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) return '';
      return urlObj.toString();
    } catch {
      if (url.startsWith('/') || url.startsWith('#')) {
        return url.replace(REGEX.URL_SAFE_CHARS, '');
      }
      return '';
    }
  },

  json: (input, { sanitizeKeys = true, sanitizeValues = true } = {}) => {
    if (typeof input === 'string') {
      try {
        input = JSON.parse(input);
      } catch {
        return null;
      }
    }

    const sanitizeValue = (value) => {
      if (typeof value === 'string') return sanitizeValues ? sanitize.text(value) : value;
      if (Array.isArray(value)) return value.map(v => sanitizeValue(v));
      if (typeof value === 'object' && value !== null) {
        return Object.fromEntries(
          Object.entries(value)
            .filter(([k]) => k.length <= 50)
            .map(([k, v]) => [
              sanitizeKeys ? sanitize.text(k, false) : k,
              sanitizeValue(v)
            ])
        );
      }
      return value;
    };

    return sanitizeValue(input);
  }
};

module.exports = { sanitize };
