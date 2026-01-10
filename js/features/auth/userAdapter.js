import { User } from './User.js';

/**
 * Convierte un objeto de usuario de la API a una instancia de la clase User.
 *
 * @param {Object} tmdbAccountDetails - Objeto de usuario recibido de la API.
 * @param {string} tmdbAccountDetails.id - Identificador único del usuario.
 * @param {string} tmdbAccountDetails.name - Nombre del usuario.
 * @param {Object} tmdbAccountDetails.avatar - Objeto que contiene información del avatar del usuario.
 * @param {Object} tmdbAccountDetails.avatar.tmdb - Información del avatar asociado a TMDb.
 * @param {string|null} tmdbAccountDetails.avatar.tmdb.avatar_path - Ruta del avatar en TMDb, puede ser null si no existe.
 * @param {Object} tmdbAccountDetails.avatar.gravatar - Información del avatar asociado a Gravatar.
 * @param {string} tmdbAccountDetails.avatar.gravatar.hash - Hash para generar el avatar en Gravatar.
 * @returns {User} Una instancia de la clase User con los datos del usuario transformados.
 */
export const userAdapter = (tmdbAccountDetails) => {
  const avatarUrl = tmdbAccountDetails.avatar.tmdb.avatar_path !== null
    ? `https://image.tmdb.org/t/p/original/${tmdbAccountDetails.avatar.tmdb.avatar_path}`
    : `https://www.gravatar.com/avatar/${tmdbAccountDetails.avatar.gravatar.hash}?d=mp&s=90`;

  return new User({
    id: tmdbAccountDetails.id,
    name: tmdbAccountDetails.name,
    avatarUrl,
  });
};