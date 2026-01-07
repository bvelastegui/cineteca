import Auth from '/js/services/auth.js';
import { LOGIN_URL } from '/js/config/constants.js';
import { redirect } from '/js/utils/helpers.js';
import { ui } from '/js/utils/ui.js';
import { renderUserData } from '/js/utils/render.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.check()) {
    redirect(LOGIN_URL);
  }

  renderUserData(Auth.user);
  ui.toggleLoader(false);
});