import Auth from '/js/features/auth/authService.js';
import { ui } from '/js/lib/dom.js';

/**
 * Renderiza los datos del usuario en el DOM actualizando el contenido del nombre y avatar.
 *
 * @param {import('/js/features/auth/User.js').User} user - Objeto que contiene los datos del usuario.
 * @return {void} No retorna ningún valor.
 */
export function renderUserData (user) {
  const userNameElement = document.getElementById('user-name');
  const logoutButton = document.getElementById('logout');

  userNameElement.innerHTML = `
<div class="d-inline-flex align-items-center">
  <div style="line-height: 1.2" class="d-flex flex-column align-items-end">
    <span>${user.name}</span>
    <small class="text-secondary">@${user.username}</small>
  </div>
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