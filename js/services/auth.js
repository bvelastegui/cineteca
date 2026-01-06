import {
  authentication,
  generateRequestToken,
  generateSession,
} from '/js/api/auth.js';
import { redirect } from '/js/utils.js';
import { TMDB_AUTHORIZATION_BASE_URL } from '/js/constants.js';

const AUTH_CACHE_PREFIX = 'auth';

export default class Auth {
  static get apiKey () {
    return localStorage.getItem(`${AUTH_CACHE_PREFIX}_key`);
  }

  static set apiKey (apiKey) {
    localStorage.setItem(`${AUTH_CACHE_PREFIX}_key`, apiKey);
  }

  static get sessionId () {
    return localStorage.getItem(`${AUTH_CACHE_PREFIX}_session_id`);
  }

  static set sessionId (sessionId) {
    localStorage.setItem(`${AUTH_CACHE_PREFIX}_session_id`, sessionId);
  }

  static async login (apiKey) {
    await authentication({ apiKey });

    this.apiKey = apiKey;
  }

  /**
   * Solicita autorización del usuario para la aplicación mediante
   * la generación de un token de solicitud y redirige al usuario
   * a la página de autorización correspondiente.
   */
  static async requestAuthorization () {
    const request = await generateRequestToken({ apiKey: this.apiKey });

    redirect(`${TMDB_AUTHORIZATION_BASE_URL}/${request.request_token}`, {
      redirect_to: window.location.href,
    });
  }

  /**
   * Crea una nueva sesión utilizando los parámetros de la URL.
   */
  static async createSession () {
    const searchParams = new URLSearchParams(window.location.search);

    if (!searchParams.has('request_token') && !searchParams.has('approved')) {
      return;
    }

    if (searchParams.get('approved') !== 'true') {
      throw new Error('No se proporciono la autorización.');
    }

    const session = await generateSession({
      requestToken: searchParams.get('request_token'),
      apiKey: this.apiKey,
    });

    this.sessionId = session.session_id;
  }


  static check () {
    return !!this.apiKey && !!this.sessionId;
  }
}