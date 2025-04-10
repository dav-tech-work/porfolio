import { minify } from "html-minifier-terser";

export function minificarHTML(html = "") {
  return minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    minifyCSS: true,
    minifyJS: true
  });
}
