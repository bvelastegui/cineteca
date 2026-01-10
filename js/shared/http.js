/**
 * Helpers para manejar peticiones HTTP a la API de TMDB.
 */

/**
 * Crea headers para peticiones a la API.
 * @param {string} apiKey - Bearer token de TMDB
 * @returns {Headers}
 */
export function getApiHeaders(apiKey) {
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
 * @param {Response} response - Respuesta de fetch
 * @param {string} [errorMessage='API request failed'] - Mensaje de error personalizado
 * @returns {Promise<Object>} Datos de la respuesta
 * @throws {Error} Si la petición falla
 */
export async function handleApiResponse(
  response,
  errorMessage = 'API request failed',
) {
  if (!response.ok) {
    throw new Error(errorMessage);
  }

  const data = await response.json();

  if (data.success === false) {
    throw new Error(errorMessage);
  }

  return data;
}

/**
 * Wrapper para hacer peticiones GET a la API.
 *
 * @param {string} url - URL completa del endpoint
 * @param {string} apiKey - Bearer token
 * @param {string} [errorMessage] - Mensaje de error personalizado
 * @returns {Promise<Object>}
 */
export async function apiGet(url, apiKey, errorMessage) {
  const response = await fetch(url, {
    headers: getApiHeaders(apiKey),
  });

  return handleApiResponse(response, errorMessage);
}

/**
 * Wrapper para hacer peticiones POST a la API.
 *
 * @param {string} url - URL completa del endpoint
 * @param {string} apiKey - Bearer token
 * @param {Object} [body] - Cuerpo de la petición
 * @param {string} [errorMessage] - Mensaje de error personalizado
 * @returns {Promise<Object>}
 */
export async function apiPost(url, apiKey, body = null, errorMessage) {
  const options = {
    method: 'POST', headers: getApiHeaders(apiKey),
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  return handleApiResponse(response, errorMessage);
}

/**
 * Wrapper para hacer peticiones DELETE a la API.
 *
 * @param {string} url - URL completa del endpoint
 * @param {string} apiKey - Bearer token
 * @param {Object} [body] - Cuerpo de la petición
 * @param {string} [errorMessage] - Mensaje de error personalizado
 * @returns {Promise<Object>}
 */
export async function apiDelete(url, apiKey, body = null, errorMessage) {
  const options = {
    method: 'DELETE', headers: getApiHeaders(apiKey),
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  return handleApiResponse(response, errorMessage);
}
