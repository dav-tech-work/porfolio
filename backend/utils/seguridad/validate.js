const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/,
  PHONE: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.0-9]{7,15}$/,
  DANGEROUS: /[<>'"&`]/,
  SCRIPTING: /\b(?:javascript|expression|eval|onerror|onload|onclick)\b/i,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|:;"'<>,.?/~`\\-]).{8,64}$/,
  SLUG: /^[a-z0-9-]{1,64}$/,
  FILENAME: /^[\w,\s-]+\.[A-Za-z]{1,5}$/,
  ALPHA: /^[a-zA-ZÀ-ÿ\s]{1,100}$/,
  NUMERIC: /^[0-9]{1,20}$/
};

const validate = {
  text: (input, maxLength = 1000) => {
    if (typeof input !== 'string') return false;
    const trimmed = input.trim();
    if (trimmed.length === 0 || trimmed.length > maxLength) return false;
    return !REGEX.DANGEROUS.test(trimmed) && !REGEX.SCRIPTING.test(trimmed);
  },

  email: (email) => {
    if (typeof email !== 'string') return false;
    const trimmed = email.trim();
    if (trimmed.length > 254) return false;
    if (!REGEX.EMAIL.test(trimmed)) return false;
    const parts = trimmed.split('@');
    if (parts.length !== 2 || parts[0].length === 0 || parts[1].length < 4) return false;
    return true;
  },

  phone: (phone) => {
    if (typeof phone !== 'string') return false;
    return REGEX.PHONE.test(phone.trim());
  },

  url: (url) => {
    if (typeof url !== 'string') return false;
    try {
      const obj = new URL(url);
      return ['http:', 'https:'].includes(obj.protocol);
    } catch {
      return (url.startsWith('/') || url.startsWith('#')) && !REGEX.DANGEROUS.test(url);
    }
  },

  password: (pass) => {
    if (typeof pass !== 'string') return false;
    return REGEX.PASSWORD.test(pass.trim());
  },

  slug: (str) => {
    if (typeof str !== 'string') return false;
    return REGEX.SLUG.test(str.trim());
  },

  filename: (name) => {
    if (typeof name !== 'string') return false;
    return REGEX.FILENAME.test(name.trim());
  },

  alpha: (text) => {
    if (typeof text !== 'string') return false;
    return REGEX.ALPHA.test(text.trim());
  },

  numeric: (num) => {
    if (typeof num !== 'string') return false;
    return REGEX.NUMERIC.test(num.trim());
  }
};

module.exports = { validate };
