# 🔐 Porfolio Web Seguro ![Security Level](https://img.shields.io/badge/security-135%2F100%20A%2B-brightgreen)

Este proyecto no es un porfolio más. Es una aplicación web **modular, segura y escalable** diseñada desde cero con foco en la **seguridad, el control y la portabilidad**, tanto para desarrolladores como para usuarios.

> "Si tu backend no protege, entonces no sirve. Este sí lo hace."

> **🛡️ Auditorías externas superadas:**
>
> * 🟢 [SecurityHeaders.com](https://securityheaders.com): **A+**
> * 🟢 [Mozilla Observatory](https://observatory.mozilla.org): **135 / 100**, **10 / 10 tests pasados**
---

## 🚀 Características principales

- ✅ **Backend en Node.js** con Express, organizado por middlewares, controladores, servicios y rutas modulares.
- ✅ **Sistema de plantillas EJS + layouts**, renderizado dinámico desde el servidor.
- ✅ **Protección completa mediante CSP con `nonce`**, sin `unsafe-inline`, compatible con OWASP.
- ✅ **Middlewares propios** para:
  - Protección CSRF con `csurf` o verificación manual
  - Sanitización profunda (texto, HTML, JSON, URL)
  - Limitación de peticiones (`rate limiting` por IP y ruta)
  - Cabeceras de seguridad avanzadas (HSTS, Referrer-Policy, etc.)
- ✅ **Contenido protegido** servido solo bajo lógica del backend, nunca accesible directamente.
- ✅ **Soporte para internacionalización (i18n)** con archivos JSON por idioma.
- ✅ **Generador dinámico de buscador (`buscador.json`)** desde el contenido real.
- ✅ **Sistema interno de verificación de calidad y seguridad del código**.
- ✅ **Listo para autenticación, control de sesiones y gestión de roles.**

---

## 🧪 Tests automáticos de calidad y seguridad

Este proyecto incluye scripts CLI personalizados para auditar el código antes de cada commit o despliegue:

| Script                    | Descripción |
|---------------------------|-------------|
| `npm run test:codigo`     | Detecta `var`, `console.log`, `debugger`, `DOCTYPE` faltantes, scripts mal definidos, duplicados, etc. |
| `npm run test:importaciones` | Verifica que **todas las rutas de importación sean válidas**, previniendo errores de compilación. |
| `npm run test:huerfanos`  | Detecta archivos **no referenciados ni usados** (JS, CSS, HTML). |
| `npm run validar:seguridad` | Analiza el código en busca de `eval`, `child_process`, `Function`, rutas de import incorrectas, etc. |
| `npm run analizar:logs`   | Busca patrones maliciosos en archivos `.log` generados. |

> *"No basta con que funcione, tiene que estar limpio, mantenible y auditado."*

---

## 🧱 Estructura del proyecto

```
/
├── .env.example
├── docker-compose.yml
├── package.json
├── public/                # Archivos estáticos: CSS, imágenes, scripts frontend
├── src/                   # Backend Express y servicios
│   ├── app.mjs            # Entrada principal
│   ├── middlewares/       # Seguridad, idioma, protecciones, etc.
│   ├── utils/             # Logger, sanitizador, i18n, generadores, etc.
│   ├── scripts/           # Scripts CLI de análisis y build
│   ├── routes/            # Rutas organizadas por dominio funcional
│   └── views/             # Plantillas EJS organizadas por sección
└── README.md
```

---

## 🛡️ Seguridad avanzada (Defense in Depth + Zero Trust)

El sistema aplica múltiples capas de protección con una arquitectura orientada a contener y detectar cualquier intrusión:

### 🧱 Defensa en Capas

- Docker endurecido (no-root, solo lectura, sin capacidades elevadas)
- Aislamiento por red, firewall activo y DNS bajo control
- Exposición solo por túnel de Zero Trust (Cloudflare)
- `.env` fuera del control de versiones, con validación estricta

### 🔐 Prácticas de Seguridad Implementadas

| Mecanismo                            | Estado   |
|-------------------------------------|----------|
| HTTPS forzado (Zero Trust)          | ✅ Sí     |
| Headers de seguridad (CSP, HSTS...) | ✅ Sí     |
| Protección contra XSS, CSRF y LFI   | ✅ Sí     |
| Validación y sanitización profunda  | ✅ Sí     |
| Protección de archivos subidos      | ✅ Sí     |
| Cookies seguras (`HttpOnly`, `SameSite`) | ✅ Sí     |
| Contenedor endurecido (Docker)      | ✅ Sí     |
| Escaneo de vulnerabilidades         | ✅ Sí     |
| Logs con auditoría y trazabilidad   | ✅ Sí     |

### 📊 Comparación con estándares

Cumple con OWASP ASVS nivel 2 y se aproxima al nivel 3:

- ✅ Producción segura sin exponer rutas críticas
- ✅ Preparado para trabajar con datos sensibles
- ✅ Ideal como base para SaaS o infraestructura privada

> 🟢 **Nivel de seguridad estimado: 9.5 / 10**

---

## 📈 Recomendaciones Mozilla Observatory (implementadas)

* `Content-Security-Policy` avanzada con `nonce`
* `Permissions-Policy` y `Referrer-Policy` en modo restrictivo
* `Strict-Transport-Security` con preload
* `Cross-Origin-*` headers: aislamiento de recursos
* Cabeceras `X-*` correctamente aplicadas

---
## 🐳 Despliegue con Docker

```bash
git clone https://github.com/dav-tech-work/porfolio
cd porfolio-seguro
cp .env.example .env
docker compose up -d
```

### docker-compose.yml (ejemplo)
```yaml
services:
  porfolio:
    image: porfolio
    container_name: porfolio
    ports:
      - "8000:5001"
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
    restart: always
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

---

## 🌐 Dominio y acceso

Disponible públicamente desde:
```
https://daniel-arribas-velazquez.dav-tech.work
```
Gestionado y filtrado por reglas de Cloudflare Zero Trust.

---

## 🧠 Filosofía del proyecto

Esto **no es una SPA con fuegos artificiales**. Es una prueba de que se puede hacer una web:

- Segura por diseño
- Modular y mantenible
- Escalable sin frameworks pesados
- Con CI/CD y auditoría integrada

---

## ✍️ Autor

**Daniel Arribas Velázquez**
Administrador de sistemas y redes · Desarrollador backend · Seguridad aplicada
🔗 [daniel-arribas-velazquez.dav-tech.work](https://daniel-arribas-velazquez.dav-tech.work)


## ⚡ Próximos pasos

- [x] Scripts de auditoría automatizados (`var`, `console.log`, importaciones, huérfanos)
- [ ] Login con sesiones seguras y control de roles
- [ ] Alertas en tiempo real (Telegram, Discord, email...)
- [ ] Panel administrativo para gestión de contenido e idiomas
- [ ] CI/CD completo con tests de seguridad y despliegue automático

---

## 📜 Licencia

Este proyecto está licenciado bajo [MIT](LICENSE).

---

## 🔒 Sobre el contenido protegido

Este repositorio **no incluye contenido personal, educativo ni privado**.

- Solo se comparte la **arquitectura, lógica y herramientas de seguridad**.
- Todo el contenido sensible está excluido mediante `.gitignore`.
- La estructura está pensada como **base profesional reutilizable**, no como demo de contenido real.

> Así puedes publicarlo sin miedo y clonarlo como punto de partida para proyectos serios.

