const { procesarFormularioContacto } = require("./contacto");
const { prepararCorreo } = require("./mail");
const { registrar } = require("./logger");
const { enviarNotificacion } = require("./notificador");
const { guardarArchivo } = require("./archivo");

module.exports = {
  procesarFormularioContacto,
  prepararCorreo,
  registrar,
  enviarNotificacion,
  guardarArchivo
};
