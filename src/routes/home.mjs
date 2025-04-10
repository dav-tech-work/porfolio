import express from "express";
const router = express.Router();

// Ruta: /
router.get("/", (req, res) => {
  const tecnologias = [
    { img: "Windows.svg", text: "Windows" },
    { img: "debian.svg", text: "Debian" },
    { img: "ubuntu.svg", text: "Ubuntu" },
    { img: "fedora.svg", text: "Fedora" },
    { img: "arch.svg", text: "Arch Linux" },
    { img: "kalilinux.svg", text: "Kali Linux" },
    { img: "parrotos.svg", text: "Parrot OS" },
    { img: "firewall.svg", text: "pfSense" },
    { img: "firewall.svg", text: "SonicWall" },
    { img: "vmware.svg", text: "VMware" },
    { img: "proxmox.svg", text: "Proxmox" },
    { img: "docker.svg", text: "Docker" },
    { img: "acronis.svg", text: "Acronis" },
    { img: "backupsms.ico", text: "Veeam" },
    { img: "datto.svg", text: "Datto" },
    { img: "python.svg", text: "Python" },
    { img: "javascript.svg", text: "JavaScript" },
    { img: "Html.svg", text: "HTML5" },
    { img: "css.svg", text: "CSS3" }
  ];

  res.render("paginas/index", {
    titulo: req.traducciones?.home || "Inicio",
    tipo: "home",
    idioma: req.idioma,
    t: req.traducciones,
    csrfToken: req.csrfToken,
    tecnologias
  });
});

// Ruta: /curriculum
router.get("/curriculum", (req, res) => {
  res.render("paginas/curriculum", {
    titulo: req.traducciones?.curriculum || "Currículum",
    tipo: "curriculum",
    idioma: req.idioma,
    t: req.traducciones,
    csrfToken: req.csrfToken
  });
});

// Ruta: /proyectos
router.get("/proyectos", (req, res) => {
  res.render("paginas/proyectos", {
    titulo: req.traducciones?.proyectos || "Proyectos",
    tipo: "proyectos",
    idioma: req.idioma,
    t: req.traducciones,
    csrfToken: req.csrfToken
  });
});

export default router;
