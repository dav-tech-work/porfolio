import config from "../../config/index.mjs";
import { registrar } from "../servicios/logger.mjs";

const REGEX = {
  DANGEROUS_CHARS: /[<>"'`=&\/\\(){}\[\];!%$#@*+,:?^~]/g,
  DANGEROUS_PATTERNS: /\b(?:on\w+|javascript:|data:|vbscript:|expression\(|eval\(|alert\(|document\.|window\.|localStorage\.|sessionStorage\.|indexedDB\.|XMLHttpRequest)\b/gi,
  HTML_COMMENTS: /<!--[\s\S]*?-->/g,
  URL_SAFE_CHARS: /[^\w\-\/\?\&\=\.\#]/g,
  // Patrones adicionales para detectar inyecciones
  SQL_INJECTION: /\b(?:union\s+select|insert\s+into|update\s+set|delete\s+from|drop\s+table|alter\s+table|exec\s+xp_|execute\s+sp_|select\s+.*\s+from)\b/i,
  PATH_TRAVERSAL: /(?:\.\.\/|\.\.\\|~\/|~\\|\/etc\/|\/var\/|\/bin\/|\/usr\/|\\windows\\|\\system32\\)/i,
  COMMAND_INJECTION: /[;&|`]/
};

export const sanitize = {
  text: (input, maxLength = 500) => {
    if (typeof input !== 'string') return '';
    
    // Detectar posibles ataques
    if (REGEX.SQL_INJECTION.test(input) || REGEX.COMMAND_INJECTION.test(input)) {
      registrar(`Posible intento de inyección detectado: ${input.substring(0, 100)}`, "warn");
    }
    
    return input
      .replace(REGEX.DANGEROUS_CHARS, '')
      .replace(REGEX.DANGEROUS_PATTERNS, '')
      .replace(REGEX.HTML_COMMENTS, '')
      .replace(/&#\d+;/g, '')
      .substring(0, maxLength);
  },

  html: (input, maxLength = 1000) => {
    if (typeof input !== 'string') return '';
    
    // Permitir algunas etiquetas HTML básicas pero eliminar atributos peligrosos
    const allowedTags = ['p', 'br', 'b', 'i', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    
    let result = input.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tag) => {
      if (allowedTags.includes(tag.toLowerCase())) {
        return match.replace(/ .*?=(['"]).*?\1/g, '');
      }
      return '';
    });
    
    result = result
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(REGEX.DANGEROUS_PATTERNS, '')
      .replace(REGEX.HTML_COMMENTS, '')
      .substring(0, maxLength);
      
    return result;
  },

  url: (url) => {
    if (typeof url !== 'string') return '';
    
    if (REGEX.PATH_TRAVERSAL.test(url)) {
      registrar(`Posible intento de path traversal detectado: ${url}`, "warn");
      return '';
    }
    
    try {
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) return '';
      
      const blacklistedDomains = ['evil.com', 'malware.org'];
      if (blacklistedDomains.some(domain => urlObj.hostname.includes(domain))) {
        return '';
      }
      
      return urlObj.toString();
    } catch {
      if (url.startsWith('/') || url.startsWith('#')) {
        if (REGEX.DANGEROUS_CHARS.test(url) || REGEX.DANGEROUS_PATTERNS.test(url)) {
          return '';
        }
        return url.replace(REGEX.URL_SAFE_CHARS, '');
      }
      return '';
    }
  },

  json: (input, maxDepth = 5) => {
    if (typeof input === 'string') {
      try {
        input = JSON.parse(input);
      } catch {
        return null;
      }
    }

    const sanitizeValue = (value, depth = 0) => {
      if (depth > maxDepth) return null;
      
      if (typeof value === 'string') return sanitize.text(value, config.LIMITS.JSON_FIELD_LENGTH || 1000);
      if (Array.isArray(value)) {
        const maxArraySize = config.LIMITS.JSON_ARRAY_SIZE || 100;
        return value.slice(0, maxArraySize).map(v => sanitizeValue(v, depth + 1));
      }
      if (typeof value === 'object' && value !== null) {
        const maxProps = config.LIMITS.JSON_MAX_PROPERTIES || 50;
        const entries = Object.entries(value)
          .filter(([k]) => k.length <= 50)
          .slice(0, maxProps)
          .map(([k, v]) => [sanitize.text(k, 50), sanitizeValue(v, depth + 1)]);
          
        return Object.fromEntries(entries);
      }
      return value;
    };

    return sanitizeValue(input);
  },
  
  filename: (input) => {
    if (typeof input !== 'string') return '';
    return input
      .replace(/[\/\\:*?"<>|]/g, '')
      .replace(/\.\./g, '')
      .substring(0, 100);
  },
  
  email: (input) => {
    if (typeof input !== 'string') return '';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(input)) return '';
    return input.substring(0, 254);
  }
};
