/**
 * Página principal - Index
 * Orquesta la carga de películas, búsqueda y manejo de eventos.
 */

import {
  cerrarSesion,
  obtenerApiKey,
  obtenerSessionId,
  obtenerUsuario,
  verificarAuth,
} from '/js/core/auth.js';
import { URL_LOGIN } from '/js/constantes.js';
import { redirigir, ui } from '/js/core/dom.js';
import { renderizarDatosUsuario } from '/js/core/renderizador.js';
import {
  obtenerCategorias,
  obtenerPeliculas,
  obtenerPeliculasPorBusqueda,
} from '/js/peliculas/api.js';
import {
  normalizarCategorias,
  normalizarPeliculas,
} from '/js/peliculas/normalizador.js';
import {
  mostrarCargador,
  renderizarPeliculas,
} from '/js/peliculas/renderizador.js';
import {
  obtenerListas,
  obtenerDetallesLista,
  crearLista,
  actualizarLista,
  eliminarLista,
  agregarPeliculaALista,
  eliminarPeliculaDeLista,
} from '/js/listas/api.js';
import { normalizarListas } from '/js/listas/normalizador.js';

// Estado de la aplicación
const estado = {
  categorias: [],
  peliculas: [],
  listas: [],
  listaActual: null, // Lista seleccionada actualmente
  tabActual: 'descubrir', // 'descubrir' o id de lista
  busqueda: '',
  debounceTimer: null,
  // Paginación
  paginacion: {
    paginaActual: 1,
    totalPaginas: 1,
    totalResultados: 0,
  },
};

  // Referencias al DOM
const dom = {
  searchInput: null,
  moviesWrapper: null,
  moviesOverlay: null,
  // Información de búsqueda
  busquedaInfo: null,
  busquedaTitulo: null,
  busquedaCantidad: null,
  // Paginación
  paginacionContainer: null,
  paginacionLista: null,
  // Tabs
  tabsListas: null,
  tabDescubrir: null,
  // Modales
  modalFormLista: null,
  modalConfirmarEliminar: null,
  // Botones
  btnCrearLista: null,
  btnEditarListaActual: null,
  btnEliminarListaActual: null,
  btnConfirmarEliminar: null,
  // Form
  formLista: null,
  listaId: null,
  listaNombre: null,
  listaDescripcion: null,
  btnGuardarLista: null,
  spinnerGuardar: null,
  spinnerEliminar: null,
  // Contenedor de descripción de lista
  listaDescripcionContainer: null,
  listaTitulo: null,
  listaDescripcionTexto: null,
  // Lista pendiente de eliminar
  listaPendienteEliminar: null,
  mensajeConfirmarEliminar: null,
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
  dom.searchInput = document.querySelector('#search-input');
  dom.moviesWrapper = document.querySelector('#movies-wrapper');
  dom.moviesOverlay = document.querySelector('#movies-overlay');
  
  // Referencias de información de búsqueda
  dom.busquedaInfo = document.getElementById('busqueda-info');
  dom.busquedaTitulo = document.getElementById('busqueda-titulo');
  dom.busquedaCantidad = document.getElementById('busqueda-cantidad');
  
  // Referencias de paginación
  dom.paginacionContainer = document.getElementById('paginacion-container');
  dom.paginacionLista = document.getElementById('paginacion-lista');
  
  // Referencias a tabs
  dom.tabsListas = document.getElementById('tabs-listas');
  dom.tabDescubrir = document.getElementById('tab-descubrir');
  
  // Referencias a modales
  dom.modalFormLista = new bootstrap.Modal(document.getElementById('modal-form-lista'));
  dom.modalConfirmarEliminar = new bootstrap.Modal(document.getElementById('modal-confirmar-eliminar'));
  
  // Referencias a botones
  dom.btnCrearLista = document.getElementById('crear-lista');
  dom.btnEditarListaActual = document.getElementById('btn-editar-lista-actual');
  dom.btnEliminarListaActual = document.getElementById('btn-eliminar-lista-actual');
  dom.btnConfirmarEliminar = document.getElementById('btn-confirmar-eliminar');
  
  // Referencias al formulario
  dom.formLista = document.getElementById('form-lista');
  dom.listaId = document.getElementById('lista-id');
  dom.listaNombre = document.getElementById('lista-nombre');
  dom.listaDescripcion = document.getElementById('lista-descripcion-input');
  dom.btnGuardarLista = document.getElementById('btn-guardar-lista');
  dom.spinnerGuardar = document.getElementById('spinner-guardar');
  dom.spinnerEliminar = document.getElementById('spinner-eliminar');
  
  // Referencias a contenedor de descripción
  dom.listaDescripcionContainer = document.getElementById('lista-descripcion-container');
  dom.listaTitulo = document.getElementById('lista-titulo');
  dom.listaDescripcionTexto = document.getElementById('lista-descripcion');
  dom.mensajeConfirmarEliminar = document.getElementById('mensaje-confirmar-eliminar');

  // Renderizar datos del usuario
  const usuario = obtenerUsuario();
  renderizarDatosUsuario(usuario);

  // Configurar event listeners
  configurarEventos();

  // Cargar categorías primero
  await cargarCategorias();

  // Cargar listas del usuario
  await cargarListasUsuario();

  // Cargar películas populares
  await cargarPeliculasPopulares();

  // Ocultar loader de página
  ui.mostrarCargadorPagina(false);
}

/**
 * Configura los event listeners de la página.
 */
function configurarEventos() {
  // Búsqueda de películas con debounce
  dom.searchInput.addEventListener('input', manejarBusqueda);

  // Logout
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', manejarLogout);
  }
  
  // Tab Descubrir
  dom.tabDescubrir.addEventListener('click', (e) => {
    e.preventDefault();
    cambiarTab('descubrir');
  });
  
  // Listas
  dom.btnCrearLista.addEventListener('click', abrirModalCrearLista);
  dom.btnEditarListaActual.addEventListener('click', (e) => {
    e.preventDefault();
    if (estado.listaActual) {
      abrirModalEditarLista(estado.listaActual);
    }
  });
  dom.btnEliminarListaActual.addEventListener('click', (e) => {
    e.preventDefault();
    if (estado.listaActual) {
      manejarEliminarLista(estado.listaActual);
    }
  });
  dom.formLista.addEventListener('submit', manejarSubmitFormLista);
  dom.btnConfirmarEliminar.addEventListener('click', confirmarEliminarLista);
}

/**
 * Carga las categorías/géneros de películas.
 */
async function cargarCategorias() {
  try {
    const apiKey = obtenerApiKey();
    const datosCategorias = await obtenerCategorias(apiKey);
    estado.categorias = normalizarCategorias(datosCategorias);
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
}

/**
 * Carga y renderiza las películas populares.
 */
async function cargarPeliculasPopulares() {
  try {
    mostrarCargador(dom.moviesOverlay, true);
    
    // Ocultar información de búsqueda y paginación
    ocultarInfoBusqueda();
    ocultarPaginacion();
    
    // Limpiar búsqueda y lista actual en estado
    estado.busqueda = '';
    estado.listaActual = null;

    const apiKey = obtenerApiKey();

    // Obtener datos de la API (Extract)
    const datosPeliculas = await obtenerPeliculas(apiKey);

    // Transformar datos a español (Transform)
    estado.peliculas = normalizarPeliculas(
      datosPeliculas.results,
      estado.categorias,
    );

    // Cargar en el DOM (Load)
    renderizarPeliculas(estado.peliculas, dom.moviesWrapper, estado.listas);
    
    // Configurar event listeners de películas
    configurarEventosPeliculas();
  } catch (error) {
    console.error('Error al cargar películas:', error);
    dom.moviesWrapper.innerHTML = '<p class="text-danger">Error al cargar películas. Por favor, intenta de nuevo.</p>';
  } finally {
    mostrarCargador(dom.moviesOverlay, false);
  }
}

/**
 * Busca películas según el texto ingresado.
 * @param {number} pagina - Número de página (opcional, default: 1)
 */
async function buscarPeliculas(pagina = 1) {
  try {
    mostrarCargador(dom.moviesOverlay, true);

    const consulta = dom.searchInput.value.trim();
    const apiKey = obtenerApiKey();

    // Si no hay búsqueda, mostrar populares
    if (consulta.length === 0) {
      ocultarInfoBusqueda();
      ocultarPaginacion();
      await cargarPeliculasPopulares();
      return;
    }
    
    // Limpiar lista actual (estamos en búsqueda, no en una lista)
    estado.listaActual = null;
    
    // Guardar consulta en estado
    estado.busqueda = consulta;

    // Obtener datos de búsqueda (Extract)
    const datosPeliculas = await obtenerPeliculasPorBusqueda(apiKey, consulta, pagina);

    // Transformar datos a español (Transform)
    estado.peliculas = normalizarPeliculas(
      datosPeliculas.results,
      estado.categorias,
    );
    
    // Actualizar información de paginación
    estado.paginacion.paginaActual = datosPeliculas.page;
    estado.paginacion.totalPaginas = datosPeliculas.total_pages;
    estado.paginacion.totalResultados = datosPeliculas.total_results;
    
    // Mostrar información de búsqueda con total_results
    mostrarInfoBusqueda(consulta, estado.paginacion.totalResultados);
    
    // Mostrar/actualizar paginación
    actualizarPaginacion();

    // Cargar en el DOM (Load)
    renderizarPeliculas(estado.peliculas, dom.moviesWrapper, estado.listas);
    
    // Configurar event listeners de películas
    configurarEventosPeliculas();
    
    // Scroll al inicio de la sección
    document.getElementById('movies-section').scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Error al buscar películas:', error);
    dom.moviesWrapper.innerHTML = '<p class="text-danger">Error al buscar películas. Por favor, intenta de nuevo.</p>';
  } finally {
    mostrarCargador(dom.moviesOverlay, false);
  }
}

/**
 * Muestra la información de búsqueda.
 * @param {string} consulta - Texto buscado
 * @param {number} cantidad - Cantidad de resultados
 */
function mostrarInfoBusqueda(consulta, cantidad) {
  dom.busquedaTitulo.textContent = `Resultados de búsqueda para "${consulta}"`;
  
  // Construir texto con información de página si hay paginación
  let textoInfo = `${cantidad} película${cantidad !== 1 ? 's' : ''} encontrada${cantidad !== 1 ? 's' : ''}`;
  
  if (estado.paginacion.totalPaginas > 1) {
    textoInfo += ` - Página ${estado.paginacion.paginaActual} de ${estado.paginacion.totalPaginas}`;
  }
  
  dom.busquedaCantidad.textContent = textoInfo;
  dom.busquedaInfo.classList.remove('d-none');
}

/**
 * Oculta la información de búsqueda.
 */
function ocultarInfoBusqueda() {
  dom.busquedaInfo.classList.add('d-none');
}

/**
 * Actualiza los controles de paginación.
 */
function actualizarPaginacion() {
  const paginaActual = estado.paginacion.paginaActual;
  const totalPaginas = estado.paginacion.totalPaginas;
  
  // Mostrar paginación solo si hay más de 1 página
  if (totalPaginas <= 1) {
    dom.paginacionContainer.classList.add('d-none');
    return;
  }
  
  dom.paginacionContainer.classList.remove('d-none');
  
  // Generar HTML de paginación
  let html = '';
  
  // Botón Anterior
  const anteriorDisabled = paginaActual <= 1 ? 'disabled' : '';
  html += `
    <li class="page-item ${anteriorDisabled}">
      <a class="page-link" href="#" data-pagina="${paginaActual - 1}" aria-label="Anterior">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  `;
  
  // Generar números de página
  const paginasAMostrar = generarRangoPaginas(paginaActual, totalPaginas);
  
  paginasAMostrar.forEach(pagina => {
    if (pagina === '...') {
      // Puntos suspensivos (no clickeable)
      html += `
        <li class="page-item disabled">
          <span class="page-link">...</span>
        </li>
      `;
    } else {
      // Número de página clickeable
      const active = pagina === paginaActual ? 'active' : '';
      html += `
        <li class="page-item ${active}">
          <a class="page-link" href="#" data-pagina="${pagina}">${pagina}</a>
        </li>
      `;
    }
  });
  
  // Botón Siguiente
  const siguienteDisabled = paginaActual >= totalPaginas ? 'disabled' : '';
  html += `
    <li class="page-item ${siguienteDisabled}">
      <a class="page-link" href="#" data-pagina="${paginaActual + 1}" aria-label="Siguiente">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `;
  
  // Renderizar
  dom.paginacionLista.innerHTML = html;
  
  // Configurar event listeners
  configurarEventosPaginacion();
}

/**
 * Genera el rango de páginas a mostrar en la paginación.
 * Usa lógica de "..." para páginas intermedias.
 * @param {number} paginaActual - Página actual
 * @param {number} totalPaginas - Total de páginas
 * @return {Array} - Array con números de página y '...'
 */
function generarRangoPaginas(paginaActual, totalPaginas) {
  const paginas = [];
  const delta = 2; // Número de páginas a mostrar a cada lado de la actual
  
  // Si hay pocas páginas, mostrar todas
  if (totalPaginas <= 7) {
    for (let i = 1; i <= totalPaginas; i++) {
      paginas.push(i);
    }
    return paginas;
  }
  
  // Siempre mostrar primera página
  paginas.push(1);
  
  // Calcular rango alrededor de página actual
  const inicio = Math.max(2, paginaActual - delta);
  const fin = Math.min(totalPaginas - 1, paginaActual + delta);
  
  // Agregar "..." si hay gap después de la primera página
  if (inicio > 2) {
    paginas.push('...');
  }
  
  // Agregar páginas del rango
  for (let i = inicio; i <= fin; i++) {
    paginas.push(i);
  }
  
  // Agregar "..." si hay gap antes de la última página
  if (fin < totalPaginas - 1) {
    paginas.push('...');
  }
  
  // Siempre mostrar última página
  paginas.push(totalPaginas);
  
  return paginas;
}

/**
 * Configura los event listeners de los botones de paginación.
 */
function configurarEventosPaginacion() {
  dom.paginacionLista.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const pagina = parseInt(link.dataset.pagina);
      
      // Verificar que sea un número válido
      if (!isNaN(pagina) && pagina >= 1 && pagina <= estado.paginacion.totalPaginas) {
        irAPagina(pagina);
      }
    });
  });
}

/**
 * Oculta los controles de paginación.
 */
function ocultarPaginacion() {
  dom.paginacionContainer.classList.add('d-none');
  // Reset estado de paginación
  estado.paginacion.paginaActual = 1;
  estado.paginacion.totalPaginas = 1;
  estado.paginacion.totalResultados = 0;
}

/**
 * Navega a una página específica de resultados.
 * @param {number} pagina - Número de página
 */
async function irAPagina(pagina) {
  if (estado.busqueda) {
    await buscarPeliculas(pagina);
  }
}

/**
 * Maneja el evento de input en el buscador con debounce.
 * @param {InputEvent} e
 */
function manejarBusqueda(e) {
  e.preventDefault();

  clearTimeout(estado.debounceTimer);
  estado.debounceTimer = setTimeout(async () => {
    await buscarPeliculas();
  }, 500);
}

/**
 * Maneja el evento de logout.
 * @param {Event} e
 */
async function manejarLogout(e) {
  e.preventDefault();
  ui.mostrarCargadorPagina(true);
  await cerrarSesion();
  window.location.reload();
}

/**
 * Configura los event listeners de las tarjetas de películas.
 * Debe llamarse después de renderizar las películas.
 */
function configurarEventosPeliculas() {
  // Botones "Agregar a lista"
  document.querySelectorAll('.agregar-a-lista').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const peliculaId = parseInt(btn.dataset.peliculaId);
      const listaId = parseInt(btn.dataset.listaId);
      await agregarPeliculaAListaHandler(peliculaId, listaId);
    });
  });
  
  // Botones "Eliminar de lista"
  document.querySelectorAll('.eliminar-de-lista').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const peliculaId = parseInt(btn.dataset.peliculaId);
      const listaId = parseInt(btn.dataset.listaId);
      await eliminarPeliculaDeListaHandler(peliculaId, listaId);
    });
  });
  
  // Botones "Crear lista desde película"
  document.querySelectorAll('.crear-lista-desde-pelicula').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      abrirModalCrearLista();
    });
  });
}

/**
 * Maneja la acción de agregar una película a una lista.
 * @param {number} peliculaId - ID de la película
 * @param {number} listaId - ID de la lista
 */
async function agregarPeliculaAListaHandler(peliculaId, listaId) {
  try {
    const apiKey = obtenerApiKey();
    const sessionId = obtenerSessionId();
    
    // Obtener nombre de la lista para el mensaje
    const lista = estado.listas.find(l => l.id === listaId);
    const nombreLista = lista ? lista.nombre : 'la lista';
    
    await agregarPeliculaALista(apiKey, sessionId, listaId, peliculaId);
    
    ui.mostrarToast(`Película agregada a "${nombreLista}"`, 'success');
    
    // Si estamos viendo esta lista, recargar para mostrar la nueva película
    if (estado.listaActual && estado.listaActual.id === listaId) {
      await cargarDetallesLista(listaId);
    }
  } catch (error) {
    console.error('Error al agregar película a lista:', error);
    ui.mostrarToast('Error al agregar la película. Por favor, intenta de nuevo.', 'error');
  }
}

/**
 * Maneja la acción de eliminar una película de una lista.
 * @param {number} peliculaId - ID de la película
 * @param {number} listaId - ID de la lista
 */
async function eliminarPeliculaDeListaHandler(peliculaId, listaId) {
  try {
    const apiKey = obtenerApiKey();
    const sessionId = obtenerSessionId();
    
    // Obtener nombre de la lista para el mensaje
    const lista = estado.listas.find(l => l.id === listaId);
    const nombreLista = lista ? lista.nombre : 'la lista';
    
    await eliminarPeliculaDeLista(apiKey, sessionId, listaId, peliculaId);
    
    ui.mostrarToast(`Película eliminada de "${nombreLista}"`, 'success');
    
    // Recargar la lista para actualizar la vista
    if (estado.listaActual && estado.listaActual.id === listaId) {
      await cargarDetallesLista(listaId);
    }
  } catch (error) {
    console.error('Error al eliminar película de lista:', error);
    ui.mostrarToast('Error al eliminar la película. Por favor, intenta de nuevo.', 'error');
  }
}


// ============================================================================
// GESTIÓN DE LISTAS
// ============================================================================

/**
 * Carga las listas del usuario y las muestra como tabs.
 */
async function cargarListasUsuario() {
  try {
    const apiKey = obtenerApiKey();
    const usuario = obtenerUsuario();
    
    // Obtener datos de la API (Extract)
    const datosListas = await obtenerListas(apiKey, usuario.id);
    
    // Transformar datos a español (Transform)
    estado.listas = normalizarListas(datosListas.results);
    
    // Renderizar tabs (Load)
    renderizarTabsListas();
  } catch (error) {
    console.error('Error al cargar listas:', error);
  }
}

/**
 * Renderiza las listas como tabs.
 */
function renderizarTabsListas() {
  // Limpiar tabs existentes (excepto Descubrir)
  const tabsExistentes = dom.tabsListas.querySelectorAll('.nav-item:not(:first-child)');
  tabsExistentes.forEach(tab => tab.remove());
  
  // Agregar tab por cada lista
  estado.listas.forEach(lista => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'nav-link';
    a.textContent = lista.nombre;
    a.dataset.listaId = lista.id;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      cambiarTab(lista.id);
    });
    
    li.appendChild(a);
    dom.tabsListas.appendChild(li);
  });
}

/**
 * Cambia el tab activo y carga el contenido correspondiente.
 * @param {string|number} tabId - 'descubrir' o ID de lista
 */
async function cambiarTab(tabId) {
  // Actualizar estado
  estado.tabActual = tabId;
  
  // Limpiar búsqueda y ocultar información
  dom.searchInput.value = '';
  estado.busqueda = '';
  ocultarInfoBusqueda();
  ocultarPaginacion();
  
  // Actualizar clases activas en tabs
  dom.tabsListas.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
  });
  
  if (tabId === 'descubrir') {
    // Limpiar lista actual
    estado.listaActual = null;
    
    // Activar tab Descubrir
    dom.tabDescubrir.classList.add('active');
    dom.tabDescubrir.setAttribute('aria-current', 'page');
    
    // Ocultar descripción de lista
    dom.listaDescripcionContainer.classList.add('d-none');
    
    // Cargar películas populares
    await cargarPeliculasPopulares();
  } else {
    // Activar tab de lista
    const tabLink = dom.tabsListas.querySelector(`[data-lista-id="${tabId}"]`);
    if (tabLink) {
      tabLink.classList.add('active');
      tabLink.setAttribute('aria-current', 'page');
    }
    
    // Cargar detalles de la lista
    await cargarDetallesLista(tabId);
  }
}

/**
 * Carga los detalles de una lista específica y muestra sus películas.
 * @param {number} idLista - ID de la lista
 */
async function cargarDetallesLista(idLista) {
  try {
    mostrarCargador(dom.moviesOverlay, true);
    
    // Ocultar información de búsqueda y paginación
    ocultarInfoBusqueda();
    ocultarPaginacion();
    
    const apiKey = obtenerApiKey();
    
    // Obtener datos de la API (Extract)
    const datosLista = await obtenerDetallesLista(apiKey, idLista);
    
    // Guardar lista actual en estado
    estado.listaActual = {
      id: datosLista.id,
      nombre: datosLista.name,
      descripcion: datosLista.description || '',
      cantidadItems: datosLista.item_count || 0,
    };
    
    // Transformar películas a español (Transform)
    const peliculasLista = datosLista.items || [];
    estado.peliculas = normalizarPeliculas(peliculasLista, estado.categorias);
    
    // Mostrar descripción de lista (Load)
    dom.listaTitulo.textContent = estado.listaActual.nombre;
    dom.listaDescripcionTexto.textContent = estado.listaActual.descripcion || 'Sin descripción';
    dom.listaDescripcionContainer.classList.remove('d-none');
    
    // Renderizar películas (Load) - pasar ID de lista para mostrar botón de eliminar
    renderizarPeliculas(estado.peliculas, dom.moviesWrapper, estado.listas, estado.listaActual.id);
    
    // Configurar event listeners de películas
    configurarEventosPeliculas();
  } catch (error) {
    console.error('Error al cargar detalles de lista:', error);
    dom.moviesWrapper.innerHTML = '<p class="text-danger">Error al cargar la lista. Por favor, intenta de nuevo.</p>';
  } finally {
    mostrarCargador(dom.moviesOverlay, false);
  }
}

/**
 * Abre el modal para crear una nueva lista.
 */
function abrirModalCrearLista() {
  // Limpiar formulario
  dom.formLista.reset();
  dom.listaId.value = '';
  
  // Cambiar título
  document.getElementById('modalFormListaLabel').textContent = 'Crear Nueva Lista';
  dom.btnGuardarLista.innerHTML = 'Crear Lista';
  
  // Mostrar modal
  dom.modalFormLista.show();
}

/**
 * Abre el modal para editar una lista existente.
 * @param {Object} lista - Lista a editar
 */
function abrirModalEditarLista(lista) {
  // Rellenar formulario
  dom.listaId.value = lista.id;
  dom.listaNombre.value = lista.nombre;
  dom.listaDescripcion.value = lista.descripcion || '';
  
  // Cambiar título
  document.getElementById('modalFormListaLabel').textContent = 'Editar Lista';
  dom.btnGuardarLista.innerHTML = 'Guardar Cambios';
  
  // Mostrar modal
  dom.modalFormLista.show();
}

/**
 * Maneja el envío del formulario de crear/editar lista.
 * @param {Event} e
 */
async function manejarSubmitFormLista(e) {
  e.preventDefault();
  
  const nombre = dom.listaNombre.value.trim();
  const descripcion = dom.listaDescripcion.value.trim();
  const id = dom.listaId.value;
  
  if (nombre.length === 0) {
    ui.mostrarToast('El nombre de la lista es obligatorio.', 'warning');
    return;
  }
  
  try {
    // Mostrar spinner
    dom.spinnerGuardar.classList.remove('d-none');
    dom.btnGuardarLista.disabled = true;
    
    const apiKey = obtenerApiKey();
    const sessionId = obtenerSessionId();
    
    if (id) {
      // Actualizar lista existente
      await actualizarLista(apiKey, sessionId, id, nombre, descripcion);
      
      // Actualizar en estado y UI
      const indice = estado.listas.findIndex(l => l.id == id);
      if (indice !== -1) {
        estado.listas[indice].nombre = nombre;
        estado.listas[indice].descripcion = descripcion;
      }
      
      // Si estamos viendo esta lista, actualizar descripción
      if (estado.listaActual && estado.listaActual.id == id) {
        estado.listaActual.nombre = nombre;
        estado.listaActual.descripcion = descripcion;
        dom.listaTitulo.textContent = nombre;
        dom.listaDescripcionTexto.textContent = descripcion || 'Sin descripción';
      }
    } else {
      // Crear nueva lista
      const resultado = await crearLista(apiKey, sessionId, nombre, descripcion, 'es-EC');
      
      // Agregar a estado
      const nuevaLista = {
        id: resultado.list_id,
        nombre: nombre,
        descripcion: descripcion,
        cantidadItems: 0,
      };
      estado.listas.push(nuevaLista);
    }
    
    // Cerrar modal
    dom.modalFormLista.hide();
    
    // Actualizar tabs
    renderizarTabsListas();
    
    // Mostrar mensaje de éxito
    ui.mostrarToast(id ? 'Lista actualizada exitosamente' : 'Lista creada exitosamente', 'success');
    
  } catch (error) {
    console.error('Error al guardar lista:', error);
    ui.mostrarToast('Error al guardar la lista. Por favor, intenta de nuevo.', 'error');
  } finally {
    dom.spinnerGuardar.classList.add('d-none');
    dom.btnGuardarLista.disabled = false;
  }
}

/**
 * Maneja la eliminación de una lista (muestra modal de confirmación).
 * @param {Object} lista - Lista a eliminar
 */
function manejarEliminarLista(lista) {
  // Guardar lista pendiente de eliminar
  dom.listaPendienteEliminar = lista;
  
  // Actualizar mensaje de confirmación
  dom.mensajeConfirmarEliminar.textContent = `¿Estás seguro que deseas eliminar la lista "${lista.nombre}"?`;
  
  // Mostrar modal de confirmación
  dom.modalConfirmarEliminar.show();
}

/**
 * Confirma y ejecuta la eliminación de una lista.
 */
async function confirmarEliminarLista() {
  if (!dom.listaPendienteEliminar) {
    return;
  }
  
  try {
    // Mostrar spinner
    dom.spinnerEliminar.classList.remove('d-none');
    dom.btnConfirmarEliminar.disabled = true;
    
    const apiKey = obtenerApiKey();
    const sessionId = obtenerSessionId();
    
    await eliminarLista(apiKey, sessionId, dom.listaPendienteEliminar.id);
    
    // Cerrar modal de confirmación
    dom.modalConfirmarEliminar.hide();
    
    // Eliminar de estado
    estado.listas = estado.listas.filter(l => l.id !== dom.listaPendienteEliminar.id);
    
    // Actualizar tabs
    renderizarTabsListas();
    
    // Si estábamos viendo esta lista, volver a Descubrir
    if (estado.listaActual && estado.listaActual.id === dom.listaPendienteEliminar.id) {
      cambiarTab('descubrir');
    }
    
    ui.mostrarToast('Lista eliminada exitosamente', 'success');
    
    // Limpiar lista pendiente
    dom.listaPendienteEliminar = null;
  } catch (error) {
    console.error('Error al eliminar lista:', error);
    ui.mostrarToast('Error al eliminar la lista. Por favor, intenta de nuevo.', 'error');
  } finally {
    dom.spinnerEliminar.classList.add('d-none');
    dom.btnConfirmarEliminar.disabled = false;
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);
