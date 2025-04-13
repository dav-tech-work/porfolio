// Simula una cabecera de respuesta con Helmet
import helmet from "helmet";
import express from "express";

const app = express();
app.use(helmet());

app.get("/", (req, res) => {
  res.send("OK");
});

const server = app.listen(0, async () => {
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}`);
  const headers = res.headers;
  console.log("🔐 Headers con Helmet:");
  ["content-security-policy", "x-dns-prefetch-control", "x-frame-options", "x-xss-protection"].forEach((key) => {
    console.log(`- ${key}: ${headers.get(key) || "❌ NO SETEADO"}`);
  });
  server.close();
});
