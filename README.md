# 🔐 Porfolio Web Seguro ![Security Level](https://img.shields.io/badge/security-135%2F100%20A%2B-brightgreen) ![Security](https://img.shields.io/badge/security-9.5%2F10-brightgreen)

Este proyecto no es un porfolio más. Es una aplicación web **modular, segura y escalable** diseñada desde cero con foco en la **seguridad, el control y la portabilidad**, tanto para desarrolladores como para usuarios.

> "Si tu backend no protege, entonces no sirve. Este sí lo hace."

> **🛡️ Auditorías externas superadas:**
>
> - 🟢 [SecurityHeaders.com](https://securityheaders.com): **A+**
> - 🟢 [Mozilla Observatory](https://observatory.mozilla.org): **130 / 100**, **10 / 10 tests pasados**
> - 🟢 [Qualys SSL Labs](https://www.ssllabs.com/ssltest/index.html): **A, A, A+, A+ **
> - 🟢 [Hardenize](https://www.hardenize.com/report/daniel-arribas-velazquez.dav-tech.work/1750766903) **Resultados completos**
> - 🟢 [ImmuniWeb SSLScan](https://www.immuniweb.com/ssl/): **A+**
> - 🟢 [UpGuard Web Scan](https://www.upguard.com/webscan): **908/950**

---

## 🚀 Características principales

- ✅ **Backend en Node.js** con Express, organizado por middlewares, controladores, servicios y rutas modulares.
- ✅ **Sistema de plantillas EJS + layouts**, renderizado dinámico desde el servidor.
- ✅ **Protección completa mediante CSP con `nonce`**, sin `unsafe-inline`, compatible con OWASP.
- ✅ **Middlewares propios** para:
  - Protección CSRF personalizada (sin dependencias obsoletas)
  - Sanitización profunda (texto, HTML, JSON, URL) con límites configurables
  - Limitación de peticiones (`rate limiting` por IP y ruta)
  - Cabeceras de seguridad avanzadas (HSTS, Referrer-Policy, etc.)
- ✅ **Contenido protegido** servido solo bajo lógica del backend, nunca accesible directamente.
- ✅ **Soporte para internacionalización (i18n)** con archivos JSON por idioma.
- ✅ **Generador dinámico de buscador (`buscador.json`)** desde el contenido real.
- ✅ **Sistema interno de verificación de calidad y seguridad del código**.
- ✅ **Listo para autenticación, control de sesiones y gestión de roles.**
- ✅ **Configuración unificada y centralizada** para mejor mantenibilidad.

---

## 🔧 MEJORAS RECIENTES IMPLEMENTADAS

### ✅ Correcciones Críticas Aplicadas (8/8)

1. **🔧 Dependencias actualizadas y corregidas**

   - ✅ Agregada dependencia faltante `express-session`
   - ✅ Removida dependencia obsoleta `csurf` (reemplazada por middleware personalizado)
   - ✅ Corregidas extensiones de scripts a `.mjs` en package.json

2. **🛡️ Configuración de seguridad unificada**

   - ✅ CSP centralizada en configuración única (eliminada duplicación)
   - ✅ Middleware CSRF simplificado y optimizado
   - ✅ Validación de sanitización mejorada con límites configurables

3. **🚀 Arquitectura optimizada**
   - ✅ Rutas reorganizadas para evitar conflictos
   - ✅ Configuración Docker estandarizada (puerto 3001)
   - ✅ Importaciones optimizadas y movidas a scope local

### ✅ Mejoras Menores (10/12)

- ✅ Eliminados archivos duplicados y comentarios de debug
- ✅ Configuración de caché centralizada
- ✅ Implementado caché para verificación de vistas
- ✅ Agregados límites faltantes y dominios bloqueados
- ✅ Optimizadas importaciones para mejor rendimiento

### 📊 Estado Actual del Proyecto

| Aspecto           | Estado           | Detalles                            |
| ----------------- | ---------------- | ----------------------------------- |
| **Dependencias**  | ✅ Actualizado   | Sin vulnerabilidades conocidas      |
| **Configuración** | ✅ Unificada     | CSP, CSRF y caché centralizados     |
| **Seguridad**     | ✅ Reforzada     | Middleware CSRF personalizado       |
| **Arquitectura**  | ✅ Optimizada    | Rutas y configuración reorganizadas |
| **Docker**        | ✅ Estandarizado | Puerto estandar en toda la aplicación   |

---

## 🧪 Tests automáticos de calidad y seguridad

Este proyecto incluye scripts CLI personalizados para auditar el código antes de cada commit o despliegue:

| Script                       | Descripción                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| `npm run test:codigo`        | Detecta `var`, `console.log`, `debugger`, `DOCTYPE` faltantes, scripts mal definidos, duplicados, etc. |
| `npm run test:importaciones` | Verifica que **todas las rutas de importación sean válidas**, previniendo errores de compilación.      |
| `npm run test:huerfanos`     | Detecta archivos **no referenciados ni usados** (JS, CSS, HTML).                                       |
| `npm run validar:seguridad`  | Analiza el código en busca de `eval`, `child_process`, `Function`, rutas de import incorrectas, etc.   |
| `npm run analizar:logs`      | Busca patrones maliciosos en archivos `.log` generados.                                                |

> _"No basta con que funcione, tiene que estar limpio, mantenible y auditado."_

---

## 🧱 Estructura del proyecto

```
/
├── .env.example
├── docker-compose.yml
├── package.json
├── public/                # Archivos estáticos: CSS, imágenes, scripts frontend
├── src/                   # Backend Express y servicios
│   ├── app.mjs            # Entrada principal (optimizada)
│   ├── config/            # Configuración centralizada
│   ├── middlewares/       # Seguridad, idioma, protecciones, etc.
│   ├── utils/             # Logger, sanitizador, i18n, generadores, etc.
│   ├── scripts/           # Scripts CLI de análisis y build
│   ├── routes/            # Rutas organizadas por dominio funcional
│   └── views/             # Plantillas EJS organizadas por sección
├── logs/                  # Logs de auditoría y sistema
├── CORRECCIONES_APLICADAS.md  # Registro de mejoras implementadas
├── INFORME_REVISION_CODIGO.md # Análisis detallado del código
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

| Mecanismo                                | Estado | Mejoras Recientes            |
| ---------------------------------------- | ------ | ---------------------------- |
| HTTPS forzado (Zero Trust)               | ✅ Sí  | -                            |
| Headers de seguridad (CSP, HSTS...)      | ✅ Sí  | ✅ CSP unificada             |
| Protección contra XSS, CSRF y LFI        | ✅ Sí  | ✅ CSRF personalizado        |
| Validación y sanitización profunda       | ✅ Sí  | ✅ Límites configurables     |
| Protección de archivos subidos           | ✅ Sí  | -                            |
| Cookies seguras (`HttpOnly`, `SameSite`) | ✅ Sí  | -                            |
| Contenedor endurecido (Docker)           | ✅ Sí  | ✅ Puerto estandarizado      |
| Escaneo de vulnerabilidades              | ✅ Sí  | ✅ Dependencias actualizadas |
| Logs con auditoría y trazabilidad        | ✅ Sí  | -                            |

### 📊 Comparación con estándares

Cumple con OWASP ASVS nivel 2 y se aproxima al nivel 3:

- ✅ Producción segura sin exponer rutas críticas
- ✅ Preparado para trabajar con datos sensibles
- ✅ Ideal como base para SaaS o infraestructura privada
- ✅ **Configuración de seguridad centralizada y auditada**

> 🟢 **Nivel de seguridad estimado: 9.5 / 10**

---

## 📈 Recomendaciones Mozilla Observatory (implementadas)

- `Content-Security-Policy` avanzada con `nonce` (configuración unificada)
- `Permissions-Policy` y `Referrer-Policy` en modo restrictivo
- `Strict-Transport-Security` con preload
- `Cross-Origin-*` headers: aislamiento de recursos
- Cabeceras `X-*` correctamente aplicadas

---

## 🐳 Despliegue con Docker

```bash
git clone https://github.com/dav-tech-work/porfolio
cd porfolio-seguro
cp .env.example .env
docker compose up -d
```

### docker-compose.yml (actualizado)

```yaml
services:
  porfolio:
    image: porfolio
    container_name: porfolio
    ports:
      - '8000:3001' # Puerto estandarizado
    environment:
      NODE_ENV: production
      PORT: 3001
    read_only: true
    tmpfs:
      - /tmp
    user: '2001:2001'
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
- **Con código limpio y auditado continuamente**

---

## ✍️ Autor

**Daniel Arribas Velázquez**
Administrador de sistemas y redes · Desarrollador backend · Seguridad aplicada
🔗 [daniel-arribas-velazquez.dav-tech.work](https://daniel-arribas-velazquez.dav-tech.work)

## ⚡ Próximos pasos

- [x] Scripts de auditoría automatizados (`var`, `console.log`, importaciones, huérfanos)
- [x] **Corrección de dependencias y configuración unificada**
- [x] **Optimización de arquitectura y eliminación de duplicaciones**
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
- **El código ha sido auditado y corregido para garantizar calidad y seguridad**.

> Así puedes publicarlo sin miedo y clonarlo como punto de partida para proyectos serios.
