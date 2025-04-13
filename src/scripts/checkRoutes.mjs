// src/scripts/checkRoutes.mjs
import http from "http";

const routes = ["/", "/pagina/formacion", "/pagina/curriculum", "/pagina/proyectos"];
const host = "http://localhost:3000";

for (const route of routes) {
  const url = `${host}${route}`;
  http.get(url, (res) => {
    console.log(`${res.statusCode === 200 ? "✅" : "❌"} ${url} → ${res.statusCode}`);
  }).on("error", (err) => {
    console.error(`❌ ${url} → ERROR: ${err.message}`);
  });
}
