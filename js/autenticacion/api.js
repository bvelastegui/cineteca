/**
 * API de autenticación - Capa de consumo de datos de TMDB Auth.
 * Funciones para login, sesiones y datos de usuario.
 */

import {
  URL_AUTENTICACION,
  URL_ELIMINAR_SESION,
  URL_TOKEN_SOLICITUD,
  URL_SESION,
  URL_DETALLES_USUARIO,
} from '/js/constantes.js';
import { apiDelete, apiGet, apiPost } from '/js/core/http.js';
import { guardarDatoCache, obtenerDatoCache } from '/js/core/cache.js';

const PREFIJO_CACHE = 'user_';

/**
 * Valida una API KEY contra TMDB.
 * @param {string} apiKey - Clave de API a validar
 * @throws {Error} Si la API KEY es inválida
 */
export async function autenticar(apiKey) {
  await apiGet(URL_AUTENTICACION, apiKey, 'API KEY inválida');
}

/**
 * Genera un token de solicitud para autenticación.
 * @param {string} apiKey - Clave de API
 * @return {Promise<{request_token: string}>} - Token de solicitud
 * @throws {Error} Si falla la autenticación
 */
export async function generarTokenSolicitud(apiKey) {
  const datos = await apiGet(
    URL_TOKEN_SOLICITUD,
    apiKey,
    'Autenticación fallida',
  );

  if (!('request_token' in datos)) {
    throw new Error('Autenticación fallida');
  }

  return datos;
}

/**
 * Genera una sesión autenticada usando un token de solicitud.
 * @param {string} tokenSolicitud - Token de solicitud autorizado
 * @param {string} apiKey - Clave de API
 * @return {Promise<{session_id: string}>} - ID de sesión
 * @throws {Error} Si falla la autenticación
 */
export async function generarSesion(tokenSolicitud, apiKey) {
  const datos = await apiPost(
    URL_SESION,
    apiKey,
    { request_token: tokenSolicitud },
    'Autenticación fallida',
  );

  if (!('session_id' in datos)) {
    throw new Error('Autenticación fallida');
  }

  return datos;
}

/**
 * Obtiene los detalles de la cuenta del usuario.
 * @param {string} apiKey - Clave de API
 * @param {string} sessionId - ID de sesión
 * @return {Promise<Object>} - Detalles crudos de la cuenta
 * @throws {Error} Si falla la petición
 */
export async function obtenerDetallesCuenta(apiKey, sessionId) {
  const claveCache = `details_${sessionId}`;
  let datosUsuario = obtenerDatoCache(claveCache, PREFIJO_CACHE);

  if (!datosUsuario) {
    datosUsuario = await apiGet(
      `${URL_DETALLES_USUARIO}?session_id=${sessionId}`,
      apiKey,
      'Error al obtener los detalles del usuario.',
    );
    guardarDatoCache(claveCache, datosUsuario, PREFIJO_CACHE);
  }

  return datosUsuario;
}

/**
 * Elimina una sesión activa.
 * @param {string} apiKey - Clave de API
 * @param {string} sessionId - ID de sesión a eliminar
 */
export async function eliminarSesion(apiKey, sessionId) {
  try {
    await apiDelete(
      URL_ELIMINAR_SESION,
      apiKey,
      { session_id: sessionId },
    );
  } catch {
    // No se realiza nada en caso de error
  }
}
