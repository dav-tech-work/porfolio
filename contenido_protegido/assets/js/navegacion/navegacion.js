// navegacion.js (módulo ES)

function initNavegacion() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');


    if (!menuToggle || !menuItems) {
        console.error('No se encontraron elementos de navegación necesarios');
        return;
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuItems.classList.toggle('active');
        const isExpanded = menuItems.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    document.addEventListener('click', (e) => {
        if (menuItems.classList.contains('active') &&
            !menuToggle.contains(e.target) &&
            !menuItems.contains(e.target)) {
            menuItems.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 500) {
                menuItems.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', false);
            }
        }, 250);
    });

    menuItems.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            menuItems.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        }
    });

}

export { initNavegacion };
