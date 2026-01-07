import Auth from '/js/services/auth.js';
import { LOGIN_URL } from '/js/config/constants.js';
import { redirect } from '/js/utils/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.check()) {
    redirect(LOGIN_URL);
  }
});