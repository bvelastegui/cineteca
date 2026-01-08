import { User } from '/js/models/User.js';

export const userAdapter = {
  /**
   * Convierte un objeto de usuario de la API a una instancia de la clase User.
   *
   * @param {Object} user - Objeto de usuario recibido de la API.
   * @param {string} user.id - Identificador único del usuario.
   * @param {string} user.name - Nombre del usuario.
   * @param {Object} user.avatar - Objeto que contiene información del avatar del usuario.
   * @param {Object} user.avatar.tmdb - Información del avatar asociado a TMDb.
   * @param {string|null} user.avatar.tmdb.avatar_path - Ruta del avatar en TMDb, puede ser null si no existe.
   * @param {Object} user.avatar.gravatar - Información del avatar asociado a Gravatar.
   * @param {string} user.avatar.gravatar.hash - Hash para generar el avatar en Gravatar.
   * @returns {User} Una instancia de la clase User con los datos del usuario transformados.
   */
  fromApi: (user) => {
    const avatarUrl = user.avatar.tmdb.avatar_path !== null
      ? `https://image.tmdb.org/t/p/original${user.avatar.tmdb.avatar_path}`
      : `https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}?d=mp&s=90`;

    return new User({
      id: user.id,
      name: user.name,
      avatarUrl,
    });
  },
  /**
   * Convierte un objeto JSON a una instancia de la clase User.
   *
   * @param {Object} user - El objeto JSON que contiene los datos del usuario.
   * @param {string} user.id - El identificador único del usuario.
   * @param {string} user.name - El nombre del usuario.
   * @param {string} user.avatarUrl - La URL del avatar del usuario.
   * @returns {User} Una nueva instancia de la clase User creada a partir de los datos proporcionados.
   */
  fromJson: (user) => {
    return new User(
      {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    );
  },
};