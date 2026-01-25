/**
 * Página de Listas
 * Maneja el CRUD de listas de películas del usuario.
 */

import {
  obtenerApiKey,
  obtenerSessionId,
  obtenerUsuario,
  verificarAuth,
} from '/js/core/auth.js';
import { URL_LOGIN } from '/js/constantes.js';
import { redirigir, ui } from '/js/core/dom.js';
import { renderizarDatosUsuario } from '/js/core/renderizador.js';
import {
  actualizarLista,
  crearLista,
  eliminarLista,
  obtenerListas,
} from '/js/listas/api.js';
import { normalizarListas } from '/js/listas/normalizador.js';
import {
  rellenarFormularioEdicion,
  renderizarListas,
} from '/js/listas/renderizador.js';

// Estado de la aplicación
const estado = {
  listas: [],
};

// Referencias al DOM
const dom = {
  listaContenedor: null,
  formulario: null,
  nameInput: null,
  descripcionInput: null,
  idListaInput: null,
};

/**
 * Inicializa la aplicación.
 */
async function inicializar() {
  // Verificar autenticación
  if (!await verificarAuth()) {
    redirigir(URL_LOGIN);
    return;
  }

  // Obtener referencias del DOM
  dom.listaContenedor = document.getElementById('lista');
  dom.formulario = document.getElementById('createform');
  dom.nameInput = document.getElementById('name');
  dom.descripcionInput = document.getElementById('descripcion');
  dom.idListaInput = document.getElementById('id-lista');

  // Renderizar datos del usuario
  const usuario = obtenerUsuario();
  renderizarDatosUsuario(usuario);

  // Cargar listas
  await cargarListas();

  // Configurar event listeners
  configurarEventos();

  // Ocultar loader de página
  ui.mostrarCargadorPagina(false);
}

/**
 * Carga las listas del usuario desde la API.
 */
async function cargarListas() {
  try {
    const apiKey = obtenerApiKey();
    const usuario = obtenerUsuario();

    // Obtener datos de la API (Extract)
    const datosListas = await obtenerListas(apiKey, usuario.id);

    // Transformar datos a español (Transform)
    estado.listas = normalizarListas(datosListas.results);

    // Cargar en el DOM (Load)
    renderizarListas(estado.listas, dom.listaContenedor);
  } catch (error) {
    console.error('Error al cargar listas:', error);
    dom.listaContenedor.innerHTML = '<p class="text-danger">Error al cargar listas.</p>';
  }
}

/**
 * Configura los event listeners de la página.
 */
function configurarEventos() {
  // Event listener del formulario
  dom.formulario.addEventListener('submit', manejarSubmitFormulario);

  // Event listeners de los botones de editar y eliminar
  configurarBotonesListas();
}

/**
 * Configura los event listeners de los botones de cada lista.
 */
function configurarBotonesListas() {
  const botonesEditar = document.querySelectorAll('.lista-card .btn-editar');
  const botonesEliminar = document.querySelectorAll('.lista-card .btn-eliminar');

  botonesEditar.forEach(boton => {
    boton.addEventListener('click', manejarEditar);
  });

  botonesEliminar.forEach(boton => {
    boton.addEventListener('click', manejarEliminar);
  });
}

/**
 * Maneja el clic en el botón de editar.
 * @param {Event} e
 */
function manejarEditar(e) {
  const boton = e.target;
  const id = Number(boton.dataset.id);

  const listaEditar = estado.listas.find(lista => lista.id === id);

  if (listaEditar) {
    rellenarFormularioEdicion(listaEditar);
  }
}

/**
 * Maneja el clic en el botón de eliminar.
 * @param {Event} e
 */
async function manejarEliminar(e) {
  const boton = e.target;
  const id = Number(boton.dataset.id);

  if (confirm('¿Está seguro que desea eliminar esta lista?')) {
    try {
      const apiKey = obtenerApiKey();
      const sessionId = obtenerSessionId();

      await eliminarLista(apiKey, sessionId, id);
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar lista:', error);
      alert('Error al eliminar la lista. Por favor, intenta de nuevo.');
    }
  }
}

/**
 * Maneja el envío del formulario (crear o actualizar).
 * @param {Event} e
 */
async function manejarSubmitFormulario(e) {
  e.preventDefault();

  const nombre = dom.nameInput.value.trim();
  const descripcion = dom.descripcionInput.value.trim();
  const idLista = dom.idListaInput.value;

  if (nombre.length === 0) {
    alert('El nombre de la lista es obligatorio.');
    return;
  }

  try {
    const apiKey = obtenerApiKey();
    const sessionId = obtenerSessionId();

    if (idLista.length > 0) {
      // Actualizar lista existente
      await actualizarLista(apiKey, sessionId, idLista, nombre, descripcion);
    } else {
      // Crear nueva lista
      await crearLista(apiKey, sessionId, nombre, descripcion, 'es_EC');
    }

    window.location.reload();
  } catch (error) {
    console.error('Error al guardar lista:', error);
    alert('Error al guardar la lista. Por favor, intenta de nuevo.');
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);
