// mail.js (módulo ES)

function initMail() {
    fetch("/api/email")
        .then(res => res.json())
        .then(({ email }) => {
            const mailBtn = document.getElementById("mailBtn");
            if (mailBtn) {
                mailBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    window.location.href = `mailto:${email}`;
                });
            }

            const emailElems = document.querySelectorAll("#email");
            emailElems.forEach(elem => {
                elem.innerHTML = `<a href="mailto:${email}" class="email-link">${email}</a>`;
            });
        })
        .catch(err => {
            console.error("❌ Error al obtener el correo desde el backend:", err);
        });
}

export { initMail };
