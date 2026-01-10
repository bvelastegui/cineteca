/**
 * Repository para manejar el almacenamiento de datos de autenticación.
 * Abstrae el acceso a localStorage, facilitando testing y cambios futuros.
 */

const AUTH_CACHE_PREFIX = 'auth';

export class AuthStorage {
  /**
   * Obtiene la API Key almacenada.
   * @returns {string|null}
   */
  getApiKey () {
    return localStorage.getItem(`${AUTH_CACHE_PREFIX}_key`);
  }

  /**
   * Guarda la API Key.
   * @param {string} apiKey
   */
  setApiKey (apiKey) {
    localStorage.setItem(`${AUTH_CACHE_PREFIX}_key`, apiKey);
  }

  /**
   * Obtiene el Session ID almacenado.
   * @returns {string|null}
   */
  getSessionId () {
    return localStorage.getItem(`${AUTH_CACHE_PREFIX}_session_id`);
  }

  /**
   * Guarda el Session ID.
   * @param {string} sessionId
   */
  setSessionId (sessionId) {
    localStorage.setItem(`${AUTH_CACHE_PREFIX}_session_id`, sessionId);
  }

  /**
   * Obtiene los datos del usuario almacenados.
   * @returns {Object|null} Datos crudos del usuario o null si no existen.
   */
  getUser () {
    const userJson = localStorage.getItem(`${AUTH_CACHE_PREFIX}_user`);
    return userJson ? JSON.parse(userJson) : null;
  }

  /**
   * Guarda los datos del usuario.
   * @param {Object} userData - Datos del usuario (sin transformar).
   */
  setUser (userData) {
    localStorage.setItem(`${AUTH_CACHE_PREFIX}_user`, JSON.stringify(userData));
  }

  /**
   * Limpia todos los datos de autenticación del almacenamiento.
   */
  clear () {
    localStorage.removeItem(`${AUTH_CACHE_PREFIX}_key`);
    localStorage.removeItem(`${AUTH_CACHE_PREFIX}_session_id`);
    localStorage.removeItem(`${AUTH_CACHE_PREFIX}_user`);
  }
}

// Exportamos una instancia única (Singleton)
export const authStorage = new AuthStorage();
