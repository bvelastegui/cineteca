/* URLs de la aplicación */
export const URL_LOGIN = '/login.html';
export const URL_INICIO = '/index.html';

/* URLs base de TMDB */
export const URL_BASE_AUTORIZACION_TMDB = 'https://www.themoviedb.org/authenticate';
export const URL_BASE_IMG_FONDO_TMDB = 'https://image.tmdb.org/t/p/original';
export const URL_BASE_IMG_POSTER_TMDB = 'https://image.tmdb.org/t/p/w342';

/* Placeholder para imágenes faltantes */
export const PLACEHOLDER_POSTER = 'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="342" height="513" viewBox="0 0 342 513">
  <rect width="342" height="513" fill="#212529"/>
  <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#6c757d">Sin imagen</text>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#6c757d">disponible</text>
</svg>
`);

/* API URLs - Base */
export const URL_API = 'https://api.themoviedb.org/3';
export const URL_API_V4 = 'https://api.themoviedb.org/4';

/* API URLs - Autenticación */
export const URL_AUTENTICACION = `${URL_API}/authentication`;
export const URL_TOKEN_SOLICITUD = `${URL_API}/authentication/token/new`;
export const URL_SESION = `${URL_API}/authentication/session/new`;
export const URL_DETALLES_USUARIO = `${URL_API}/account/22561238`;
export const URL_ELIMINAR_SESION = `${URL_API}/authentication/session`;

/* API URLs - Películas */
export const URL_PELICULAS_POPULARES = `${URL_API}/movie/popular`;
export const URL_BUSCAR_PELICULAS = `${URL_API}/search/movie`;
export const URL_GENEROS_PELICULAS = `${URL_API}/genre/movie/list`;

/* API URLs - Listas */
export const URL_LISTAS_USUARIO = `${URL_API}/account`;
export const URL_LISTA = `${URL_API}/list`;
export const URL_LISTA_V4 = `${URL_API_V4}/list`;
