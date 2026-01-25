/**
 * Helpers para manejar peticiones HTTP a la API de TMDB.
 */

/**
 * Crea headers para peticiones a la API.
 * @param {string} apiKey - Bearer token de TMDB
 * @returns {Headers}
 */
export function obtenerHeadersApi(apiKey) {
  return new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Accept': 'application/json',
  });
}

/**
 * Maneja la respuesta de una petición a la API.
 * Valida el status HTTP y el campo 'success' de la respuesta.
 *
 * @param {Response} respuesta - Respuesta de fetch
 * @param {string} [mensajeError='API request failed'] - Mensaje de error personalizado
 * @returns {Promise<Object>} Datos de la respuesta
 * @throws {Error} Si la petición falla
 */
export async function manejarRespuestaApi(
  respuesta,
  mensajeError = 'La petición a la API falló',
) {
  if (!respuesta.ok) {
    throw new Error(mensajeError);
  }

  const datos = await respuesta.json();

  if (datos.success === false) {
    throw new Error(mensajeError);
  }

  return datos;
}

/**
 * Wrapper para hacer peticiones GET a la API.
 *
 * @param {string} url - URL completa del endpoint
 * @param {string} apiKey - Bearer token
 * @param {string} [mensajeError] - Mensaje de error personalizado
 * @returns {Promise<Object>}
 */
export async function apiGet(url, apiKey, mensajeError) {
  const respuesta = await fetch(url, {
    headers: obtenerHeadersApi(apiKey),
  });

  return manejarRespuestaApi(respuesta, mensajeError);
}

/**
 * Wrapper para hacer peticiones POST a la API.
 *
 * @param {string} url - URL completa del endpoint
 * @param {string} apiKey - Bearer token
 * @param {Object} [cuerpo] - Cuerpo de la petición
 * @param {string} [mensajeError] - Mensaje de error personalizado
 * @returns {Promise<Object>}
 */
export async function apiPost(url, apiKey, cuerpo = null, mensajeError) {
  const opciones = {
    method: 'POST', headers: obtenerHeadersApi(apiKey),
  };

  if (cuerpo) {
    opciones.body = JSON.stringify(cuerpo);
  }

  const respuesta = await fetch(url, opciones);
  return manejarRespuestaApi(respuesta, mensajeError);
}

/**
 * Wrapper para hacer peticiones DELETE a la API.
 *
 * @param {string} url - URL completa del endpoint
 * @param {string} apiKey - Bearer token
 * @param {Object} [cuerpo] - Cuerpo de la petición
 * @param {string} [mensajeError] - Mensaje de error personalizado
 * @returns {Promise<Object>}
 */
export async function apiDelete(url, apiKey, cuerpo = null, mensajeError) {
  const opciones = {
    method: 'DELETE', headers: obtenerHeadersApi(apiKey),
  };

  if (cuerpo) {
    opciones.body = JSON.stringify(cuerpo);
  }

  const respuesta = await fetch(url, opciones);
  return manejarRespuestaApi(respuesta, mensajeError);
}
