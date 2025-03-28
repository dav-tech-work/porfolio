# 🌐 Portfolio Personal - Daniel Arribas Velázquez

Este es mi sitio web personal, desarrollado como una **Single Page Application (SPA)** en HTML, CSS y JavaScript puro. Aquí muestro mis proyectos, formación académica y experiencia profesional en administración de sistemas, redes y seguridad informática.

---

## 🧠 Tecnologías utilizadas

- **HTML5 + CSS3**: Maquetación semántica y diseño responsive.
- **JavaScript Vanilla**: Sin frameworks externos.
- **SPA Routing**: Navegación sin recargas con `rutas.js`.
- **Multilenguaje**: Español, Inglés y Catalán gestionado desde `personalizacion.js`.
- **Temas claro/oscuro**: Guardado en `localStorage`.
- **Seguridad**: Sanitización, validación y protección XSS con `seguridad.js`.

---

## 📂 Estructura del proyecto

```
/
├── index.html                # Página principal
├── 404.html                  # Página de error personalizada
├── pages/
│   ├── proyectos.html
│   ├── curriculum.html
│   └── formacion.html
├── css/
│   ├── base.css
│   ├── colores.css
│   ├── [nombre].css
├── js/
│   ├── main.js

```

---

## 🔒 Seguridad implementada

- **Sanitización y validación** de inputs, URLs y correos.
- **Protección contra XSS** (Cross-Site Scripting).
- **Encabezados seguros sugeridos para NGINX**.
- **Rate limiting** simulado + tokens CSRF.
- **Clickjacking** prevenido con headers.

---

## 🚀 Funcionalidades destacadas

- Cambios de idioma y tema instantáneos.
- Email protegido contra bots (ofuscado).
- SPA que actualiza solo el contenido principal (`<main>`).
- Diseño responsive y accesible.
- Preparado para internacionalización (`data-i18n`).
- Preparado para conectar backend (búsqueda, formularios).

---

## 📸 Demo en vivo

<!-- Descomenta y reemplaza con tu dominio real si lo publicas -->
<!-- [🔗 Visitar demo](https://mi-dominio.com) -->

---

## 🛠 Instalación local

```bash
git clone https://github.com/dav-tech-work/portfolio.git
cd portfolio
```

Luego, simplemente abre `index.html` en tu navegador o usa un servidor local:

```bash
npx serve .
# o
python3 -m http.server
```

---

## 🧪 Test manuales sugeridos

- Cambiar tema y recargar → ¿se mantiene?
- Cambiar idioma y navegar → ¿todo se actualiza?
- Introducir búsqueda inválida → ¿lo bloquea?
- Navegar desde menú móvil → ¿funciona el toggle?

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.  
© 2025 [Daniel Arribas Velázquez](https://github.com/dav-tech-work)

---

## 💬 Contacto

📧 [danielarribasvelazquez@dav-tech.work](mailto:danielarribasvelazquez@dav-tech.work)  
🔗 [LinkedIn](https://linkedin.com/in/daniel-arribas-velazquez)  
🐱 [GitHub](https://github.com/dav-tech-work)