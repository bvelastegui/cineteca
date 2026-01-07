const loader = document.querySelector('#overlay');

export const ui = {
  /**
   * Muestra u oculta el indicador de carga de la página.
   *
   * @param {boolean} show - Indica si se debe mostrar o ocultar el cargador.
   *                          Si es `true`, se mostrará el cargador.
   *                          Si es `false`, se ocultará el cargador.
   */
  showPageLoader: (show) => {
    if (show) {
      loader.classList.remove('d-none');
    } else {
      loader.classList.add('d-none');
    }
  },
};