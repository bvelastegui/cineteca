import Auth from '/js/features/auth/authService.js';
import {
  LOGIN_URL,
  TMDB_IMG_BACKDROP_BASE_URL,
  TMDB_IMG_POSTER_BASE_URL,
} from '/js/shared/constants.js';
import { redirect, ui } from '/js/lib/dom.js';
import { renderUserData } from '/js/lib/render.js';
import {
  fetchCategories,
  fetchMovies,
  fetchMoviesBySearch,
} from '../features/movies/moviesApi.js';

class IndexController {
  constructor() {
    this.dom = {
      /** @type {HTMLInputElement} */
      searchInput: document.querySelector('#search-input'),
      /** @type {HTMLElement} */
      moviesSection: document.querySelector('#movies-wrapper'),
      moviesOverlay: document.querySelector('#movies-overlay'),
    };
    this.debouncedSearch = null;
    this.categories = [];

    this.init();
  }

  async init() {
    if (!await Auth.check()) {
      redirect(LOGIN_URL);
    }

    renderUserData(Auth.user);

    this.dom.searchInput.addEventListener(
      'input',
      (e) => this.handleSearchInput(e),
    );

    await this.renderPopularMovies();

    ui.showPageLoader(false);
  }

  async renderPopularMovies() {
    const movies = await fetchMovies({ apiKey: Auth.apiKey });
    this.categories = await fetchCategories({ apiKey: Auth.apiKey });

    this.dom.moviesSection.innerHTML = movies.results
      .map((movie) => this.generateMovieHtml(movie))
      .join('');
    this.hideLoader();
  }

  /**
   * @param {Object} movie
   */
  generateMovieHtml(movie) {
    const movieCategories = this.categories.genres.filter(
      (genre) => movie.genre_ids.includes(genre.id),
    );
    const firstCategory = movieCategories.at(0)?.name ?? 'Unknown';
    const releaseYear = new Date(movie.release_date).getFullYear();
    const imgUrl = movie.poster_path
      ? `${TMDB_IMG_POSTER_BASE_URL}${movie.poster_path}`
      : `${TMDB_IMG_BACKDROP_BASE_URL}${movie.backdrop_path}`;

    return `
<div class="position-relative d-flex flex-column">
  <div class="position-relative">
    <img
      class="rounded-3 w-100 border shadow-sm"
      src="${imgUrl}"
      style="object-fit: cover; height: 342px"
      alt=""
    >
    <small class="position-absolute bottom-0 end-0 me-1 mb-1 badge bg-dark">
      <i class="bi bi-star-fill text-warning"></i> 
      ${movie.vote_average.toFixed(2)}
    </small>
  </div>
  <div
    class="mt-2 fw-semibold"
    style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden; width: 100%"
    data-bs-toggle="tooltip"
    title="${movie.title}"
  >
    ${movie.title}
  </div>
  <div class="d-flex align-items-center mt-1">
    <small class="text-secondary">
    ${releaseYear} · ${firstCategory}
    </small>
    <div class="ms-auto dropdown dropup">
      <a href="javascript:void(0)" data-bs-toggle="dropdown" class="link-body-emphasis icon-link">
        <i class="bi bi-plus-circle"></i>
      </a>
      <div class="dropdown-menu dropdown-menu-end" style="margin-top: -10px">
        <a href="" class="dropdown-item">
          <i class="bi bi-plus"></i>
          Crear Lista
        </a>
        <div class="dropdown-divider"></div>
        <a href="" class="dropdown-item">Agregar a Favoritos</a>
      </div>    
    </div>
  </div>
</div>
`;
  }

  /**
   * @param {InputEvent} e
   **/
  async handleSearchInput(e) {
    e.preventDefault();

    clearTimeout(this.debouncedSearch);
    this.debouncedSearch = setTimeout(async () => {
      this.showLoader();
      const value = this.dom.searchInput.value.trim();
      if (value.length === 0) {
        return await this.renderPopularMovies();
      }

      await this.renderSearchMovies();
    }, 500);
  }

  showLoader() {
    this.dom.moviesOverlay.classList.remove('d-none');
  }

  hideLoader() {
    this.dom.moviesOverlay.classList.add('d-none');
  }

  async renderSearchMovies() {
    const movies = await fetchMoviesBySearch({
      apiKey: Auth.apiKey,
      query: this.dom.searchInput.value.trim(),
    });

    this.dom.moviesSection.innerHTML = movies.results
      .map((movie) => this.generateMovieHtml(movie))
      .join('');
    this.hideLoader();
  }
}


document.addEventListener('DOMContentLoaded', () => new IndexController());
