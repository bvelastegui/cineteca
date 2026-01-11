import { CacheService } from '/js/features/cache/cacheService.js';
import { User } from '/js/features/auth/User.js';

/**
 * Repository para manejar el almacenamiento de datos de autenticación.
 * Abstrae el acceso a localStorage, facilitando testing y cambios futuros.
 */
const AUTH_CACHE_PREFIX = 'auth_';

export class AuthStorage {
  constructor() {
    this.cache = new CacheService(AUTH_CACHE_PREFIX);
  }

  /**
   * Obtiene la API Key almacenada.
   * @returns {string|null}
   */
  getApiKey () {
    return this.cache.get('api_key');
  }

  /**
   * Guarda la API Key.
   * @param {string} apiKey
   */
  setApiKey (apiKey) {
    this.cache.set(`api_key`, apiKey);
  }

  /**
   * Obtiene el Session ID almacenado.
   * @returns {string|null}
   */
  getSessionId () {
    return this.cache.get('session_id');
  }

  /**
   * Guarda el Session ID.
   * @param {string} sessionId
   */
  setSessionId (sessionId) {
    this.cache.set('session_id', sessionId);
  }

  /**
   * Obtiene los datos del usuario almacenados.
   * @returns {User|null} Datos crudos del usuario o null si no existen.
   */
  getUser () {
    const data = this.cache.get('user');
    return data ? new User(JSON.parse(data)) : null;
  }

  /**
   * Guarda los datos del usuario.
   * @param {Object} userData - Datos del usuario (sin transformar).
   */
  setUser (userData) {
    this.cache.set('user', JSON.stringify(userData));
  }

  /**
   * Limpia todos los datos de autenticación del almacenamiento.
   */
  clear () {
    this.cache.remove('key');
    this.cache.remove('session_id');
    this.cache.remove('user');
  }
}

// Exportamos una instancia única (Singleton)
export const authStorage = new AuthStorage();
