// routingHelpers.js - Utilidades para el sistema de routing

// Configuración centralizada del menú
const MENU_CONFIG = [
    { path: '/', name: 'Inicio', order: 0 },
    { path: '/proyectos', name: 'Proyectos', order: 1 },
    { path: '/curriculum', name: 'Curriculum', order: 2 },
    { path: '/formacion', name: 'Formación', order: 3 }
];

class RoutingHelpers {
    static getMenuOrder() {
        return MENU_CONFIG;
    }

    static getCurrentPageInfo() {
        const currentPath = window.location.pathname;
        return MENU_CONFIG.find(page => page.path === currentPath) || MENU_CONFIG[0];
    }

    static getPageByPath(path) {
        return MENU_CONFIG.find(page => page.path === path);
    }

    static getNavigationDirection(fromPath, toPath) {
        const fromPage = MENU_CONFIG.find(p => p.path === fromPath);
        const toPage = MENU_CONFIG.find(p => p.path === toPath);

        if (!fromPage || !toPage) return 'right';
        return toPage.order > fromPage.order ? 'right' : 'left';
    }

    static getNextPage(currentPath) {
        const currentPage = MENU_CONFIG.find(p => p.path === currentPath);
        if (!currentPage) return MENU_CONFIG[0];

        const nextIndex = (currentPage.order + 1) % MENU_CONFIG.length;
        return MENU_CONFIG[nextIndex];
    }

    static getPreviousPage(currentPath) {
        const currentPage = MENU_CONFIG.find(p => p.path === currentPath);
        if (!currentPage) return MENU_CONFIG[0];

        const prevIndex = currentPage.order === 0 ?
            MENU_CONFIG.length - 1 :
            currentPage.order - 1;
        return MENU_CONFIG[prevIndex];
    }

    static isValidMenuPath(path) {
        return MENU_CONFIG.some(page => page.path === path);
    }

    static addKeyboardShortcuts() {
        // Evitar múltiples listeners
        if (this._keyboardListenerAdded) return;
        this._keyboardListenerAdded = true;

        document.addEventListener('keydown', (e) => {
            // Solo activar si no hay elementos de entrada enfocados
            if (this.isInputFocused()) return;

            switch(e.key) {
                case 'ArrowRight':
                case 'j':
                    e.preventDefault();
                    this.navigateNext();
                    break;
                case 'ArrowLeft':
                case 'k':
                    e.preventDefault();
                    this.navigatePrevious();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.navigateToHome();
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.navigateToIndex(parseInt(e.key) - 1);
                    }
                    break;
            }
        });
    }

    static isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.contentEditable === 'true' ||
            activeElement.tagName === 'SELECT'
        );
    }

    static navigateNext() {
        const nextPage = this.getNextPage(window.location.pathname);
        this.triggerNavigation(nextPage.path);
    }

    static navigatePrevious() {
        const prevPage = this.getPreviousPage(window.location.pathname);
        this.triggerNavigation(prevPage.path);
    }

    static navigateToHome() {
        this.triggerNavigation('/');
    }

    static navigateToIndex(index) {
        if (index >= 0 && index < MENU_CONFIG.length) {
            this.triggerNavigation(MENU_CONFIG[index].path);
        }
    }

    static triggerNavigation(path) {
        // Validar que sea una ruta válida
        if (!path || !this.isValidMenuPath(path)) {
            console.warn('Ruta inválida para navegación:', path);
            return;
        }

        // Disparar evento personalizado para que el PageTransitionManager lo maneje
        const event = new CustomEvent('requestPageTransition', {
            detail: { targetPath: path }
        });
        document.dispatchEvent(event);
    }

    static showNavigationHints() {
        // Solo mostrar si no existe ya
        if (document.querySelector('.navigation-hints')) return;

        const hints = document.createElement('div');
        hints.className = 'navigation-hints';
        hints.innerHTML = `
            <div class="hints-content">
                <h4>Atajos de navegación:</h4>
                <div class="hint-item">
                    <kbd>←</kbd> <kbd>→</kbd> Navegar entre páginas
                </div>
                <div class="hint-item">
                    <kbd>Ctrl</kbd> + <kbd>1-4</kbd> Ir a página específica
                </div>
                <div class="hint-item">
                    <kbd>Home</kbd> Ir al inicio
                </div>
            </div>
        `;

        document.body.appendChild(hints);

        // Auto-ocultar después de 3 segundos
        setTimeout(() => {
            if (hints.parentNode) {
                hints.remove();
            }
        }, 3000);
    }
}

export { RoutingHelpers };
