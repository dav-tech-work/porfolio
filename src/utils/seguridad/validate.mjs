import { memoize } from "./memoize.mjs";

const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/,
  PHONE: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.0-9]{7,15}$/,
  DANGEROUS: /[<>'"&`]/,
  SCRIPTING: /\b(?:javascript|expression|eval)\b/i
};

export const validarText = memoize((input, maxLength = 1000) => {
  if (typeof input !== 'string') return false;
  if (input.length > maxLength) return false;
  return !REGEX.DANGEROUS.test(input) && !REGEX.SCRIPTING.test(input);
});

export const validarEmail = memoize((email) => {
  if (typeof email !== 'string') return false;
  return REGEX.EMAIL.test(email) && email.length <= 254;
});

export const validarTelefono = memoize((phone) => {
  if (typeof phone !== 'string') return false;
  return REGEX.PHONE.test(phone);
});

export const validarUrl = memoize((url) => {
  if (typeof url !== 'string') return false;
  try {
    const obj = new URL(url);
    return ['http:', 'https:'].includes(obj.protocol);
  } catch {
    return (url.startsWith('/') || url.startsWith('#')) && !REGEX.DANGEROUS.test(url);
  }
});
