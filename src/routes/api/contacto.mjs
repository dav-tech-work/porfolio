import express from "express";
import { procesarFormularioContacto, prepararCorreo, registrar } from "../../utils/servicios/index.mjs";

const router = express.Router();

router.post("/api/contacto", express.json(), async (req, res) => {
  const resultado = procesarFormularioContacto(req);

  if (!resultado.ok) {
    registrar(`❌ Formulario inválido: ${resultado.error}`, "warn");
    return res.status(400).json({ error: resultado.error });
  }

  const correo = prepararCorreo({
    de: resultado.datos.email,
    para: "danielarribasvelazquez@dav-tech.work",
    asunto: "📬 Nuevo mensaje desde el formulario de contacto",
    mensaje: resultado.datos.mensaje
  });

  if (!correo.ok) {
    registrar(`❌ Error al preparar correo: ${correo.error}`, "error");
    return res.status(500).json({ error: correo.error });
  }

  registrar(`📨 Formulario procesado y correo preparado desde ${resultado.datos.email}`, "info");

  res.json({
    mensaje: "✅ Formulario recibido correctamente",
    datos: resultado.datos
  });
});

router.get("/api/email", (req, res) => {
  res.json({ email: "danielarribasvelazquez@dav-tech.work" });
});

export default router;
