/**
 * Servicio de autenticación - Orquestador de funcionalidades de auth.
 * Funciones para login, logout, creación de sesión y verificación.
 * Incluye funciones de storage para localStorage.
 */

import {
  autenticar,
  eliminarSesion,
  generarSesion,
  generarTokenSolicitud,
  obtenerDetallesCuenta,
} from '/js/autenticacion/api.js';
import { redirigir } from '/js/core/dom.js';
import { URL_LOGIN, URL_BASE_AUTORIZACION_TMDB } from '/js/constantes.js';
import { normalizarUsuario } from '/js/autenticacion/normalizador.js';
import {
  eliminarDatoCache,
  guardarDatoCache,
  obtenerDatoCache,
} from '/js/core/cache.js';

const PREFIJO_AUTH = 'auth_';

// ============================================================================
// FUNCIONES DE STORAGE (localStorage)
// ============================================================================

/**
 * Obtiene la API Key almacenada.
 * @return {string|null} - API Key o null si no existe
 */
export function obtenerApiKey() {
  return obtenerDatoCache('api_key', PREFIJO_AUTH);
}

/**
 * Guarda la API Key en localStorage.
 * @param {string} apiKey - API Key a guardar
 */
function guardarApiKey(apiKey) {
  guardarDatoCache('api_key', apiKey, PREFIJO_AUTH);
}

/**
 * Obtiene el Session ID almacenado.
 * @return {string|null} - Session ID o null si no existe
 */
export function obtenerSessionId() {
  return obtenerDatoCache('session_id', PREFIJO_AUTH);
}

/**
 * Guarda el Session ID en localStorage.
 * @param {string} sessionId - Session ID a guardar
 */
function guardarSessionId(sessionId) {
  guardarDatoCache('session_id', sessionId, PREFIJO_AUTH);
}

/**
 * Obtiene los datos del usuario almacenados.
 * @return {Object|null} - Usuario normalizado o null si no existe
 */
export function obtenerUsuario() {
  const datos = obtenerDatoCache('user', PREFIJO_AUTH);
  return datos ? JSON.parse(datos) : null;
}

/**
 * Guarda los datos del usuario en localStorage.
 * @param {Object} usuario - Usuario normalizado a guardar
 */
function guardarUsuario(usuario) {
  guardarDatoCache('user', JSON.stringify(usuario), PREFIJO_AUTH);
}

/**
 * Limpia todos los datos de autenticación del almacenamiento.
 */
function limpiarAuth() {
  eliminarDatoCache('api_key', PREFIJO_AUTH);
  eliminarDatoCache('session_id', PREFIJO_AUTH);
  eliminarDatoCache('user', PREFIJO_AUTH);
}

// ============================================================================
// FUNCIONES PÚBLICAS DE AUTENTICACIÓN
// ============================================================================

/**
 * Valida la clave de API y la almacena si es correcta.
 * @param {string} apiKey - API Key a validar
 */
export async function login(apiKey) {
  await autenticar(apiKey);
  guardarApiKey(apiKey);
}

/**
 * Solicita autorización del usuario para la aplicación mediante
 * la generación de un token de solicitud y redirige al usuario
 * a la página de autorización correspondiente.
 */
export async function solicitarAutorizacion() {
  const apiKey = obtenerApiKey();
  const solicitud = await generarTokenSolicitud(apiKey);

  redirigir(`${URL_BASE_AUTORIZACION_TMDB}/${solicitud.request_token}`, {
    redirect_to: window.location.origin + URL_LOGIN,
  });
}

/**
 * Crea una nueva sesión utilizando los parámetros de la URL.
 */
export async function crearSesion() {
  const parametrosBusqueda = new URLSearchParams(window.location.search);

  if (!parametrosBusqueda.has('request_token') &&
    !parametrosBusqueda.has('approved')) {
    return;
  }

  if (parametrosBusqueda.get('approved') !== 'true') {
    throw new Error('No se proporciono la autorización.');
  }

  const apiKey = obtenerApiKey();
  const tokenSolicitud = parametrosBusqueda.get('request_token');

  const sesion = await generarSesion(tokenSolicitud, apiKey);
  guardarSessionId(sesion.session_id);
}

/**
 * Carga los datos del usuario desde la API y los almacena.
 */
export async function cargarDatosUsuario() {
  const apiKey = obtenerApiKey();
  const sessionId = obtenerSessionId();

  // Obtener datos crudos de la API (Extract)
  const detallesCuenta = await obtenerDetallesCuenta(apiKey, sessionId);

  // Transformar a formato español (Transform)
  const usuarioNormalizado = normalizarUsuario(detallesCuenta);

  // Guardar en storage (Load)
  guardarUsuario(usuarioNormalizado);
}

/**
 * Verifica la existencia del api_key, el session_id
 * y con estos datos obtiene la información del usuario.
 * @return {Promise<boolean>} - true si la autenticación es válida
 */
export async function verificarAuth() {
  if (!obtenerApiKey() || !obtenerSessionId()) {
    return false;
  }

  try {
    await cargarDatosUsuario();
  } catch {
    return false;
  }

  return true;
}

/**
 * Cierra la sesión del usuario eliminando datos locales y remotos.
 */
export async function cerrarSesion() {
  const apiKey = obtenerApiKey();
  const sessionId = obtenerSessionId();

  await eliminarSesion(apiKey, sessionId);
  limpiarAuth();
}
