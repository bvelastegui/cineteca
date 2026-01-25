/**
 * API de Listas - Capa de consumo de datos desde TMDB.
 * Funciones para CRUD de listas de películas.
 */

import { apiGet, apiPost, obtenerHeadersApi } from '/js/core/http.js';
import { URL_LISTA, URL_LISTA_V4, URL_LISTAS_USUARIO } from '/js/constantes.js';

/**
 * Obtiene todas las listas de un usuario.
 * @param {string} apiKey - API Key de TMDB
 * @param {number} idUsuario - ID del usuario
 * @return {Promise<Object>} - Respuesta cruda de la API con listas
 */
export async function obtenerListas(apiKey, idUsuario) {
  return await apiGet(
    `${URL_LISTAS_USUARIO}/${idUsuario}/lists`,
    apiKey,
    'No se puede obtener las listas del usuario',
  );
}

/**
 * Obtiene los detalles de una lista específica con sus películas.
 * @param {string} apiKey - API Key de TMDB
 * @param {number} idLista - ID de la lista
 * @return {Promise<Object>} - Respuesta cruda de la API con detalles de la lista
 */
export async function obtenerDetallesLista(apiKey, idLista) {
  return await apiGet(
    `${URL_LISTA}/${idLista}`,
    apiKey,
    'No se pueden obtener los detalles de la lista',
  );
}

/**
 * Crea una nueva lista.
 * @param {string} apiKey - API Key de TMDB
 * @param {string} sessionId - Session ID
 * @param {string} nombre - Nombre de la lista
 * @param {string} descripcion - Descripción de la lista
 * @param {string} idioma - Idioma de la lista
 * @return {Promise<Object>} - Respuesta cruda de la API
 */
export async function crearLista(
  apiKey,
  sessionId,
  nombre,
  descripcion,
  idioma,
) {
  return await apiPost(
    `${URL_LISTA}?session_id=${sessionId}`,
    apiKey,
    { name: nombre, description: descripcion, language: idioma },
    'No se pudo crear la lista',
  );
}

/**
 * Actualiza una lista existente.
 * @param {string} apiKey - API Key de TMDB
 * @param {string} sessionId - Session ID
 * @param {number} id - ID de la lista
 * @param {string} nombre - Nuevo nombre de la lista
 * @param {string} descripcion - Nueva descripción de la lista
 * @return {Promise<Response>} - Respuesta del fetch
 */
export async function actualizarLista(
  apiKey,
  sessionId,
  id,
  nombre,
  descripcion,
) {
  const respuesta = await fetch(
    `${URL_LISTA_V4}/${id}?session_id=${sessionId}`,
    {
      method: 'PUT',
      headers: obtenerHeadersApi(apiKey),
      body: JSON.stringify({ name: nombre, description: descripcion }),
    },
  );
  return respuesta;
}

/**
 * Elimina una lista.
 * @param {string} apiKey - API Key de TMDB
 * @param {string} sessionId - Session ID
 * @param {number} id - ID de la lista a eliminar
 * @return {Promise<Response>} - Respuesta del fetch
 */
export async function eliminarLista(apiKey, sessionId, id) {
  const respuesta = await fetch(
    `${URL_LISTA_V4}/${id}?session_id=${sessionId}`,
    {
      method: 'DELETE',
      headers: obtenerHeadersApi(apiKey),
    },
  );
  return respuesta;
}

/**
 * Agrega una película a una lista.
 * @param {string} apiKey - API Key de TMDB
 * @param {string} sessionId - Session ID
 * @param {number} idLista - ID de la lista
 * @param {number} idPelicula - ID de la película
 * @return {Promise<Response>} - Respuesta del fetch
 */
export async function agregarPeliculaALista(apiKey, sessionId, idLista, idPelicula) {
  const respuesta = await fetch(
    `${URL_LISTA_V4}/${idLista}/items?session_id=${sessionId}`,
    {
      method: 'POST',
      headers: obtenerHeadersApi(apiKey),
      body: JSON.stringify({
        items: [
          {
            media_type: 'movie',
            media_id: idPelicula,
          },
        ],
      }),
    },
  );
  return respuesta;
}

/**
 * Elimina una película de una lista.
 * @param {string} apiKey - API Key de TMDB
 * @param {string} sessionId - Session ID
 * @param {number} idLista - ID de la lista
 * @param {number} idPelicula - ID de la película
 * @return {Promise<Response>} - Respuesta del fetch
 */
export async function eliminarPeliculaDeLista(apiKey, sessionId, idLista, idPelicula) {
  const respuesta = await fetch(
    `${URL_LISTA_V4}/${idLista}/items?session_id=${sessionId}`,
    {
      method: 'DELETE',
      headers: obtenerHeadersApi(apiKey),
      body: JSON.stringify({
        items: [
          {
            media_type: 'movie',
            media_id: idPelicula,
          },
        ],
      }),
    },
  );
  return respuesta;
}
