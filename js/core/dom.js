/**
 * Utilidades para manipulación del DOM y navegación.
 */

/**
 * Redirige a una URL con parámetros opcionales.
 *
 * @param {string} url - URL destino
 * @param {Object|null} [parametros=null] - Parámetros de query string
 */
export function redirigir(url, parametros = null) {
  if (parametros !== null) {
    parametros = new URLSearchParams(parametros);
    url += '?' + parametros.toString();
  }

  window.location.href = url;
}

/**
 * Clase para manejar elementos UI globales como loaders y notificaciones.
 */
class GestorUI {
  constructor() {
    this.cargador = null;
    this.toast = null;
    this.toastMensaje = null;
    this.toastInstancia = null;
  }

  /**
   * Inicializa los elementos del DOM.
   * Debe llamarse después de que el DOM esté listo.
   */
  inicializar() {
    this.cargador = document.querySelector('#overlay');
    this.toast = document.querySelector('#toast-notificacion');
    this.toastMensaje = document.querySelector('#toast-mensaje');

    // Inicializar instancia de Bootstrap Toast si existe
    if (this.toast && typeof bootstrap !== 'undefined') {
      this.toastInstancia = new bootstrap.Toast(this.toast, {
        autohide: true,
        delay: 3000,
      });
    }
  }

  /**
   * Muestra u oculta el indicador de carga de la página.
   *
   * @param {boolean} mostrar - true para mostrar, false para ocultar
   */
  mostrarCargadorPagina(mostrar) {
    if (!this.cargador) {
      console.warn('UI no inicializada. Llama a ui.inicializar() primero.');
      return;
    }

    this.cargador.classList.toggle('d-none', !mostrar);
  }

  /**
   * Muestra una notificación toast.
   *
   * @param {string} mensaje - Mensaje a mostrar
   * @param {string} tipo - Tipo de toast: 'success', 'error', 'warning', 'info'
   */
  mostrarToast(mensaje, tipo = 'info') {
    if (!this.toast || !this.toastMensaje || !this.toastInstancia) {
      console.warn('Toast no inicializado. Llama a ui.inicializar() primero.');
      // Fallback a alert si toast no está disponible
      alert(mensaje);
      return;
    }

    // Remover clases anteriores
    this.toast.classList.remove('text-bg-success', 'text-bg-danger', 'text-bg-warning', 'text-bg-info');

    // Agregar clase según el tipo
    const tipoClase = {
      'success': 'text-bg-success',
      'error': 'text-bg-danger',
      'warning': 'text-bg-warning',
      'info': 'text-bg-info',
    };

    this.toast.classList.add(tipoClase[tipo] || 'text-bg-info');

    // Establecer mensaje
    this.toastMensaje.textContent = mensaje;

    // Mostrar toast
    this.toastInstancia.show();
  }
}

// Instancia singleton del Gestor UI
export const ui = new GestorUI();

// Auto-inicializar cuando el DOM esté listo
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ui.inicializar());
  } else {
    ui.inicializar();
  }
}
