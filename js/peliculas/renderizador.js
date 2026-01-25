/**
 * Renderer de películas - Capa de renderizado del DOM.
 * Funciones puras para generar HTML y actualizar la interfaz.
 */

/**
 * Genera el HTML de una tarjeta de película.
 * @param {Object} pelicula - Película normalizada (datos en español)
 * @param {Array} listas - Array de listas del usuario (opcional)
 * @param {number|null} listaActualId - ID de la lista actual (null si no estamos en una lista)
 * @return {string} - HTML de la tarjeta
 */
export function generarHtmlPelicula(pelicula, listas = [], listaActualId = null) {
  // Si estamos en una lista, mostrar botón de eliminar
  // Si no, mostrar dropdown para agregar a listas
  let accionHtml;

  if (listaActualId !== null) {
    // Botón para eliminar de la lista actual
    accionHtml = `
      <div class="ms-auto">
        <a href="#" class="link-danger icon-link eliminar-de-lista" data-pelicula-id="${pelicula.id}" data-lista-id="${listaActualId}" title="Eliminar de esta lista">
          <i class="bi bi-trash"></i>
        </a>
      </div>
    `;
  } else {
    // Dropdown para agregar a listas
    const listasHtml = listas.length > 0
      ? listas.map(lista => `
          <a href="#" class="dropdown-item agregar-a-lista" data-pelicula-id="${pelicula.id}" data-lista-id="${lista.id}">
            <i class="bi bi-bookmark-plus"></i>
            ${lista.nombre}
          </a>
        `).join('')
      : '<span class="dropdown-item text-muted disabled">No tienes listas</span>';

    accionHtml = `
      <div class="ms-auto dropdown dropup">
        <a href="javascript:void(0)" data-bs-toggle="dropdown" class="link-body-emphasis icon-link">
          <i class="bi bi-plus-circle"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-end" style="margin-top: -10px">
          <a href="#" class="dropdown-item crear-lista-desde-pelicula">
            <i class="bi bi-plus"></i>
            Crear Lista
          </a>
          <div class="dropdown-divider"></div>
          <h6 class="dropdown-header">Agregar a lista</h6>
          ${listasHtml}
        </div>    
      </div>
    `;
  }

  return `
<div class="position-relative d-flex flex-column">
  <div class="position-relative">
    <img
      class="rounded-3 w-100 border shadow-sm"
      src="${pelicula.poster}"
      style="object-fit: cover; height: 342px"
      alt="${pelicula.titulo}"
    >
    <small class="position-absolute bottom-0 end-0 me-1 mb-1 badge bg-dark">
      <i class="bi bi-star-fill text-warning"></i> 
      ${pelicula.rating.toFixed(2)}
    </small>
  </div>
  <div
    class="mt-2 fw-semibold"
    style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden; width: 100%"
    data-bs-toggle="tooltip"
    title="${pelicula.titulo}"
  >
    ${pelicula.titulo}
  </div>
  <div class="d-flex align-items-center mt-1">
    <small class="text-secondary">
    ${pelicula.anio} · ${pelicula.categoria}
    </small>
    ${accionHtml}
  </div>
</div>
`;
}

/**
 * Renderiza un array de películas en el contenedor especificado.
 * @param {Array} peliculas - Array de películas normalizadas
 * @param {HTMLElement} contenedor - Elemento del DOM donde renderizar
 * @param {Array} listas - Array de listas del usuario (opcional)
 * @param {number|null} listaActualId - ID de la lista actual (opcional)
 */
export function renderizarPeliculas(peliculas, contenedor, listas = [], listaActualId = null) {
  if (!contenedor) {
    console.error('Contenedor no encontrado para renderizar películas');
    return;
  }

  const html = peliculas
    .map(pelicula => generarHtmlPelicula(pelicula, listas, listaActualId))
    .join('');

  contenedor.innerHTML = html;
}

/**
 * Muestra u oculta el indicador de carga.
 * @param {HTMLElement} overlay - Elemento overlay del loader
 * @param {boolean} mostrar - true para mostrar, false para ocultar
 */
export function mostrarCargador(overlay, mostrar) {
  if (!overlay) {
    console.error('Overlay no encontrado');
    return;
  }

  if (mostrar) {
    overlay.classList.remove('d-none');
  } else {
    overlay.classList.add('d-none');
  }
}
