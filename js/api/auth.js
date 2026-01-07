import {
  AUTHENTICATION_URL,
  DELETE_SESSION_URL,
  REQUEST_TOKEN_URL,
  SESSION_URL,
  USER_DETAILS_URL,
} from '/js/config/constants.js';

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

function getApiHeaders (apiKey) {
  return new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Accept': 'application/json',
  });
}

  const response = await fetch(AUTHENTICATION_URL, { headers });

  if (!response.ok) {
    throw new Error('API KEY invalida');
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error('API KEY invalida');
  }
}

export async function generateRequestToken ({ apiKey }) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Accept': 'application/json',
  });
  const response = await fetch(REQUEST_TOKEN_URL, { headers });

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error('Authentication failed');
  }

  if (!('request_token' in data)) {
    throw new Error('Authentication failed');
  }

  return data;
}

export async function generateSession ({ requestToken, apiKey }) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Accept': 'application/json',
  });

  const response = await fetch(SESSION_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({ request_token: requestToken }),
  });

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error('Authentication failed');
  }

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
export async function fetchAccountDetails ({ apiKey, sessionId }) {
  const response = await fetch(
    `${USER_DETAILS_URL}?session_id=${sessionId}`,
    {
      headers: getApiHeaders(apiKey),
    },
  );

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  return await response.json();
}

export async function deleteSession ({ apiKey, sessionId }) {
  try {
    await fetch(
      DELETE_SESSION_URL,
      {
        headers: getApiHeaders(apiKey),
        method: 'DELETE',
        body: JSON.stringify({ session_id: sessionId }),
      },
    );
  } catch {
    // no se realiza nada en caso de error.
  }
}