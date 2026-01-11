import {
  authentication,
  deleteSession,
  fetchAccountDetails,
  generateRequestToken,
  generateSession,
} from '/js/features/auth/authApi.js';
import { redirect } from '/js/lib/dom.js';
import {
  LOGIN_URL,
  TMDB_AUTHORIZATION_BASE_URL,
} from '/js/shared/constants.js';
import { userAdapter } from '/js/features/auth/userAdapter.js';
import { authStorage } from '/js/features/auth/authStorage.js';

export default class Auth {
  static get apiKey() {
    return authStorage.getApiKey();
  }

  static set apiKey(apiKey) {
    authStorage.setApiKey(apiKey);
  }

  static get sessionId() {
    return authStorage.getSessionId();
  }

  static set sessionId(sessionId) {
    authStorage.setSessionId(sessionId);
  }

  /**
   * @type {import('./User.js').User|null}
   */
  static get user() {
    return authStorage.getUser();
  }

  /**
   * @param {import('/js/features/auth/authApi.js').AccountDetails} data
   */
  static set user(data) {
    authStorage.setUser(userAdapter(data));
  }

  /**
   * Valida la clave de API y la almacena si es correcta.
   *
   * @param {string} apiKey
   */
  static async login(apiKey) {
    await authentication({ apiKey });

    this.apiKey = apiKey;
  }

  /**
   * Solicita autorización del usuario para la aplicación mediante
   * la generación de un token de solicitud y redirige al usuario
   * a la página de autorización correspondiente.
   */
  static async requestAuthorization() {
    const request = await generateRequestToken({ apiKey: this.apiKey });

    redirect(`${TMDB_AUTHORIZATION_BASE_URL}/${request.request_token}`, {
      redirect_to: window.location.origin + LOGIN_URL,
    });
  }

  /**
   * Crea una nueva sesión utilizando los parámetros de la URL.
   */
  static async createSession() {
    const searchParams = new URLSearchParams(window.location.search);

    if (!searchParams.has('request_token') && !searchParams.has('approved')) {
      return;
    }

    if (searchParams.get('approved') !== 'true') {
      throw new Error('No se proporciono la autorización.');
    }

    const session = await generateSession({
      requestToken: searchParams.get('request_token'), apiKey: this.apiKey,
    });

    this.sessionId = session.session_id;
  }

  static async loadUserData() {
    this.user = await fetchAccountDetails({
      apiKey: this.apiKey,
      sessionId: this.sessionId,
    });
  }


  static check() {
    return !!this.apiKey && !!this.sessionId && !!this.user;
  }

  static async logout() {
    await deleteSession({ sessionId: this.sessionId, apiKey: this.apiKey });
    authStorage.clear();
  }
}
