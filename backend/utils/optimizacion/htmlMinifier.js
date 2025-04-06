// htmlMinifier.js - Minifica HTML en tiempo real
const minify = require("html-minifier-terser").minify;

function minificarHTML(html = "") {
  return minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    minifyCSS: true,
    minifyJS: true
  });
}

module.exports = { minificarHTML };
