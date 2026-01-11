<div align="center">
    <h1>CineTeca</h1>
    <p>&nbsp;</p>
    <img src="assets/img/logo.svg" alt="CineTeca Logo" width="200">
    <p>&nbsp;</p>
    <p>
        <strong>Aplicación web creada con JavaScript Vanilla que permite a los usuarios explorar películas, filtrarlas y gestionar listas personalizadas sincronizadas directamente con la API de TMDB.</strong>
    </p>
</div>

---

## Información del Proyecto

**Proyecto Final de Asignatura** - Desarrollo de Software  
**Integrantes**:
- Bryan Velastegui
- Evelyn Morocho

> [!NOTE]
> Ver [OBJETIVO.md](OBJETIVO.md) para objetivos detallados, alcance del proyecto y división de tareas.

---

## Descripción

CineTeca es una biblioteca digital de películas que consume la API de The Movie Database (TMDB) para ofrecer información actualizada sobre películas populares, estrenos recientes y gestión de listas personalizadas. El proyecto implementa patrones de arquitectura modernos como ETL (Extract-Transform-Load) y estrategias de caché para optimizar el rendimiento.

### Características Principales

- **Autenticación con API Key** de TMDB
- **Dashboard** con tendencias y estrenos recientes
- **Filtros avanzados** por género, personas y fecha
- **CRUD completo** de listas personalizadas
- **Sistema de caché inteligente** con localStorage
- **Diseño responsivo** compatible con móviles, tablets y desktop
- **Optimización** para prevenir rate limiting de la API

---

## Stack Tecnológico

- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados
- **Bootstrap 5**: Framework CSS (vía CDN)
- **JavaScript ES6+**: Vanilla JavaScript (sin frameworks)
- **TMDB API v3**: Servicio REST para datos de películas
- **localStorage**: Persistencia local y caché
- **GitHub Pages**: Deployment

### Restricciones

> [!IMPORTANT]
> No se permite usar: React, Vue, Angular, jQuery u otros frameworks JavaScript

---

## Estado del Proyecto

> [!NOTE]
> **PROYECTO EN PROGRESO DE IMPLEMENTACIÓN**
> 
> El proyecto está actualmente en fase de desarrollo activo. Se ha implementado la estructura base del proyecto con arquitectura modular y el sistema de autenticación está en desarrollo.

### Requisitos Previos
1. Navegador web moderno (Chrome, Firefox, Safari, Edge)
2. API Key de TMDB (gratuita)
3. Servidor HTTP local (recomendado para desarrollo)

### Obtener API Key de TMDB
1. Crear cuenta en [The Movie Database](https://www.themoviedb.org/)
2. Ir a Configuración → API
3. Solicitar API Key (seleccionar "Developer")
4. Copiar la API Key generada

### Ejecutar el Proyecto Localmente

```bash
# Opción 1: Python 3 (recomendado)
python3 -m http.server 8000
# Abrir http://localhost:8000 en el navegador

# Opción 2: Node.js con http-server
npx http-server -p 8000
# Abrir http://localhost:8000 en el navegador

# Opción 3: PHP
php -S localhost:8000
# Abrir http://localhost:8000 en el navegador
```

> [!TIP]
> Se recomienda usar un servidor HTTP local en lugar de abrir `index.html` directamente para evitar problemas con CORS y módulos ES6.

---

## Estructura del Proyecto

### Arquitectura Implementada
```
/cineteca
├── assets/                          # Recursos estáticos
│   ├── favicon.ico
│   └── img/
│       └── logo.svg
├── js/                              # Código JavaScript modular
│   ├── features/                    # Módulos de funcionalidades
│   │   ├── auth/                    # Sistema de autenticación
│   │   │   ├── authApi.js           # Llamadas API de autenticación
│   │   │   ├── authService.js       # Lógica de negocio de auth
│   │   │   ├── authStorage.js       # Gestión de localStorage
│   │   │   ├── User.js              # Modelo de datos de usuario
│   │   │   └── userAdapter.js       # Adaptador ETL para usuarios
│   │   └── cache/                   # Sistema de caché
│   │       └── cacheService.js      # Servicio de caché con TTL
│   ├── lib/                         # Librerías auxiliares
│   │   ├── dom.js                   # Utilidades DOM
│   │   └── render.js                # Utilidades de renderizado
│   ├── pages/                       # Controladores de páginas
│   │   ├── index.js                 # Dashboard principal
│   │   └── login.js                 # Página de login
│   └── shared/                      # Recursos compartidos
│       ├── constants.js             # Constantes globales
│       └── http.js                  # Cliente HTTP base
├── index.html                       # Página principal (Dashboard)
├── login.html                       # Página de autenticación
├── tsconfig.json                    # Configuración TypeScript (JSDoc)
├── README.md                        # Documentación general
├── OBJETIVO.md                      # Objetivos y división de tareas
├── INSTRUCTIONS.md                  # Instrucciones de la asignatura
└── LICENSE                          # Licencia MIT
```

### Arquitectura Modular Implementada

El proyecto sigue una arquitectura modular basada en capas:

- **`features/`**: Módulos de funcionalidades organizados por dominio
  - `auth/` - Sistema de autenticación
  - `cache/` - Sistema de caché con TTL
- **`lib/`**: Librerías y utilidades reutilizables
- **`pages/`**: Controladores de las páginas HTML
- **`shared/`**: Recursos compartidos entre módulos (constantes, http client, etc.)

---

## Funcionalidades

### ✅ Implementado

#### 1. Sistema de Autenticación ✅
- ✅ Arquitectura modular de auth
- ✅ Cliente HTTP base con fetch
- ✅ Modelo de datos User
- ✅ Adaptador ETL para transformación de datos
- ✅ Gestión de localStorage
- ✅ Validación de API Key con TMDB
- ✅ Interfaz de login completamente funcional
- ✅ Persistencia de sesión
- ✅ Redirección post-login
- ✅ Manejo de errores de autenticación

#### 2. Sistema de Caché Inteligente ✅
- ✅ Servicio de caché reutilizable (`CacheService`)
- ✅ TTL (Time To Live) configurable (1 hora por defecto)
- ✅ Prefijos automáticos para namespacing
- ✅ Limpieza automática de datos expirados
- ✅ Manejo de QuotaExceededError
- ✅ Integrado con sistema de autenticación
- ✅ Almacenamiento con timestamp de expiración

### 📋 Pendiente

#### 3. Dashboard Principal
- **Tendencias**: Películas más populares de la semana
- **Estrenos**: Películas en cartelera actuales

#### 4. Filtros Avanzados
- Filtrar por género (acción, comedia, drama, etc.)
- Buscar por actor o director
- Filtrar por fecha de estreno

#### 5. Gestión de Listas - CRUD
- **Crear** listas personalizadas
- **Ver** listas existentes y su contenido
- **Agregar** películas a listas
- **Eliminar** películas de listas o borrar listas completas

---

## Endpoints de TMDB API

| Endpoint | Método | Descripción | Estado |
|----------|--------|-------------|--------|
| `/authentication` | GET | Validar API Key | ✅ Implementado |
| `/trending/movie/week` | GET | Películas en tendencia | 🔄 En desarrollo |
| `/movie/now_playing` | GET | Estrenos recientes | 📋 Pendiente |
| `/discover/movie` | GET | Descubrir películas con filtros | 📋 Pendiente |
| `/search/movie` | GET | Buscar películas | 📋 Pendiente |
| `/search/person` | GET | Buscar personas (actores/directores) | 📋 Pendiente |
| `/list` | POST | Crear nueva lista | 📋 Pendiente |
| `/list/{list_id}` | GET | Obtener detalles de lista | 📋 Pendiente |
| `/list/{list_id}/add_item` | POST | Agregar película a lista | 📋 Pendiente |
| `/list/{list_id}/remove_item` | POST | Eliminar película de lista | 📋 Pendiente |
| `/list/{list_id}` | DELETE | Eliminar lista completa | 📋 Pendiente |

---

## Progreso de Desarrollo

### Sprint Actual: Dashboard Principal y Funcionalidades Avanzadas

#### ✅ Completado
- [x] Estructura de directorios modular
- [x] Cliente HTTP base con fetch API
- [x] Modelo de datos User
- [x] Adaptador ETL para usuarios (inglés → español)
- [x] Módulos de autenticación (API, Service, Storage)
- [x] Archivo HTML de login
- [x] Archivo HTML de dashboard principal
- [x] Configuración de constantes globales
- [x] Librerías auxiliares (DOM, Render)
- [x] **Sistema de Autenticación Completo**
  - [x] Validación de API Key con TMDB
  - [x] Interfaz de usuario del formulario de login
  - [x] Flujo de redirección post-login
  - [x] Manejo de errores en autenticación
  - [x] Persistencia de sesión con localStorage
- [x] **Sistema de Caché Completo**
  - [x] CacheService con TTL configurable
  - [x] Prefijos automáticos por módulo
  - [x] Limpieza de datos expirados
  - [x] Manejo de límites de localStorage
  - [x] Integración con authStorage

#### 🔄 En Desarrollo
- [ ] Dashboard con películas en tendencia
- [ ] Dashboard con estrenos recientes
- [ ] Tarjetas de películas (cards)
- [ ] Sistema de filtros avanzados

#### 📋 Siguientes Pasos
1. ✅ ~~Completar sistema de autenticación~~
2. ✅ ~~Implementar sistema de caché inteligente~~
3. 🔄 Implementar dashboard con tendencias y estrenos
4. Agregar sistema de filtros avanzados
5. Desarrollar CRUD de listas personalizadas
6. Realizar pruebas y debugging
7. Desplegar en GitHub Pages

---

## Despliegue

La aplicación será desplegada en GitHub Pages.

**URL de producción**: Se actualizará una vez desplegado el proyecto.

---

## Arquitectura Técnica Implementada

### Patrón ETL (Extract-Transform-Load)

El proyecto implementa el patrón ETL para todas las operaciones con la API de TMDB:

```javascript
// Ejemplo real del proyecto: js/features/auth/userAdapter.js

// Extract: Los datos vienen de la API de TMDB
// Transform: Adaptador convierte datos de inglés a español
export function toUser (tmdbUser) {
  return new User({
    id: tmdbUser.id,
    nombre: tmdbUser.username,
    nombreCompleto: tmdbUser.name || tmdbUser.username
  })
}

// Load: Los datos se guardan en localStorage y se usan en la aplicación
```

### Arquitectura de Capas

**1. Capa de API (`*Api.js`)**
- Comunicación directa con TMDB API
- Manejo de endpoints y parámetros
- Ejemplo: `js/features/auth/authApi.js`

**2. Capa de Servicio (`*Service.js`)**
- Lógica de negocio
- Orquestación de operaciones
- Ejemplo: `js/features/auth/authService.js`

**3. Capa de Almacenamiento (`*Storage.js`)**
- Gestión de localStorage
- Persistencia de datos
- Ejemplo: `js/features/auth/authStorage.js`

**4. Capa de Adaptadores (`*Adapter.js`)**
- Transformación de datos (ETL)
- Normalización a español
- Ejemplo: `js/features/auth/userAdapter.js`

**5. Modelos de Datos (`*.js` en features)**
- Estructuras de datos
- Validación
- Ejemplo: `js/features/auth/User.js`

**6. Capa de Caché (`CacheService`)**
- Sistema de caché reutilizable
- TTL configurable por entrada
- Limpieza automática de datos expirados
- Ejemplo: `js/features/cache/cacheService.js`

### Sistema de Caché Inteligente

El proyecto implementa un sistema de caché robusto (`CacheService`) con las siguientes características:

```javascript
// Ejemplo real: js/features/cache/cacheService.js

export class CacheService {
  constructor(prefix = 'tmdb_cache_') {
    this.prefix = prefix; // Namespacing automático
  }

  // Obtener dato con validación de expiración
  get(key) {
    const cachedItem = localStorage.getItem(this.prefix + key);
    if (!cachedItem) return null;

    const { data, expiry } = JSON.parse(cachedItem);
    
    // Auto-limpieza de datos expirados
    if (Date.now() > expiry) {
      localStorage.removeItem(this.prefix + key);
      return null;
    }
    
    return data;
  }

  // Guardar con TTL configurable (1 hora por defecto)
  set(key, data, ttl = 60) {
    const item = {
      data: data,
      expiry: Date.now() + (ttl * 60 * 1000)
    };
    localStorage.setItem(this.prefix + key, JSON.stringify(item));
  }
}
```

**Características clave:**
- ✅ TTL configurable (por defecto 1 hora)
- ✅ Prefijos automáticos para evitar colisiones
- ✅ Limpieza automática de datos expirados
- ✅ Manejo de `QuotaExceededError`
- ✅ Usado por `authStorage` para persistencia

### Cliente HTTP Centralizado

El proyecto utiliza un cliente HTTP base (`js/shared/http.js`) que:
- Maneja configuración común de fetch
- Gestiona headers y autenticación
- Proporciona métodos `GET`, `POST`, `PUT`, `DELETE`
- Reutilizable en todos los módulos

### Utilidades Compartidas

**`js/lib/dom.js`**: Manipulación del DOM
- Selección de elementos
- Event listeners
- Operaciones comunes

**`js/lib/render.js`**: Renderizado de componentes
- Templates HTML
- Actualización de UI
- Componentes reutilizables

### Constantes Globales

`js/shared/constants.js` centraliza:
- API Base URL
- Rutas de endpoints
- Configuraciones globales
- Evita "magic strings"

---

## Contribución

Este es un proyecto académico. Para contribuir:

1. Crear un branch con formato: `feature/nombre-funcionalidad`
2. Hacer commits descriptivos en español
3. Crear Pull Request hacia `main`
4. Solicitar code review del compañero
5. Hacer merge después de aprobación

---

## Licencia

Este proyecto está licenciado bajo la **MIT License** - ver el archivo [LICENSE](LICENSE) para más detalles.

### Uso Académico
Este proyecto fue desarrollado como parte de un proyecto final de asignatura de Desarrollo de Software con fines educativos.

### Fuentes de Datos
- La información de películas es proporcionada por The Movie Database (TMDB) API
- TMDB API está sujeta a sus propios términos de servicio: https://www.themoviedb.org/terms-of-use
- Este proyecto no está respaldado ni certificado por TMDB

---

## Referencias

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [GitHub Pages Documentation](https://docs.github.com/es/pages)

---

## Contacto

**Bryan Velastegui** - [@bvelastegui](https://github.com/bvelastegui)  
**Evelyn Morocho** - [@evelyn18m](https://github.com/evelyn18m)

---

<div align="center">
    <p><strong>Instituto Tecnológico Superior CENESTUR • 2026</strong></p>
</div>
