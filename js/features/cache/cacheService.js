const TTL_MINUTES = 60; // Tiempo de vida: 1 hora

export class CacheService {
  constructor(prefix = 'tmdb_cache_') {
    this.prefix = prefix;
  }

  /**
   * @param {string} key
   * @return {object|null}
   */
  get(key) {
    const cacheKey = this.prefix + key;
    const cachedItem = localStorage.getItem(cacheKey);
    if (!cachedItem) return null;

    try {
      const { data, expiry } = JSON.parse(cachedItem);

      // Verificamos si ya caducó
      if (Date.now() > expiry) {
        localStorage.removeItem(cacheKey); // Borramos basura vieja
        return null;
      }

      return data;
    } catch {
      return null;
    }
  }

  /**
   * @param {string} key
   * @param {any} data
   * @param {number} ttl - Tiempo de vida (1 min por defecto)
   */
  set(key, data, ttl = TTL_MINUTES) {
    const cacheKey = this.prefix + key;
    const item = {
      data: data,
      expiry: Date.now() + (ttl * 60 * 1000), // Hora actual + 60 min
    };

    try {
      localStorage.setItem(cacheKey, JSON.stringify(item));
    } catch (e) {
      // Si el LocalStorage está lleno (QuotaExceededError), limpiamos todo
      if (e.name === 'QuotaExceededError') {
        console.warn('Cache lleno. Limpiando...');
        localStorage.clear();
      }
    }
  }

  /**
   * @param {string} key
   */
  remove(key) {
    const cacheKey = this.prefix + key;
    localStorage.removeItem(cacheKey);
  }
}
