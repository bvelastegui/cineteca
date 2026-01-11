import { User } from './User.js';

/**
 * Convierte un objeto de usuario de la API a una instancia de la clase User.
 *
 * @param {import("/js/features/auth/authApi.js").AccountDetails} tmdbAccountDetails - Objeto de usuario recibido de la API.
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
    username: tmdbAccountDetails.username,
  });
};