/**
 * Utilidades para manipulación del DOM y navegación.
 */

/**
 * Redirige a una URL con parámetros opcionales.
 * 
 * @param {string} url - URL destino
 * @param {Object|null} [params=null] - Parámetros de query string
 */
export function redirect (url, params = null) {
  if (params !== null) {
    params = new URLSearchParams(params);
    url += '?' + params.toString();
  }

  window.location.href = url;
}

/**
 * Clase para manejar elementos UI globales como loaders.
 */
class UIManager {
  constructor () {
    this.loader = null;
  }

  /**
   * Inicializa los elementos del DOM.
   * Debe llamarse después de que el DOM esté listo.
   */
  init () {
    this.loader = document.querySelector('#overlay');
  }

  /**
   * Muestra u oculta el indicador de carga de la página.
   * 
   * @param {boolean} show - true para mostrar, false para ocultar
   */
  showPageLoader (show) {
    if (!this.loader) {
      console.warn('UI not initialized. Call ui.init() first.');
      return;
    }

    this.loader.classList.toggle('d-none', !show);
  }
}

// Instancia singleton del UI Manager
export const ui = new UIManager();

// Auto-inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ui.init());
  } else {
    ui.init();
  }
}
