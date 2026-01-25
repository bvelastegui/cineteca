/**
 * Utilidades para manejar cache en localStorage.
 * Funciones puras para almacenar y recuperar datos con TTL (Time To Live).
 */

const TTL_MINUTES = 60; // Tiempo de vida: 1 hora

/**
 * Obtiene un dato del cache.
 * @param {string} clave - Clave del cache
 * @param {string} [prefijo='tmdb_cache_'] - Prefijo para la clave
 * @return {any|null} - Dato almacenado o null si no existe o expiró
 */
export function obtenerDatoCache(clave, prefijo = 'tmdb_cache_') {
  const claveCache = prefijo + clave;
  const itemCacheado = localStorage.getItem(claveCache);
  if (!itemCacheado) return null;

  try {
    const { datos, expiracion } = JSON.parse(itemCacheado);

    // Verificamos si ya caducó
    if (Date.now() > expiracion) {
      localStorage.removeItem(claveCache); // Borramos basura vieja
      return null;
    }

    return datos;
  } catch {
    return null;
  }
}

/**
 * Guarda un dato en el cache con TTL.
 * @param {string} clave - Clave del cache
 * @param {any} datos - Dato a almacenar
 * @param {string} [prefijo='tmdb_cache_'] - Prefijo para la clave
 * @param {number} [ttl=TTL_MINUTES] - Tiempo de vida en minutos
 */
export function guardarDatoCache(
  clave,
  datos,
  prefijo = 'tmdb_cache_',
  ttl = TTL_MINUTES,
) {
  const claveCache = prefijo + clave;
  const item = {
    datos: datos,
    expiracion: Date.now() + (ttl * 60 * 1000), // Hora actual + TTL en ms
  };

  try {
    localStorage.setItem(claveCache, JSON.stringify(item));
  } catch (e) {
    // Si el LocalStorage está lleno (QuotaExceededError), limpiamos todo
    if (e.name === 'QuotaExceededError') {
      console.warn('Cache lleno. Limpiando...');
      localStorage.clear();
    }
  }
}

/**
 * Elimina un dato del cache.
 * @param {string} clave - Clave del cache
 * @param {string} [prefijo='tmdb_cache_'] - Prefijo para la clave
 */
export function eliminarDatoCache(clave, prefijo = 'tmdb_cache_') {
  const claveCache = prefijo + clave;
  localStorage.removeItem(claveCache);
}

/**
 * Limpia todo el cache con un prefijo específico.
 * @param {string} [prefijo='tmdb_cache_'] - Prefijo del cache a limpiar
 */
export function limpiarCache(prefijo = 'tmdb_cache_') {
  const claves = Object.keys(localStorage);
  claves.forEach(clave => {
    if (clave.startsWith(prefijo)) {
      localStorage.removeItem(clave);
    }
  });
}
