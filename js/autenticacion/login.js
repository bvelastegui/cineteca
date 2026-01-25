/**
 * Página de Login
 * Maneja el formulario de login y el flujo de autorización OAuth.
 */

import {
  crearSesion,
  login,
  solicitarAutorizacion,
  verificarAuth,
} from '/js/core/auth.js';
import { redirigir, ui } from '/js/core/dom.js';
import { URL_INICIO } from '/js/constantes.js';

// Referencias al DOM
const dom = {
  formulario: null,
  inputApiKey: null,
  feedbackInvalido: null,
};

/**
 * Inicializa la página de login.
 */
async function inicializar() {
  // Verificar si ya está logueado
  if (await verificarAuth()) {
    return redirigir(URL_INICIO);
  }

  // Obtener referencias del DOM
  dom.formulario = document.querySelector('#form-login');
  dom.inputApiKey = document.querySelector('#key');
  dom.feedbackInvalido = document.querySelector('#invalid-feedback');

  // Verificar si volvemos de la redirección (OAuth flow)
  await verificarRetornoAuth();

  // Registrar el evento al enviar el formulario
  dom.formulario.addEventListener('submit', manejarEnvioFormulario);

  // Ocultar el loader que se activa por defecto
  ui.mostrarCargadorPagina(false);
}

/**
 * Maneja el retorno del servicio de autenticación.
 */
async function verificarRetornoAuth() {
  const parametrosBusqueda = new URLSearchParams(window.location.search);
  const tokenSolicitud = parametrosBusqueda.get('request_token');
  const aprobado = parametrosBusqueda.get('approved');

  if (tokenSolicitud && aprobado === 'true') {
    try {
      ui.mostrarCargadorPagina(true); // Bloquear UI mientras procesamos

      await crearSesion();
      redirigir(URL_INICIO);
    } catch (error) {
      console.error(error);
      ui.mostrarCargadorPagina(false); // Importante desbloquear si falla
      mostrarError(
        'No se pudo completar la autorización. Intenta nuevamente.',
      );
    }
  }
}

/**
 * Maneja el envío del formulario (Inicio del flujo).
 * @param {Event} e - Evento de envío del formulario
 */
async function manejarEnvioFormulario(e) {
  e.preventDefault();
  limpiarErrores();

  const apiKey = dom.inputApiKey.value.trim();

  if (apiKey.length === 0) {
    return mostrarError('Este campo es obligatorio.');
  }

  try {
    ui.mostrarCargadorPagina(true);

    await login(apiKey);
    await solicitarAutorizacion();
  } catch (error) {
    console.error(error);
    ui.mostrarCargadorPagina(false);
    mostrarError(
      'El API KEY proporcionado es inválido o hubo un error de conexión.',
    );
  }
}

/**
 * Muestra un mensaje de error en el formulario.
 * @param {string} mensaje - Mensaje de error a mostrar
 */
function mostrarError(mensaje) {
  dom.inputApiKey.classList.add('is-invalid');
  dom.feedbackInvalido.innerText = mensaje;
}

/**
 * Limpia los mensajes de error del formulario.
 */
function limpiarErrores() {
  dom.inputApiKey.classList.remove('is-invalid');
  dom.feedbackInvalido.innerText = '';
}

// Inicialización autoinvocada al cargar el DOM
document.addEventListener('DOMContentLoaded', inicializar);
