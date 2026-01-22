import Auth from '/js/features/auth/authService.js';
import { API_URL, LOGIN_URL } from '/js/shared/constants.js';
import { redirect, ui } from '/js/lib/dom.js';
import { renderUserData } from '/js/lib/render.js';
import {
  actualizarLista,
  crearlista, eliminarLista,
  fetchAll,
} from '/js/features/list/listApi.js';

document.addEventListener('DOMContentLoaded', async () => {
  if (!await Auth.check()) {
    redirect(LOGIN_URL);
  }

  renderUserData(Auth.user);


  const listas = await fetchAll({
    apiKey: Auth.apiKey,
    userId: Auth.user.id,
  });
  const listaContenedor = document.getElementById('lista');
  let listaHTML = '';
  console.log(listas);
  listas.results.forEach(lista => {
    listaHTML += `<div class="card lista-card">
      <div class="card-body">
       <h5 class="card-title">
          ${lista.name}
          <small>${lista.favorite_count}</small>
       </h5>
       <p>${lista.description}</p>
       <button class="btn btn-primary btn-editar" data-id="${lista.id}">Editar</button>
       <button class="btn btn-danger btn-eliminar" data-id="${lista.id}">Eliminar</button>
      </div>
    </div>`;
  });

  listaContenedor.innerHTML = listaHTML;

  const btnEditar = document.querySelectorAll('.lista-card .btn-editar');
  const btnEliminar = document.querySelectorAll('.lista-card .btn-eliminar');

  btnEliminar.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const btn = e.target;
      const id = Number(btn.dataset.id);
      if(confirm("Esta seguro que desea eliminar esta lista?")) {
        await eliminarLista(
          Auth.apiKey,
          Auth.sessionId,
          id,
        );
        window.location.reload();
      }

    });
  });
  btnEditar.forEach(btn => btn.addEventListener('click', (e) => {
    const btn = e.target;
    const id = Number(btn.dataset.id);
    console.log(id);
    const listaEditar = listas.results.find((lista) => lista.id === id);
    console.log(listaEditar);
    document.getElementById('name').value = listaEditar.name;
    document.getElementById('descripcion').value = listaEditar.description;
    document.getElementById('btn-lista').innerText = 'Guardar Cambios';
    document.getElementById('id-lista').value = listaEditar.id;
  }));

  const formulario = document.getElementById('createform');
  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const descripcion = document.getElementById('descripcion').value;
    const idLista = document.getElementById('id-lista').value;
    if (idLista.length > 0) {
      const respuesta = await actualizarLista(
        Auth.apiKey,
        Auth.sessionId,
        idLista, name, descripcion,
      );
      console.log(respuesta);

    } else {
      const respuesta = await crearlista(
        Auth.apiKey,
        Auth.sessionId,
        name,
        descripcion,
        'es_EC',
      );
      console.log('Crear Lista', respuesta);

    }


    window.location.reload();

  });
  ui.showPageLoader(false);
});