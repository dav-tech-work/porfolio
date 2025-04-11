
#  Porfolio Web Seguro (Docker + Node.js + EJS) 🔐

Este proyecto es un porfolio personal autogestionado, seguro y modular. Se ejecuta en un contenedor Docker dentro de un servidor protegido por pfSense y Cloudflare Zero Trust.

---

## ✨ Características

- Backend en **Node.js + Express** con plantillas **EJS**.
- Contenido estático protegido y organizado.
- Sistema de build y generador automático de buscador.
- Seguridad avanzada:
  - CSP, cookies seguras, CSRF, rate limiting, `helmet`, `bcrypt`.
  - Usuario no privilegiado y `read_only` dentro del contenedor.
- Servido vía **Docker** con recursos limitados.
- Acceso saliente controlado por **Cloudflare Zero Trust**.

---

## 🚸 Arquitectura de despliegue

```text
[ Navegador ]
     |
[ Cloudflare Zero Trust ]
     |
[ pfSense Firewall ]
     |
[ Servidor VPS con Docker Compose ]
     |
[ Contenedor Node.js ejecutando el porfolio ]
```

---

## 🚀 Tecnologías principales

- **Backend:** Node.js, Express, EJS
- **Frontend:** HTML, CSS modular, sin framework JS
- **Seguridad:** Helmet, CSRF, Rate Limit, Cookies HttpOnly, bcrypt
- **DevOps:** Docker, docker-compose, Cloudflare, pfSense

---

## 📁 Estructura del proyecto

```
/
├── .env.example
├── docker-compose.yml
├── package.json
├── public/                # Archivos estáticos: CSS, imagenes, etc
├── src/                   # Backend Express y servicios
│   ├── app.mjs            # Entrada principal
│   ├── utils/             # Módulos como logger, generador de buscador
│   └── views/             # Plantillas EJS
└── README.md              # Este archivo
```

---

## 🔧 Instalación local (dev)

```bash
# Clona el repositorio y entra al proyecto
npm install
cp .env.example .env

# Ejecuta el proyecto
npm run dev
```

---

## 🛠️ Despliegue con Docker

### docker-compose.yml
```yaml
services:
  porfolio:
    image: porfolio
    container_name: porfolio
    ports:
      - "8000:5001"
    restart: always
    environment:
      NODE_ENV: production
      PORT: 5001
    read_only: true
    tmpfs:
      - /tmp
    user: "2001:2001"
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 256M
    networks:
      - porfolio_net

networks:
  porfolio_net:
    driver: bridge
```

### Comandos de despliegue
```bash
docker compose up -d
```

---

## 🔐 Seguridad implementada

- **CSP (Content Security Policy)** con `nonce`
- **Helmet** para headers seguros
- **CSRF protection** con `csurf`
- **Rate Limiting** con `express-rate-limit`
- **Protección contra fuerza bruta**
- **Cookies:** HttpOnly, Secure, SameSite
- **Usuario sin privilegios en Docker**
- **Read-only FS + tmpfs + no-new-privileges + cap_drop**

---

## 💡 Utilidades

### Generador de buscador
```bash
npm run generar:buscador
```
Esto analiza los HTML y genera `public/assets/data/buscador.json` para el buscador interno.

---

## 🌐 Dominio y acceso

Este proyecto está expuesto a través de un proxy seguro con Cloudflare, y puede accederse desde:

```
https://daniel-arribas-velazquez.dav-tech.work
```

La configuración DNS y la exposición del puerto están gestionadas con reglas de Cloudflare Zero Trust.

---

🧠 Filosofía del proyecto
---

Este porfolio no busca ser una SPA vistosa.Busca demostrar que se puede tener una web segura, privada, eficiente y mantenible, sin necesidad de frameworks de moda, dependencias innecesarias ni servidores expuestos.

---
## 📜 Licencia

Este proyecto está licenciado bajo MIT.

---

## ✉️ Autor

Daniel Arribas Velázquez  Administrador de sistemas y redes, desarrollador backend autodidacta, obsesionado con la seguridad.

---

## ⚡ To-Do / Futuras mejoras

- Panel de administración protegido
- Estadísticas de visitas
- Panel para editar contenido del porfolio
- Pruebas automáticas con GitHub Actions
- Integración de Telegram/Discord para notificaciones

