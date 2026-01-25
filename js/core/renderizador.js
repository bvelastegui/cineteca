import { cerrarSesion } from '/js/core/auth.js';
import { ui } from '/js/core/dom.js';

/**
 * Renderiza los datos del usuario en el DOM actualizando el contenido del nombre y avatar.
 *
 * @param {Object} usuario - Objeto que contiene los datos del usuario normalizado.
 * @param {string} usuario.nombre - Nombre completo del usuario
 * @param {string} usuario.nombreUsuario - Nombre de usuario
 * @param {string} usuario.avatarUrl - URL del avatar
 * @return {void} No retorna ningún valor.
 */
export function renderizarDatosUsuario(usuario) {
  const elementoNombreUsuario = document.getElementById('user-name');
  const botonCerrarSesion = document.getElementById('logout');

  elementoNombreUsuario.innerHTML = `
<div class="d-inline-flex align-items-center">
  <div style="line-height: 1.2" class="d-flex flex-column align-items-end">
    <span>${usuario.nombre}</span>
    <small class="text-secondary">@${usuario.nombreUsuario}</small>
  </div>
  <img
    src="${usuario.avatarUrl}"
    height="30"
    width="30"
    class="ms-2 rounded-circle"
    alt=""
    loading="lazy"
  />
</div>
  `;

  botonCerrarSesion.addEventListener('click', async (e) => {
    e.preventDefault();
    ui.mostrarCargadorPagina(true);
    await cerrarSesion();
    window.location.reload();
  });
}
