import Auth from '/js/services/auth.js';
import { ui } from '/js/utils/ui.js';

/**
 * Renderiza los datos del usuario en el DOM actualizando el contenido del nombre y avatar.
 *
 * @param {import('/js/models/User.js').User} user - Objeto que contiene los datos del usuario.
 * @return {void} No retorna ningún valor.
 */
export function renderUserData (user) {
  const userNameElement = document.getElementById('user-name');
  const logoutButton = document.getElementById('logout');

  userNameElement.innerHTML = `
<div class="d-inline-flex align-items-center">
  ${user.name}
  <img
    src="${user.avatarUrl}"
    height="30"
    width="30"
    class="ms-2 rounded-circle"
    alt=""
    loading="lazy"
  />
</div>
  `;

  logoutButton.addEventListener('click', async (e) => {
    e.preventDefault();
    ui.showPageLoader(true);
    await Auth.logout();
    window.location.reload();
  });
}