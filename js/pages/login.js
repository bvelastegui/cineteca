import Auth from '/js/features/auth/authService.js';
import { redirect, ui } from '/js/lib/dom.js';
import { HOME_URL } from '/js/shared/constants.js';

class LoginController {
  constructor () {
    // Registramos los elementos del DOM que utilizaremos
    this.dom = {
      /** @type {HTMLFormElement} */
      form: document.querySelector('#form-login'),
      /** @type {HTMLInputElement} */
      inputApiKey: document.querySelector('#key'),
      /** @type {HTMLElement} */
      invalidFeedback: document.querySelector('#invalid-feedback'),
    };

    // Inicializamos el controlador
    this.init()
      .catch(console.error);
  }

  async init () {
    // Verifica si ya está logueado
    if (await Auth.check()) {
      return redirect(HOME_URL);
    }

    // Verifica si volvemos de la redirección (OAuth flow)
    await this.checkAuthReturn();

    // Registra el evento al enviar el formulario
    this.dom.form.addEventListener(
      'submit',
      (e) => this.handleFormSubmit(e),
    );

    // Ocultamos el loader que se activa por defecto
    ui.showPageLoader(false);
  }

  /**
   * Maneja el retorno del servicio de autenticación
   */
  async checkAuthReturn () {
    const searchParams = new URLSearchParams(window.location.search);
    const requestToken = searchParams.get('request_token');
    const approved = searchParams.get('approved');

    if (requestToken && approved === 'true') {
      try {
        ui.showPageLoader(true); // Bloquear UI mientras procesamos

        await Auth.createSession();
        redirect(HOME_URL);
      } catch (error) {
        console.error(error);
        ui.showPageLoader(false); // Importante desbloquear si falla
        this.showError(
          'No se pudo completar la autorización. ' +
          'Intenta nuevamente.',
        );
      }
    }
  }

  /**
   * Maneja el envío del formulario (Inicio del flujo)
   *
   * @param {Event} e - Evento de envío del formulario
   */
  async handleFormSubmit (e) {
    e.preventDefault();
    this.clearErrors();

    const apiKey = this.dom.inputApiKey.value.trim();

    if (apiKey.length === 0) {
      return this.showError('Este campo es obligatorio.');
    }

    try {
      ui.showPageLoader(true);

      await Auth.login(apiKey);
      await Auth.requestAuthorization();
    } catch (error) {
      console.error(error);
      ui.showPageLoader(false);
      this.showError(
        'El API KEY proporcionado es inválido ' +
        'o hubo un error de conexión.',
      );
    }
  }

  /**
   * @param {string} message
   */
  showError (message) {
    this.dom.inputApiKey.classList.add('is-invalid');
    this.dom.invalidFeedback.innerText = message;
  }

  clearErrors () {
    this.dom.inputApiKey.classList.remove('is-invalid');
    this.dom.invalidFeedback.innerText = '';
  }
}

// Inicialización autoinvocada al cargar el DOM
document.addEventListener('DOMContentLoaded', () => new LoginController());
