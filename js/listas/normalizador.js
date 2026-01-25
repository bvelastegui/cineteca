/**
 * Normalizador de listas - Capa de transformación ETL.
 * Transforma datos de la API de TMDB (inglés) a formato español.
 */

/**
 * Normaliza una lista de la API a formato español.
 * @param {Object} lista - Lista cruda de la API
 * @return {Object} - Lista normalizada con nombres en español
 */
export function normalizarLista(lista) {
  return {
    id: lista.id,
    nombre: lista.name,
    descripcion: lista.description || '',
    cantidadFavoritos: lista.favorite_count || 0,
    cantidadItems: lista.item_count || 0,
  };
}

/**
 * Normaliza un array de listas.
 * @param {Array} listas - Array de listas crudas de la API
 * @return {Array} - Array de listas normalizadas
 */
export function normalizarListas(listas) {
  return listas.map(lista => normalizarLista(lista));
}
