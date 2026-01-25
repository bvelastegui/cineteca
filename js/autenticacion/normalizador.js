/**
 * Normalizador de autenticación - Transformación de datos de usuario.
 * Convierte datos de la API de TMDB a formato español/normalizado.
 */

/**
 * Normaliza los detalles de una cuenta de TMDB a formato simple.
 * @param {Object} tmdbAccountDetails - Detalles crudos de la cuenta desde API
 * @param {Object} tmdbAccountDetails.avatar - Avatar del usuario
 * @param {Object} tmdbAccountDetails.avatar.tmdb - Avatar de TMDB
 * @param {string|null} tmdbAccountDetails.avatar.tmdb.avatar_path - Ruta del avatar
 * @param {Object} tmdbAccountDetails.avatar.gravatar - Gravatar del usuario
 * @param {string} tmdbAccountDetails.avatar.gravatar.hash - Hash de gravatar
 * @param {number} tmdbAccountDetails.id - ID del usuario
 * @param {string} tmdbAccountDetails.name - Nombre completo
 * @param {string} tmdbAccountDetails.username - Nombre de usuario
 * @return {Object} - Usuario normalizado con nombres en español
 */
export function normalizarUsuario(tmdbAccountDetails) {
  // Determinar URL del avatar (preferir TMDB, sino Gravatar)
  const avatarUrl = tmdbAccountDetails.avatar.tmdb.avatar_path !== null
    ? `https://image.tmdb.org/t/p/original${tmdbAccountDetails.avatar.tmdb.avatar_path}`
    : `https://www.gravatar.com/avatar/${tmdbAccountDetails.avatar.gravatar.hash}?d=mp&s=90`;

  return {
    id: tmdbAccountDetails.id,
    nombre: tmdbAccountDetails.name,
    nombreUsuario: tmdbAccountDetails.username,
    avatarUrl: avatarUrl,
  };
}
