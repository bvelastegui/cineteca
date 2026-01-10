import {
  AUTHENTICATION_URL,
  DELETE_SESSION_URL,
  REQUEST_TOKEN_URL,
  SESSION_URL,
  USER_DETAILS_URL,
} from '/js/shared/constants.js';
import { apiDelete, apiGet, apiPost } from '/js/shared/http.js';

/**
 * @typedef {Object} Avatar
 * @property {Object} gravatar
 * @property {string} gravatar.hash
 * @property {Object} tmdb
 * @property {string|null} tmdb.avatar_path
 */

/**
 * @typedef {Object} AccountDetails
 * @property {Avatar} avatar - Avatar del usuario.
 * @property {number} id - Id único del usuario.
 * @property {string} iso_639_1 - Idioma principal del usuario.
 * @property {string} iso_3366_1 - Regionalidad del usuario.
 * @property {string} name - Nombre completo del usuario.
 */

/**
 * Método para autenticar utilizando una API KEY.
 * Este método realiza una solicitud a un endpoint definido para validar la autenticación.
 *
 * @param {Object} param - Objeto que contiene los parámetros necesarios.
 * @param {string} param.apiKey - La clave de API utilizada para la autenticación.
 * @return {Promise<void>} Una promesa que se resuelve si la autenticación es exitosa.
 *                          Lanza un error si la autenticación no es válida.
 */
export async function authentication({ apiKey }) {
  await apiGet(AUTHENTICATION_URL, apiKey, 'API KEY invalida');
}

/**
 * Genera un token de solicitud a partir de una clave de API proporcionada.
 *
 * @param {Object} config Objeto de configuración.
 * @param {string} config.apiKey Clave de API utilizada para autenticar la solicitud.
 * @return {Promise<{ request_token: string }>} Una promesa que resuelve a un objeto con la respuesta de la API.
 * @throws {Error} Lanza un error si la autenticación falla o si la respuesta no contiene un token de solicitud.
 */
export async function generateRequestToken({ apiKey }) {
  const data = await apiGet(REQUEST_TOKEN_URL, apiKey, 'Authentication failed');

  if (!('request_token' in data)) {
    throw new Error('Authentication failed');
  }

  return data;
}

/**
 * Genera una sesión autenticada utilizando un token de solicitud y una clave de API.
 *
 * @param {Object} params - Objeto de configuración para generar la sesión.
 * @param {string} params.requestToken - El token de solicitud proporcionado para la autenticación.
 * @param {string} params.apiKey - Clave de API utilizada para autenticar la solicitud.
 * @return {Promise<{ session_id: string }>} Retorna un objeto que contiene los datos de la sesión generada, incluyendo el identificador de sesión (`session_id`).
 * @throws {Error} Si la autenticación falla o si los datos de la sesión no son válidos.
 */
export async function generateSession({ requestToken, apiKey }) {
  const data = await apiPost(
    SESSION_URL,
    apiKey,
    { request_token: requestToken },
    'Authentication failed',
  );

  if (!('session_id' in data)) {
    throw new Error('Authentication failed');
  }

  return data;
}

/**
 * Obtiene los detalles de una cuenta de usuario utilizando un API Key y un ID de sesión.
 *
 * @param {Object} params - Objeto que contiene los parámetros necesarios para la solicitud.
 * @param {string} params.apiKey - Clave de API proporcionada para autenticar la solicitud.
 * @param {string} params.sessionId - ID de sesión único para identificar al usuario.
 * @return {Promise<AccountDetails>} Una promesa que resuelve con un objeto que contiene los detalles de la cuenta de usuario.
 * @throws {Error} Lanza un error si la autenticación falla o si la respuesta no es exitosa.
 */
export async function fetchAccountDetails({ apiKey, sessionId }) {
  return await apiGet(
    `${USER_DETAILS_URL}?session_id=${sessionId}`,
    apiKey,
    'Error al obtener los detalles del usuario.',
  );
}

export async function deleteSession({ apiKey, sessionId }) {
  try {
    await apiDelete(
      DELETE_SESSION_URL,
      apiKey,
      { session_id: sessionId },
    );
  } catch {
    // no se realiza nada en caso de error.
  }
}
