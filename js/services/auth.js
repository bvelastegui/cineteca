import {
  authentication,
  deleteSession,
  fetchAccountDetails,
  generateRequestToken,
  generateSession,
} from '/js/api/auth.js';
import { redirect } from '/js/utils/helpers.js';
import {
  LOGIN_URL,
  TMDB_AUTHORIZATION_BASE_URL,
} from '/js/config/constants.js';
import { userAdapter } from '/js/adapters/userAdapter.js';

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

  static get user () {
    const userJson = localStorage.getItem(`${AUTH_CACHE_PREFIX}_user`);

    if (!userJson) {
      return null;
    }

    return userAdapter.fromJson(JSON.parse(userJson));
  }

  static set user (details) {
    localStorage.setItem(
      `${AUTH_CACHE_PREFIX}_user`,
      JSON.stringify(userAdapter.fromApi(details)),
    );
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
      redirect_to: window.location.origin + LOGIN_URL,
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

  static async loadUserData () {
    this.user = await fetchAccountDetails({
      apiKey: this.apiKey,
      sessionId: this.sessionId,
    });
  }


  static check () {
    return !!this.apiKey && !!this.sessionId && !!this.user;
  }

  static async logout () {
    await deleteSession({ sessionId: this.sessionId, apiKey: this.apiKey });

    localStorage.removeItem(`${AUTH_CACHE_PREFIX}_key`);
    localStorage.removeItem(`${AUTH_CACHE_PREFIX}_session_id`);
    localStorage.removeItem(`${AUTH_CACHE_PREFIX}_user`);
  }
}