import Auth from '/js/features/auth/authService.js';
import { LOGIN_URL } from '/js/shared/constants.js';
import { redirect, ui } from '/js/lib/dom.js';
import { renderUserData } from '/js/lib/render.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.check()) {
    redirect(LOGIN_URL);
  }

  renderUserData(Auth.user);
  ui.showPageLoader(false);
});