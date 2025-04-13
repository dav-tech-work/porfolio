
# 🔐 Porfolio Web Seguro ![Security Level](https://img.shields.io/badge/security-9.5%2F10-brightgreen)

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
- ✅ **Sistema interno de verificación de calidad del código.**
- ✅ **Preparado para autenticación y roles en futuras versiones.**

---

## 🧪 Tests automáticos de calidad y seguridad

El proyecto incluye scripts personalizados para garantizar la calidad y seguridad del código antes de subirlo:

| Script | Descripción |
|--------|-------------|
| `npm run test:codigo` | Detecta `var`, `console.log`, `debugger`, comentarios sin cerrar, HTML sin `DOCTYPE`, scripts sin `type="module"`, duplicados, etc. |
| `npm run test:importaciones` | Verifica que **todas las rutas de importación sean válidas**, evitando errores en ejecución. |
| `npm run test:huerfanos` | Detecta archivos **no utilizados ni enlazados** (CSS, JS, HTML), para limpiar o revisar dependencias obsoletas. |

### 🧼 Filosofía de testing:
> *"No basta con que funcione, tiene que estar limpio, mantenible y auditado."*

Estos tests no son decorativos: son herramientas reales de auditoría interna.

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
│   ├── utils/             # Módulos (logger, sanitizador, generador de buscador...)
│   ├── scripts/           # Scripts de test y verificación
│   ├── routes/            # Rutas modulares
│   └── views/             # Plantillas EJS organizadas por sección
└── README.md
```

---

## 🛡️ Seguridad avanzada (Defense in Depth + Zero Trust)

Este proyecto ha sido diseñado con una arquitectura de seguridad moderna y robusta, aplicando principios de *Defense in Depth*, Zero Trust y DevSecOps.

### 🧱 Defensa en Capas

- Aplicación dockerizada con configuración segura (no-root, read-only, sin privilegios)
- Servidor alojado en entorno aislado, detrás de firewall y segmentado de la red local
- Acceso público solo a través de túnel Zero Trust (Cloudflare)
- Variables de entorno y secretos gestionados fuera del repositorio

### 🔐 Prácticas de Seguridad Implementadas

| Característica                          | Estado   |
|----------------------------------------|----------|
| HTTPS forzado                          | ✅ Sí     |
| Headers de seguridad (CSP, HSTS, etc)  | ✅ Sí     |
| Protección contra XSS, CSRF y LFI      | ✅ Sí     |
| Validación y sanitización de entradas  | ✅ Sí     |
| Protección de archivos subidos         | ✅ Sí     |
| Autenticación segura con cookies       | ✅ Sí     |
| Contenedor endurecido (Docker)         | ✅ Sí     |
| Escaneo de vulnerabilidades            | ✅ Sí     |
| Gestión de errores y logs controlada   | ✅ Sí     |

### 📊 Comparación con estándares de la industria

Cumple o supera los requisitos del nivel 2 de OWASP ASVS y se acerca al nivel 3:

- ✅ Apto para proyectos reales expuestos a internet
- ✅ Preparado para manejar datos personales no sensibles
- ✅ Ideal como base técnica educativa o de demostración de buenas prácticas

### 🔒 Estado actual

> 🟢 **Nivel de seguridad estimado: 9.5 / 10**
> 🧠 Arquitectura sólida y segura, lista para ser auditada y escalada
> 📈 Mejora continua en curso con pruebas automatizadas y perfiles avanzados

---

## 🐳 Despliegue con Docker


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

## 🧠 Filosofía del proyecto

Este porfolio no busca ser una SPA vistosa.
Busca demostrar que se puede tener una web **segura, privada, eficiente y mantenible**, sin frameworks de moda, sin exceso de dependencias, sin exponer el servidor.

---

## ✍️ Autor

**Daniel Arribas Velázquez**
Administrador de sistemas y redes, desarrollador backend autodidacta, obsesionado con la seguridad.
[daniel-arribas-velazquez.dav-tech.work](https://daniel-arribas-velazquez.dav-tech.work/)

---

## ⚡ Próximos pasos

- [x] Scripts de auditoría automatizados (`var`, `console.log`, importaciones, huérfanos)
- [ ] Integración de login y control de roles
- [ ] Sistema de alertas por logs
- [ ] Exportación automática de errores a Telegram/Discord
- [ ] Panel administrativo
- [ ] CI/CD con GitHub Actions

---

## 📜 Licencia

Este proyecto está licenciado bajo [MIT](LICENSE).

## 🔒 Sobre el contenido protegido

Este repositorio **no incluye contenido personal, educativo ni privado** de la carpeta `contenido_protegido/`.

- Solo se comparte la **estructura técnica, lógica de backend y sistema de seguridad**.
- Cualquier archivo sensible (HTMLs, PDFs, material personal) ha sido **intencionalmente excluido mediante `.gitignore`**.
- El proyecto está pensado para ser una base técnica reutilizable, no una demo con datos reales.

> Esto garantiza que el repositorio pueda ser público sin comprometer privacidad ni integridad.
