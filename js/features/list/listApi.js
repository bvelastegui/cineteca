import { apiGet, apiPost, getApiHeaders } from '/js/shared/http.js';
import { API_URL } from '/js/shared/constants.js';

export async function fetchAll({ apiKey, userId }) {
  return await apiGet(
    `${API_URL}/account/${userId}/lists`,
    apiKey,
    'No se puede obtener las listas del usuario',
  );
}

export async function crearlista(
  apiKey,
  sessionId,
  name,
  description,
  language,
) {
  return await apiPost(
    'https://api.themoviedb.org/3/list?session_id=' + sessionId,
    apiKey,
    { name, description, language },
    'No se pudo crear la lista',
  );
}

export async function actualizarLista(
  apiKey,
  sessionId,
  id,
  name,
  description,
) {
  const response = await fetch('https://api.themoviedb.org/4/list/' + id +
    '?session_id=' + sessionId, {
    method: 'PUT',
    headers: getApiHeaders(apiKey),
    body: JSON.stringify({
      name, description,
    }),
  });
}
export async function eliminarLista(
  apiKey,
  sessionId,
  id
){
  const response = await fetch('https://api.themoviedb.org/4/list/'+id+
    '?session_id=' + sessionId, {
    method: 'DELETE',
    headers: getApiHeaders(apiKey),
  });
}