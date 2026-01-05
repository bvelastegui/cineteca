<div align="center">
    <h1>CineTeca</h1>
    <img src="assets/img/logo.svg" alt="CineTeca Logo" width="200">
    <p>
        <strong>Aplicación web creada con JavaScript Vanilla que permite a los usuarios explorar películas, filtrarlas y gestionar listas personalizadas sincronizadas directamente con la API de TMDB.</strong>
    </p>
</div>

---

## 📋 Información del Proyecto

**Proyecto Final de Asignatura** - Desarrollo de Software  
**Integrantes**:
- Bryan Velastegui
- Evelyn Morocho

📄 **Documentación completa**: Ver [OBJETIVO.md](OBJETIVO.md) para objetivos detallados, alcance del proyecto y división de tareas.

---

## 🎯 Descripción

CineTeca es una biblioteca digital de películas que consume la API de The Movie Database (TMDB) para ofrecer información actualizada sobre películas populares, estrenos recientes y gestión de listas personalizadas. El proyecto implementa patrones de arquitectura modernos como ETL (Extract-Transform-Load) y estrategias de caché para optimizar el rendimiento.

### Características Principales

- 🔐 **Autenticación con API Key** de TMDB
- 📊 **Dashboard** con tendencias y estrenos recientes
- 🔍 **Filtros avanzados** por género, personas y fecha
- 📝 **CRUD completo** de listas personalizadas
- 💾 **Sistema de caché inteligente** con localStorage
- 📱 **Diseño responsivo** compatible con móviles, tablets y desktop
- ⚡ **Optimización** para prevenir rate limiting de la API

---

## 🛠️ Stack Tecnológico

- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados
- **Bootstrap 5**: Framework CSS (vía CDN)
- **JavaScript ES6+**: Vanilla JavaScript (sin frameworks)
- **TMDB API v3**: Servicio REST para datos de películas
- **localStorage**: Persistencia local y caché
- **GitHub Pages**: Deployment

### Restricciones
❌ No se permite usar: React, Vue, Angular, jQuery u otros frameworks JavaScript

---

## 🚀 Estado del Proyecto

> ⚠️ **PROYECTO EN FASE DE PLANIFICACIÓN**
> 
> Actualmente el proyecto está en etapa de planificación y diseño. Los archivos de implementación (HTML, CSS, JavaScript) se desarrollarán próximamente según la estructura definida por el equipo.

### Requisitos Previos (Para futura implementación)
1. Navegador web moderno (Chrome, Firefox, Safari, Edge)
2. API Key de TMDB (gratuita)

### Obtener API Key de TMDB
1. Crear cuenta en [The Movie Database](https://www.themoviedb.org/)
2. Ir a Configuración → API
3. Solicitar API Key (seleccionar "Developer")
4. Copiar la API Key generada

---

## 📂 Estructura del Proyecto

### Archivos Actuales (Documentación)
```
/cineteca
├── assets/             # Recursos estáticos
│   ├── favicon.ico
│   └── img/
│       └── logo.svg
├── README.md           # Este archivo - Documentación general
├── OBJETIVO.md         # Objetivos, alcance y división de tareas detallada
├── INSTRUCTIONS.md     # Instrucciones de la asignatura
└── LICENSE             # Licencia MIT del proyecto
```

### Estructura de Código (Por Definir)
La arquitectura de archivos HTML, CSS y JavaScript se definirá durante la fase de desarrollo según las necesidades del equipo.

---

## 🎭 Funcionalidades Planeadas

> Las siguientes funcionalidades serán implementadas según la división de tareas acordada:

### 1. Autenticación (Responsable: Bryan Velastegui)
- Login con API Key de TMDB
- Validación de credenciales
- Persistencia de sesión

### 2. Dashboard Principal (Responsable: Bryan Velastegui)
- **Tendencias**: Películas más populares de la semana
- **Estrenos**: Películas en cartelera actuales

### 3. Filtros Avanzados (Responsable: Bryan Velastegui)
- Filtrar por género (acción, comedia, drama, etc.)
- Buscar por actor o director
- Filtrar por fecha de estreno

### 4. Gestión de Listas - CRUD (Responsable: Evelyn Morocho)
- **Crear** listas personalizadas
- **Ver** listas existentes y su contenido
- **Agregar** películas a listas
- **Eliminar** películas de listas o borrar listas completas

### 5. Sistema de Caché (Responsable: Evelyn Morocho)
- Almacenamiento temporal de datos en localStorage
- TTL (Time To Live) de 1 hora
- Reducción de llamadas a la API

---

## 🔌 Endpoints de TMDB API a Utilizar

> Estos son los endpoints de la API de TMDB que se integrarán en el proyecto:

| Endpoint | Método | Descripción | Responsable |
|----------|--------|-------------|-------------|
| `/authentication` | GET | Validar API Key | Bryan |
| `/trending/movie/week` | GET | Películas en tendencia | Bryan |
| `/movie/now_playing` | GET | Estrenos recientes | Bryan |
| `/discover/movie` | GET | Descubrir películas con filtros | Bryan |
| `/search/movie` | GET | Buscar películas | Bryan |
| `/search/person` | GET | Buscar personas (actores/directores) | Bryan |
| `/list` | POST | Crear nueva lista | Evelyn |
| `/list/{list_id}` | GET | Obtener detalles de lista | Evelyn |
| `/list/{list_id}/add_item` | POST | Agregar película a lista | Evelyn |
| `/list/{list_id}/remove_item` | POST | Eliminar película de lista | Evelyn |
| `/list/{list_id}` | DELETE | Eliminar lista completa | Evelyn |

---

## 👥 División de Tareas

### Bryan Velastegui
- Autenticación con API Key
- Dashboard Principal (Tendencias + Estrenos)
- Sistema de Filtros Avanzados

### Evelyn Morocho
- CRUD de Listas
- Sistema de Caché Inteligente
- Despliegue en GitHub Pages

### Responsabilidades Compartidas
- Code Review
- Pruebas y debugging
- Documentación
- Integración de funcionalidades
- Diseño UI/UX

---

## 🌐 Despliegue

> 📌 **Responsable del despliegue**: Evelyn Morocho

La aplicación será desplegada en GitHub Pages una vez completada la implementación.

### Proceso de Despliegue Planificado
```bash
# 1. Asegurar que todos los cambios estén en main
git checkout main
git pull origin main

# 2. Hacer commit de cambios
git add .
git commit -m "Descripción de cambios"
git push origin main

# 3. Configurar GitHub Pages desde Settings → Pages
# 4. Seleccionar rama main como fuente
# 5. GitHub Pages generará la URL automáticamente
```

**URL de producción**: Se actualizará una vez desplegado el proyecto.

---

## 🧪 Arquitectura Técnica Planificada

### Patrón ETL (Extract-Transform-Load)

> Este patrón se implementará para todas las operaciones con la API:

```javascript
// Ejemplo conceptual de implementación

// 1. Extract: Obtener datos de TMDB
async function fetchMovies(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  return await response.json();
}

// 2. Transform: Renormalizar a español
function transformMovie(apiMovie) {
  return {
    id: apiMovie.id,
    titulo: apiMovie.original_title,
    poster: `https://image.tmdb.org/t/p/w500${apiMovie.poster_path}`,
    anio: new Date(apiMovie.release_date).getFullYear(),
    rating: apiMovie.vote_average,
    tipo: 'movie'
  };
}

// 3. Load: Guardar en caché y renderizar
function renderMovies(movies) {
  // Guardar en localStorage
  // Renderizar en DOM
}
```

### Sistema de Caché

> Estrategia de caché que implementará Evelyn Morocho:

```javascript
// Ejemplo conceptual de implementación

const CACHE_TTL = 3600000; // 1 hora

function getCachedData(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_TTL) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
}

function setCacheData(key, data) {
  const cacheObject = {
    data,
    timestamp: Date.now()
  };
  localStorage.setItem(key, JSON.stringify(cacheObject));
}
```

---

## 🤝 Contribución

Este es un proyecto académico. Para contribuir:

1. Crear un branch con formato: `feature/nombre-funcionalidad`
2. Hacer commits descriptivos en español
3. Crear Pull Request hacia `main`
4. Solicitar code review del compañero
5. Hacer merge después de aprobación

---

## 📝 Licencia

Este proyecto está licenciado bajo la **MIT License** - ver el archivo [LICENSE](LICENSE) para más detalles.

### Uso Académico
Este proyecto fue desarrollado como parte de un proyecto final de asignatura de Desarrollo de Software con fines educativos.

### Fuentes de Datos
- La información de películas es proporcionada por The Movie Database (TMDB) API
- TMDB API está sujeta a sus propios términos de servicio: https://www.themoviedb.org/terms-of-use
- Este proyecto no está respaldado ni certificado por TMDB

---

## 📚 Referencias

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [GitHub Pages Documentation](https://docs.github.com/es/pages)

---

## 📧 Contacto

**Bryan Velastegui** - [@bvelastegui](https://github.com/bvelastegui)  
**Evelyn Morocho** - [@evelyn18m](https://github.com/evelyn18m)

---

<div align="center">
    <p><strong>Instituto Tecnológico Superior CENESTUR • 2026</strong></p>
</div>
