// pageTransitions.js - Sistema de transiciones entre páginas

import { RoutingHelpers } from './routingHelpers.js';

// Configuración centralizada
const MENU_ORDER = ['/', '/proyectos', '/curriculum', '/formacion'];
const TRANSITION_DURATION = 1000;
const OVERLAY_DELAY = 80;
const NAVIGATION_HINTS_DELAY = 2000;

class PageTransitionManager {
    constructor() {
        this.menuOrder = MENU_ORDER;
        this.currentPageIndex = this.getCurrentPageIndex();
        this.isTransitioning = false;
        this.isBackNavigation = false;

        // Detectar si la página se cargó por navegación hacia atrás
        this.detectBackNavigation();

        this.init();
    }

    detectBackNavigation() {
        // Detectar navegación hacia atrás usando performance API
        // Nota: Usando API deprecated pero con fallback moderno
        if (window.performance && window.performance.navigation) {
            // eslint-disable-next-line deprecation/deprecation
            this.isBackNavigation = window.performance.navigation.type === 2; // TYPE_BACK_FORWARD
        } else if (window.performance && window.performance.getEntriesByType) {
            const navEntries = window.performance.getEntriesByType('navigation');
            if (navEntries.length > 0) {
                this.isBackNavigation = navEntries[0].type === 'back_forward';
            }
        }
    }

    init() {
        this.createTransitionElements();
        this.createNavigationDots();
        this.attachEventListeners();
        this.markCurrentPage();
        RoutingHelpers.addKeyboardShortcuts();

        // Garantizar visibilidad del contenido en cada carga
        this.forceContentVisibility();

        // Mostrar ayudas de navegación al cargar
        setTimeout(() => {
            RoutingHelpers.showNavigationHints();
        }, NAVIGATION_HINTS_DELAY);
    }

    createTransitionElements() {
        // Crear overlay de transición con degradado (solo si no existe)
        if (!document.querySelector('.page-transition-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'page-transition-overlay';
            this.setupOverlay(overlay);
            document.body.appendChild(overlay);
        }

        // Crear indicador de progreso (solo si no existe)
        if (!document.querySelector('.page-transition-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'page-transition-indicator';
            document.body.appendChild(indicator);
        }

        // Configurar contenedor principal
        this.setupMainContainer();
    }

    setupOverlay(overlay) {
        overlay.style.zIndex = '1';
        overlay.style.opacity = '0';
    }

    setupMainContainer() {
        const main = document.querySelector('main');
        if (main && !main.classList.contains('page-container')) {
            main.classList.add('page-container', 'slide-center');
            main.style.zIndex = '100';
            main.style.display = 'block';
            main.style.position = 'relative';
        }
    }

    createNavigationDots() {
        // Solo crear si no existen ya
        if (document.querySelector('.page-navigation-dots')) {
            return;
        }

        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'page-navigation-dots';

        const pages = RoutingHelpers.getMenuOrder();
        pages.forEach((page, _index) => {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            dot.setAttribute('data-page', page.name);
            dot.addEventListener('click', () => {
                this.navigateToPage(page.path);
            });

            if (page.path === window.location.pathname) {
                dot.classList.add('active');
            }

            dotsContainer.appendChild(dot);
        });

        document.body.appendChild(dotsContainer);
    }

    updateNavigationDots() {
        const dots = document.querySelectorAll('.nav-dot');
        const currentPath = window.location.pathname;

        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (this.menuOrder[index] === currentPath) {
                dot.classList.add('active');
            }
        });
    }

    getCurrentPageIndex() {
        const currentPath = window.location.pathname;
        const index = this.menuOrder.indexOf(currentPath);
        return index !== -1 ? index : 0;
    }

    getPageDirection(targetUrl) {
        const targetIndex = this.menuOrder.indexOf(targetUrl);
        if (targetIndex === -1) return 'right'; // Por defecto

        const currentIndex = this.getCurrentPageIndex();
        return targetIndex > currentIndex ? 'right' : 'left';
    }

    attachEventListeners() {
        // Interceptar clics en enlaces de navegación
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (!link) return;

            const href = link.getAttribute('href');

            // Solo interceptar enlaces internos del menú
            if (this.isInternalMenuLink(href)) {
                e.preventDefault();
                this.navigateToPage(href, link);
            }
        });

        // Escuchar eventos de navegación personalizados
        document.addEventListener('requestPageTransition', (e) => {
            this.navigateToPage(e.detail.targetPath);
        });

        // Manejar navegación con teclas de flecha
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;

            if (e.key === 'ArrowRight' && !this.isInputFocused()) {
                e.preventDefault();
                this.navigateToNextPage();
            } else if (e.key === 'ArrowLeft' && !this.isInputFocused()) {
                e.preventDefault();
                this.navigateToPreviousPage();
            }
        });

        // Manejar eventos de historial del navegador
        window.addEventListener('popstate', () => {
            // No interferir con la navegación hacia atrás/adelante del navegador
            // Solo actualizar el estado visual sin hacer transiciones
            if (!this.isTransitioning) {
                // Limpiar cualquier transición en curso
                this.cleanupTransition();

                // Actualizar indicadores visuales sin transición
                setTimeout(() => {
                    this.currentPageIndex = this.getCurrentPageIndex();
                    this.markCurrentPage();
                    this.updateNavigationDots();
                    this.forceContentVisibility();
                }, 50);
            }
        });
    }

    isInternalMenuLink(href) {
        // Verificar si es un enlace del menú principal
        if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
            return false;
        }

        return this.menuOrder.includes(href) || href.startsWith('/');
    }

    isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.contentEditable === 'true'
        );
    }

    markCurrentPage() {
        // Marcar el enlace activo en el menú
        const currentPath = window.location.pathname;
        const menuLinks = document.querySelectorAll('.menu-items a');

        menuLinks.forEach(link => {
            link.classList.remove('active', 'current-page');
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active', 'current-page');
            }
        });

        // Actualizar indicadores de navegación
        this.updateNavigationDots();
    }

    async navigateToPage(targetUrl) {
        if (this.isTransitioning || window.location.pathname === targetUrl) {
            return;
        }

        this.isTransitioning = true;
        const direction = this.getPageDirection(targetUrl);

        try {
            // Mostrar transición con overlay y efecto de salida
            await this.showTransitionStart(direction);

            // Pequeña pausa para el efecto cinematográfico
            await new Promise(resolve => setTimeout(resolve, 150));

            // Navegar a la página real
            window.location.href = targetUrl;

        } catch (error) {
            console.error('Error en la transición de página:', error);
            this.cleanupTransition();
            // Fallback: navegación normal
            window.location.href = targetUrl;
        }
    }

    cleanupTransition() {
        const overlay = document.querySelector('.page-transition-overlay');
        const indicator = document.querySelector('.page-transition-indicator');
        const main = document.querySelector('main');

        if (overlay) {
            overlay.classList.remove('active');
            overlay.style.opacity = '0';
            overlay.style.zIndex = '1';
        }

        if (indicator) {
            indicator.classList.remove('loading');
        }

        if (main) {
            main.classList.remove('transitioning', 'page-loading', 'slide-out-left', 'slide-out-right');
            // Restaurar estado normal
            main.style.zIndex = '100';
            main.style.opacity = '1';
            main.style.transform = 'translateX(0)';
            main.style.filter = 'none';
            main.style.visibility = 'visible';
        }

        this.isTransitioning = false;
    }

    async showTransitionStart(direction) {
        const overlay = document.querySelector('.page-transition-overlay');
        const indicator = document.querySelector('.page-transition-indicator');
        const main = document.querySelector('main');

        // Activar indicadores de forma escalonada
        if (indicator) {
            indicator.classList.add('loading');
        }

        if (main) {
            main.classList.add('transitioning', 'page-loading');
        }

        // Mostrar overlay con degradado
        setTimeout(() => {
            if (overlay) {
                overlay.classList.add('active');
                overlay.style.opacity = '0.7';
                overlay.style.zIndex = '1';
            }
        }, OVERLAY_DELAY);

        // Animar salida del contenido actual
        await this.animatePageExit(direction);
    }

    async animatePageExit(direction) {
        const main = document.querySelector('main');
        if (!main) return;

        return new Promise(resolve => {
            const exitClass = direction === 'right' ? 'slide-out-left' : 'slide-out-right';

            // Limpiar clases previas y aplicar la nueva
            main.classList.remove('slide-in-left', 'slide-in-right', 'slide-center');
            main.classList.add(exitClass);

            // Esperar a que termine la animación CSS
            setTimeout(() => {
                resolve();
            }, TRANSITION_DURATION);
        });
    }

    async navigateToNextPage() {
        const nextIndex = (this.currentPageIndex + 1) % this.menuOrder.length;
        const nextUrl = this.menuOrder[nextIndex];
        await this.navigateToPage(nextUrl);
    }

    async navigateToPreviousPage() {
        const prevIndex = this.currentPageIndex === 0 ?
            this.menuOrder.length - 1 :
            this.currentPageIndex - 1;
        const prevUrl = this.menuOrder[prevIndex];
        await this.navigateToPage(prevUrl);
    }



    forceContentVisibility() {
        const main = document.querySelector('main');
        if (main) {
            // Solo remover clases problemáticas
            main.classList.remove('slide-out-left', 'slide-out-right');

            // Configuración básica
            main.style.zIndex = '100';
            main.style.display = 'block';
            main.style.position = 'relative';

            // Solo aplicar estado normal si no está en transición
            if (!main.classList.contains('transitioning') && !main.classList.contains('page-loading')) {
                main.classList.add('slide-center');
            }
        }

        // Asegurar que el overlay esté invisible
        const overlay = document.querySelector('.page-transition-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            overlay.style.opacity = '0';
            overlay.style.zIndex = '1';
        }
    }
}

// Función de inicialización optimizada
function initPageTransitions() {
    // Solo inicializar si no estamos en una página de error o especial
    if (!document.body.classList.contains('error-page')) {
        new PageTransitionManager();

        // Configuración del contenido con animación de entrada
        setupPageEntry();
    }
}

function setupPageEntry() {
    const main = document.querySelector('main');
    if (!main) return;

    // Configuración básica
    main.classList.add('page-container');
    main.style.zIndex = '100';
    main.style.display = 'block';
    main.style.position = 'relative';

    // Detectar dirección de navegación basada en referrer
    const entryClass = determineEntryDirection();
    main.classList.add(entryClass);
}

function determineEntryDirection() {
    const currentPath = window.location.pathname;
    const referrer = document.referrer;

    if (!referrer) return 'slide-center';

    try {
        const referrerPath = new URL(referrer).pathname;
        const currentIndex = MENU_ORDER.indexOf(currentPath);
        const referrerIndex = MENU_ORDER.indexOf(referrerPath);

        if (currentIndex !== -1 && referrerIndex !== -1) {
            if (currentIndex > referrerIndex) {
                return 'slide-in-from-right'; // Navegación hacia adelante
            } else if (currentIndex < referrerIndex) {
                return 'slide-in-from-left'; // Navegación hacia atrás
            }
        }
    } catch (error) {
        console.warn('Error al procesar referrer:', error);
    }

    return 'slide-center';
}

export { initPageTransitions };
