import Auth from '/js/services/auth.js';
import { LOGIN_URL } from '/js/constants.js';
import { redirect } from '/js/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.check()) {
    redirect(LOGIN_URL);
  }
});