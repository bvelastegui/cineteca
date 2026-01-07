import Auth from '/js/services/auth.js';
import { redirect } from '/js/utils/helpers.js';
import { HOME_URL } from '/js/config/constants.js';
import { ui } from '/js/utils/ui.js';

document.addEventListener('DOMContentLoaded', async () => {
  if (Auth.check()) {
    redirect(HOME_URL);
    return;
  }

  const loginForm = document.querySelector('#form-login');
  const inputApiKey = document.querySelector('#key');
  const invalidFeedback = inputApiKey
    .closest('.form-floating')
    .querySelector('.invalid-feedback');

  // Si existe el request_token en los parámetros de la url,
  // validamos y creamos una sesión la cual será utilizada
  // para el manejo de las listas.
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('request_token') && searchParams.has('approved')) {
    try {
      await Auth.createSession();
      await Auth.loadUserData();
      redirect(HOME_URL);
    } catch (error) {
      console.error(error);
      inputApiKey.classList.add('is-invalid');
      invalidFeedback.innerText = 'No se pudo completar la autorización.';
    }
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const apiKey = inputApiKey.value.trim();
    if (apiKey.length === 0) {
      inputApiKey.classList.add('is-invalid');
      invalidFeedback.innerText = 'Este campo es obligatorio.';
      return;
    }

    try {
      ui.showPageLoader(true);
      await Auth.login(apiKey);
    } catch (error) {
      inputApiKey.classList.add('is-invalid');
      invalidFeedback.innerText = 'El API KEY proporcionado es invalido.';
    } finally {
      ui.showPageLoader(false);
    }

    if (!Auth.apiKey) {
      return;
    }

    try {
      ui.showPageLoader(true);
      await Auth.requestAuthorization();
    } catch (error) {
      inputApiKey.classList.add('is-invalid');
      invalidFeedback.innerText = 'No se puede crear una sesión.';
    }
  });

  ui.showPageLoader(false);
});