# OBJETIVO DEL PROYECTO - CineTeca

## Proyecto Final de Asignatura
**Materia**: Desarrollo de Software  
**Tipo**: Proyecto Final  
**Integrantes**: 
- Bryan Velastegui
- Evelyn Morocho

**Objetivo**: Trabajo colaborativo con división de tareas por funcionalidades

---

## 1. Descripción General del Proyecto

**CineTeca** es una aplicación web desarrollada con JavaScript Vanilla que funciona como una biblioteca digital de películas. El proyecto tiene como propósito demostrar competencias en el consumo de APIs REST, transformación de datos mediante patrones ETL, implementación de operaciones CRUD y desarrollo de interfaces responsivas.

## 2. Justificación Académica

Este proyecto permite aplicar conocimientos fundamentales de desarrollo web frontend:

- **Consumo de APIs RESTful**: Integración con servicios externos mediante autenticación por API Key
- **Arquitectura de datos**: Implementación del patrón ETL (Extract, Transform, Load)
- **Persistencia local**: Uso estratégico de localStorage para optimización de rendimiento
- **Programación asíncrona**: Manejo de operaciones asíncronas con async/await
- **Manipulación del DOM**: Renderizado dinámico de contenido
- **Diseño responsivo**: Aplicación de principios Mobile First

## 3. Fuente de Datos

El proyecto utiliza **The Movie Database (TMDB) API v3**, una API RESTful que provee acceso a información detallada sobre películas, series, actores y directores. TMDB es una base de datos colaborativa mantenida por una comunidad global, similar al modelo de Wikipedia pero especializada en contenido audiovisual.

## 4. Funcionalidades Implementadas

### 4.1. Autenticación con API Key
Sistema de inicio de sesión que valida credenciales mediante petición a endpoint de autenticación de TMDB. La API Key se almacena en localStorage para mantener la sesión activa entre recargas del navegador.

### 4.2. Dashboard Principal
Página principal que presenta dos secciones dinámicas:
- **Tendencias**: Películas más populares obtenidas del endpoint `/trending/movie/week`
- **Estrenos recientes**: Películas en cartelera mediante `/movie/now_playing`

Ambas secciones implementan el patrón ETL para normalizar datos antes de su presentación.

### 4.3. Sistema de Filtros Avanzados
Implementación de filtros múltiples que permiten:
- **Filtrado por género**: Uso del endpoint `/discover/movie` con parámetros de género
- **Búsqueda por personas**: Integración de búsqueda de actores y directores
- **Filtrado por fecha de estreno**: Consultas parametrizadas por año o rango de fechas

### 4.4. Gestión de Listas (CRUD Completo)
Operaciones CRUD sincronizadas con la API de TMDB:
- **Create**: Creación de listas personalizadas mediante POST a `/list`
- **Read**: Consulta de listas existentes y su contenido con GET `/list/{list_id}`
- **Update**: Adición de películas a listas con POST `/list/{list_id}/add_item`
- **Delete**: Eliminación de películas o listas completas

## 5. Aspectos Técnicos Destacados

### 5.1. Arquitectura ETL
Implementación obligatoria del patrón Extract-Transform-Load para todas las operaciones con la API:

1. **Extract**: Obtención de datos mediante `fetch()` con manejo de errores
2. **Transform**: Renormalización de estructuras JSON a modelo interno con nomenclatura en español
3. **Load**: Persistencia en caché (localStorage) y renderizado en DOM

### 5.2. Sistema de Caché Inteligente
Estrategia de optimización que reduce llamadas a la API mediante:
- Almacenamiento temporal en localStorage
- TTL (Time To Live) de 1 hora por entrada de caché
- Validación de frescura de datos antes de cada petición
- Prevención de Rate Limiting de la API

### 5.3. Diseño Responsivo
Interfaz adaptativa basada en Bootstrap 5 que garantiza:
- Compatibilidad con dispositivos móviles, tablets y desktop
- Sistema de rejilla (Grid System) para layouts flexibles
- Componentes reutilizables (Cards, Modals, Navbar)
- Principio Mobile First en el desarrollo

### 5.4. Experiencia de Usuario (UX)
Feedback visual continuo al usuario:
- Spinners de carga durante peticiones asíncronas
- Alertas de Bootstrap para notificaciones de error o éxito
- Manejo graceful de errores de red o API

## 6. Competencias Desarrolladas

Al completar este proyecto, se habrán desarrollado las siguientes competencias:

### Técnicas
- Consumo de APIs REST con autenticación por API Key
- Implementación de patrones de arquitectura de datos (ETL)
- Programación asíncrona con async/await
- Manipulación avanzada del DOM
- Gestión de eventos del navegador
- Manejo de estructuras de datos (arrays y objetos)
- Persistencia con Web Storage API (localStorage)

### Profesionales
- Documentación técnica de proyectos
- Control de versiones con Git/GitHub
- Despliegue de aplicaciones web en GitHub Pages
- Resolución de problemas técnicos
- Lectura y comprensión de documentación oficial de APIs
- **Trabajo en equipo y colaboración**
- **Gestión de tareas y división de responsabilidades**
- **Comunicación técnica entre desarrolladores**

## 7. Alcance y Limitaciones del Proyecto

### 7.1. Funcionalidades Incluidas
- Sistema de autenticación mediante API Key de TMDB
- Dashboard con secciones de tendencias y estrenos recientes
- Sistema de búsqueda y filtros múltiples (género, personas, fecha)
- CRUD completo de listas personalizadas sincronizadas con API
- Operaciones de adición y eliminación de películas en listas
- Diseño responsivo compatible con múltiples dispositivos
- Sistema de caché con localStorage para optimización de rendimiento
- Manejo de errores y feedback visual al usuario

### 7.2. Funcionalidades Fuera del Alcance
- Reproducción de contenido audiovisual (streaming)
- Sistema de autenticación de usuarios con registro y base de datos
- Funcionalidad de comentarios o reseñas personalizadas
- Sistema de compartir listas entre usuarios
- Motor de recomendaciones basado en machine learning
- Notificaciones push de nuevos estrenos
- Integración con redes sociales

## 8. Stack Tecnológico

### Frontend
- **HTML5**: Estructura semántica con etiquetas modernas (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- **CSS3**: Estilos personalizados complementarios a Bootstrap
- **Bootstrap 5**: Framework CSS para componentes responsivos (vía CDN)
- **JavaScript ES6+**: Lógica de aplicación con características modernas (arrow functions, destructuring, async/await)

### Backend/API
- **TMDB API v3**: Servicio RESTful para datos de películas
- **Autenticación**: API Key mediante headers HTTP

### Persistencia
- **localStorage**: Almacenamiento local para caché y sesión de usuario

### Deployment
- **GitHub**: Control de versiones y repositorio remoto
- **GitHub Pages**: Hosting estático gratuito

### Restricciones Técnicas
- **Prohibido**: React, Vue, Angular, jQuery u otros frameworks JavaScript
- **Obligatorio**: JavaScript Vanilla puro

## 9. Entregables del Proyecto

### 9.1. Entregables Técnicos
- **Repositorio GitHub**: Código fuente completo con historial de commits descriptivos
- **Aplicación desplegada**: URL funcional en GitHub Pages
- **Código funcional**: Implementación completa de todos los requerimientos
- **Configuración de API**: API Key implementada (sin exponer en repositorio público)

### 9.2. Entregables Documentales
- **README.md**: Documentación completa del proyecto incluyendo:
  - Descripción del proyecto
  - Instrucciones de instalación y uso
  - Capturas de pantalla de la interfaz
  - Endpoints de API utilizados
  - Créditos y referencias
  - **División de tareas entre los integrantes del equipo**
- **Reporte técnico (PDF)**: Documento académico que incluye:
  - API utilizada y justificación
  - Estructura de datos original (de API) vs renormalizada (aplicación)
  - Diagramas de flujo de datos
  - Capturas de pantalla de funcionalidades
  - Desafíos encontrados y soluciones implementadas
  - **Distribución de responsabilidades por integrante**
  - Conclusiones y aprendizajes

### 9.3. Estructura del Código
La estructura definitiva del proyecto está por definir. Se organizará según las necesidades del equipo y la distribución de tareas acordada.

## 10. División de Tareas del Equipo

### Distribución por Funcionalidades

El equipo ha decidido dividir el trabajo según funcionalidades específicas:

#### Bryan Velastegui
Responsable de:
- **Autenticación con API Key**
  - Pantalla de login
  - Validación de credenciales con TMDB
  - Almacenamiento de sesión en localStorage
  - Manejo de errores de autenticación

- **Dashboard Principal**
  - Sección de películas en tendencias (`/trending/movie/week`)
  - Sección de estrenos recientes (`/movie/now_playing`)
  - Implementación de ETL para normalización de datos
  - Renderizado de tarjetas de películas
  - Diseño responsivo del dashboard

- **Sistema de Filtros Avanzados**
  - Filtrado por género (endpoint `/discover/movie`)
  - Búsqueda por actores y directores
  - Filtrado por fecha de estreno
  - Interfaz de filtros y formularios
  - Integración con resultados del dashboard

#### Evelyn Morocho
Responsable de:
- **CRUD Completo de Listas**
  - Create: Creación de listas personalizadas (POST `/list`)
  - Read: Visualización de listas existentes (GET `/list/{list_id}`)
  - Update: Agregar películas a listas (POST `/list/{list_id}/add_item`)
  - Delete: Eliminar películas o listas completas
  - Interfaz de gestión de listas

- **Sistema de Caché Inteligente**
  - Implementación de localStorage para caché
  - Sistema de TTL (Time To Live) de 1 hora
  - Validación de frescura de datos
  - Estrategia de invalidación de caché
  - Optimización de peticiones a API

- **Despliegue y Configuración**
  - Configuración de GitHub Pages
  - Preparación de build para producción
  - Validación de funcionamiento en producción
  - Documentación de proceso de despliegue

### Responsabilidades Compartidas
Ambos integrantes colaborarán en:
- **Code Review**: Revisión cruzada del código de cada funcionalidad
- **Pruebas y debugging**: Detección y corrección de errores
- **Git/GitHub**: Commits descriptivos, manejo de branches, resolución de conflictos
- **Documentación**: README.md, reporte técnico, comentarios en código
- **Integración**: Asegurar que todas las funcionalidades trabajen juntas correctamente
- **Diseño UI/UX**: Coherencia visual y experiencia de usuario consistente
- **Optimización**: Rendimiento y mejores prácticas

### Flujo de Trabajo
1. Cada integrante trabaja en su rama específica de Git
2. Commits frecuentes con mensajes descriptivos
3. Pull requests para integración de funcionalidades
4. Code review obligatorio antes de merge
5. Pruebas de integración después de cada merge
6. Comunicación constante sobre avances y bloqueos

## 11. Resultado Esperado

Al finalizar el proyecto, el equipo contará con una aplicación web frontend completamente funcional que demuestre:

- Comprensión de consumo de APIs REST
- Dominio de JavaScript asíncrono moderno
- Capacidad de implementar patrones de arquitectura (ETL)
- Habilidad para crear interfaces responsivas
- Competencia en documentación técnica
- Experiencia en despliegue de aplicaciones web
- **Capacidad de trabajo colaborativo en desarrollo de software**

Este proyecto servirá como evidencia de competencias para:
- Portafolio profesional de desarrollo web
- Evaluación final de la asignatura
- Base para proyectos más complejos en el futuro
- Demostración de habilidades para entrevistas técnicas
- **Experiencia en trabajo en equipo con Git/GitHub**
