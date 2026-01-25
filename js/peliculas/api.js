/**
 * API de películas - Capa de consumo de datos desde TMDB.
 * Funciones para obtener películas, búsquedas y categorías.
 */

import { apiGet } from '/js/core/http.js';
import { guardarDatoCache, obtenerDatoCache } from '/js/core/cache.js';
import { URL_BUSCAR_PELICULAS, URL_GENEROS_PELICULAS, URL_PELICULAS_POPULARES } from '/js/constantes.js';

const PREFIJO_CACHE = 'movies_';

/**
 * Obtiene las películas populares desde TMDB.
 * @param {string} apiKey - API Key de TMDB
 * @param {number} pagina - Número de página (default: 1)
 * @return {Promise<Object>} - Respuesta cruda de la API
 */
export async function obtenerPeliculas(apiKey, pagina = 1) {
  const cacheKey = `popular_${pagina}`;
  let datos = obtenerDatoCache(cacheKey, PREFIJO_CACHE);

  if (datos) {
    return datos;
  }

  datos = await apiGet(
    `${URL_PELICULAS_POPULARES}?language=es-EC&region=EC&page=${pagina}`,
    apiKey,
    'Error al obtener películas',
  );

  guardarDatoCache(cacheKey, datos, PREFIJO_CACHE);

  return datos;
}

/**
 * Busca películas por texto de consulta.
 * @param {string} apiKey - API Key de TMDB
 * @param {string} consulta - Texto de búsqueda
 * @param {number} pagina - Número de página (default: 1)
 * @return {Promise<Object>} - Respuesta cruda de la API
 */
export async function obtenerPeliculasPorBusqueda(
  apiKey,
  consulta,
  pagina = 1,
) {
  // No usar cache para búsquedas paginadas
  return await apiGet(
    `${URL_BUSCAR_PELICULAS}?language=es-EC&query=${consulta}&region=EC&page=${pagina}`,
    apiKey,
    'Error al buscar películas',
  );
}

/**
 * Obtiene las categorías (géneros) de películas desde TMDB.
 * @param {string} apiKey - API Key de TMDB
 * @return {Promise<Object>} - Respuesta cruda de la API con géneros
 */
export async function obtenerCategorias(apiKey) {
  let datos = obtenerDatoCache('categories', PREFIJO_CACHE);

  if (!datos) {
    datos = await apiGet(
      `${URL_GENEROS_PELICULAS}?language=es`,
      apiKey,
      'Error al obtener categorías',
    );

    guardarDatoCache('categories', datos, PREFIJO_CACHE);
  }

  return datos;
}
