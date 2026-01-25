/**
 * Renderer de listas - Capa de renderizado del DOM.
 * Funciones puras para generar HTML y actualizar la interfaz.
 */

/**
 * Genera el HTML de una tarjeta de lista.
 * @param {Object} lista - Lista normalizada (datos en español)
 * @return {string} - HTML de la tarjeta
 */
export function generarHtmlLista(lista) {
  return `
    <div class="card lista-card">
      <div class="card-body">
        <h5 class="card-title">
          ${lista.nombre}
          <small>${lista.cantidadFavoritos}</small>
        </h5>
        <p>${lista.descripcion}</p>
        <button class="btn btn-primary btn-editar" data-id="${lista.id}">Editar</button>
        <button class="btn btn-danger btn-eliminar" data-id="${lista.id}">Eliminar</button>
      </div>
    </div>
  `;
}

/**
 * Renderiza un array de listas en el contenedor especificado.
 * @param {Array} listas - Array de listas normalizadas
 * @param {HTMLElement} contenedor - Elemento del DOM donde renderizar
 */
export function renderizarListas(listas, contenedor) {
  if (!contenedor) {
    console.error('Contenedor no encontrado para renderizar listas');
    return;
  }

  const html = listas
    .map(lista => generarHtmlLista(lista))
    .join('');

  contenedor.innerHTML = html;
}

/**
 * Rellena el formulario con los datos de una lista para editarla.
 * @param {Object} lista - Lista normalizada a editar
 */
export function rellenarFormularioEdicion(lista) {
  const nameInput = document.getElementById('name');
  const descripcionInput = document.getElementById('descripcion');
  const btnLista = document.getElementById('btn-lista');
  const idListaInput = document.getElementById('id-lista');

  if (nameInput) nameInput.value = lista.nombre;
  if (descripcionInput) descripcionInput.value = lista.descripcion;
  if (btnLista) btnLista.innerText = 'Guardar Cambios';
  if (idListaInput) idListaInput.value = lista.id;
}

/**
 * Limpia el formulario de lista.
 */
export function limpiarFormulario() {
  const nameInput = document.getElementById('name');
  const descripcionInput = document.getElementById('descripcion');
  const btnLista = document.getElementById('btn-lista');
  const idListaInput = document.getElementById('id-lista');

  if (nameInput) nameInput.value = '';
  if (descripcionInput) descripcionInput.value = '';
  if (btnLista) btnLista.innerText = 'Crear Lista';
  if (idListaInput) idListaInput.value = '';
}
