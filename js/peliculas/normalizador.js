/**
 * Normalizador de datos - Capa de transformación ETL.
 * Transforma datos de la API de TMDB (inglés) a formato español.
 */

import {
  URL_BASE_IMG_FONDO_TMDB,
  URL_BASE_IMG_POSTER_TMDB,
  PLACEHOLDER_POSTER,
} from '/js/constantes.js';

/**
 * Normaliza una película de la API a formato español.
 * @param {Object} movie - Película cruda de la API
 * @param {Array} categorias - Array de categorías/géneros
 * @return {Object} - Película normalizada con nombres en español
 */
export function normalizarPelicula(movie, categorias = []) {
  // Obtener categorías de la película
  const categoriasDeMovie = categorias.filter(
    (genero) => movie.genre_ids.includes(genero.id),
  );
  const primeraCategoria = categoriasDeMovie.at(0)?.name ?? 'Desconocido';

  // Calcular año de lanzamiento
  const anio = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  // Determinar URL de imagen (preferir poster, sino backdrop, sino placeholder)
  let imagenUrl;
  if (movie.poster_path) {
    imagenUrl = `${URL_BASE_IMG_POSTER_TMDB}${movie.poster_path}`;
  } else if (movie.backdrop_path) {
    imagenUrl = `${URL_BASE_IMG_FONDO_TMDB}${movie.backdrop_path}`;
  } else {
    imagenUrl = PLACEHOLDER_POSTER;
  }

  return {
    id: movie.id,
    titulo: movie.title,
    poster: imagenUrl,
    rating: movie.vote_average,
    anio: anio,
    categoria: primeraCategoria,
    categorias: categoriasDeMovie.map(c => c.name),
  };
}

/**
 * Normaliza un array de películas.
 * @param {Array} movies - Array de películas crudas de la API
 * @param {Array} categorias - Array de categorías/géneros
 * @return {Array} - Array de películas normalizadas
 */
export function normalizarPeliculas(movies, categorias = []) {
  return movies.map(movie => normalizarPelicula(movie, categorias));
}

/**
 * Normaliza las categorías/géneros de la API.
 * @param {Object} apiResponse - Respuesta de la API con géneros
 * @return {Array} - Array de géneros (ya vienen con name en español)
 */
export function normalizarCategorias(apiResponse) {
  // La API ya devuelve los géneros con nombre en español
  // cuando usamos language=es en la petición
  return apiResponse.genres || [];
}
