# 🔐 Porfolio Web Seguro – Daniel Arribas Velázquez

Este proyecto no es un porfolio más. Es una aplicación web **modular, segura y escalable** diseñada desde cero con foco en la **seguridad, el control y la portabilidad**.

> "Si tu backend no protege, entonces no sirve. Este sí lo hace."

---

## 🚀 Características principales

- ✅ **Backend en Node.js** con Express, organizado por middlewares y rutas modulares.
- ✅ **Sistema de plantillas EJS + layouts**, renderizado dinámico desde el servidor.
- ✅ **Protección completa mediante CSP con `nonce`**, sin `unsafe-inline`.
- ✅ **Middlewares propios** para:
  - Protección CSRF
  - Sanitización de entrada
  - Limitación de peticiones (`rate limiting`)
  - Aplicación de cabeceras de seguridad avanzadas
- ✅ **Contenido protegido** servido solo bajo lógica del backend.
- ✅ **Soporte para internacionalización (i18n)** con archivos JSON por idioma.
- ✅ **Generador dinámico de buscador (`buscador.json`)** desde contenido.
- ✅ **Preparado para autenticación y roles en futuras versiones.**

---

## 🧱 Estructura del proyecto

.
├── backend/
│   ├── app.js                # Entrada principal del servidor
│   ├── routes/               # Rutas organizadas por función
│   ├── middlewares/          # Seguridad, logs, CSP, sanitización, etc.
│   ├── vistas/               # Plantillas EJS
│   └── utils/                # Servicios internos, generadores, idiomas
├── contenido_protegido/      # Archivos visibles al usuario, protegidos
│   ├── assets/
│   └── i18n/                 # Archivos de idioma
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md

---

## 🛡️ Seguridad aplicada

| Mecanismo             | Estado       |
|-----------------------|--------------|
| HTTPS (Zero Trust)    | ✅ Cloudflare Tunnel (Zero Trust)
| CSP con `nonce`       | ✅ Dinámico, sin `unsafe-inline`
| X-Frame-Options       | ✅ `DENY`
| CSRF                  | ✅ Middleware dedicado
| Cookies               | ✅ `HttpOnly`, `Secure`, `SameSite=Strict`
| Sanitización de input | ✅ Middleware personalizado
| Rate Limiting         | ✅ En rutas sensibles
| Logs                  | ✅ Personalizados y extensibles

---

## 🐳 Despliegue con Docker

```bash
git clone https://github.com/tuusuario/porfolio-seguro
cd porfolio-seguro
cp .env.example .env
docker-compose up --build
```

> El sitio se sirve de forma segura por el puerto 3000 (redirigido por Docker).  
> Accede solo a través de Cloudflare Tunnel o red segura.

---

## 🧠 Filosofía del proyecto

Este porfolio no busca ser una SPA vistosa.  
Busca demostrar que se puede tener una web **segura, privada, eficiente y mantenible**, sin necesidad de frameworks de moda, dependencias innecesarias ni servidores expuestos.

---

## ✍️ Autor

**Daniel Arribas Velázquez**  
Administrador de sistemas y redes, desarrollador backend autodidacta, obsesionado con la seguridad.  
[daniel-arribas-velazquez.dav-tech.work](https://daniel-arribas-velazquez.dav-tech.work/)

---

## 🛠️ Próximos pasos

- [ ] Integración de login y roles.
- [ ] Sistema de logs avanzados y alertas.
- [ ] Backup/restauración del contenido.
- [ ] Generador de contenido autoindexado.
- [ ] Panel administrativo para gestión.

---

## 📜 Licencia

Este proyecto está licenciado bajo [MIT](LICENSE).

## 🔒 Sobre el contenido protegido

Este repositorio **no incluye contenido personal, educativo ni privado** de la carpeta `contenido_protegido/`.

- Solo se comparte la **estructura técnica, lógica de backend y sistema de seguridad**.
- Cualquier archivo sensible (HTMLs, PDFs, material personal) ha sido **intencionalmente excluido mediante `.gitignore`**.
- El proyecto está pensado para ser una base técnica reutilizable, no una demo con datos reales.

> Esto garantiza que el repositorio pueda ser público sin comprometer privacidad ni integridad.
