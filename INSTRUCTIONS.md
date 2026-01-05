# PROYECTO FINAL DE ASIGNATURA

Consumo y Gestión de Datos desde una API Pública (JavaScript Vanilla)

## 1. Contexto del Proyecto

En el desarrollo de aplicaciones modernas es común consumir datos desde APIs externas, procesarlos y adaptarlos a las
necesidades de una aplicación específica. Muchas APIs devuelven información compleja o extensa, por lo que es necesario
transformar (renormalizar) los datos, almacenarlos temporalmente y gestionarlos mediante operaciones CRUD. En este
proyecto, el estudiante desarrollará una aplicación web en JavaScript Vanilla que consuma una API pública con API Key,
procese los datos y permita gestionar información mediante un CRUD.

## 2. Objetivo General

Desarrollar una aplicación web frontend que consuma datos desde una API pública con API Key, los renormalice mediante
JavaScript Vanilla y permita crear, leer, actualizar y eliminar información (CRUD).

## 3. API Pública Sugerida (con API Key)

El estudiante puede elegir una de las siguientes APIs:
> Opción 1: OpenWeatherMap<br>
> API Key gratuita.<br>
> Datos climáticos en tiempo real.

> Opción 2: NewsAPI<br>
> API Key gratuita.<br>
> Noticias por categoría y país.

> Opción 3: The Movie Database (TMDB)<br>
> API Key gratuita.<br>
> Información de películas y series.<br>

Requisito: uso obligatorio de API Key (almacenada en una constante en JavaScript).

## 4. Alcance del Proyecto

- [ ] Consumir datos desde una API externa usando fetch.
- [ ] Transformar (renormalizar) los datos recibidos.
- [ ] Mostrar la información en la interfaz web.
- [ ] Implementar un CRUD local usando localStorage.
- [ ] Gestionar la información desde el navegador.

## 5. Requisitos Técnicos Obligatorios

Tecnologías permitidas:
- [ ] HTML5
- [ ] CSS (básico)
- [ ] JavaScript Vanilla
- [ ] API pública con API Key
- [ ] fetch()
- [ ] localStorage

**Restricción:** No se permite React, Vue, Angular, jQuery u otros frameworks.

## 6. Renormalización de Datos (Obligatorio)

Los datos obtenidos de la API deben ser transformados antes de ser usados. Ejemplo (OpenWeatherMap):

**Respuesta original (API)**

```json
{
  "name": "Quito",
  "main": { "temp": 289.5, "humidity": 78 },
  "weather": [ { "description": "clear sky" } ]
}
```

**Objeto renormalizado**

```javascript
{
  ciudad: 'Quito',
  temperatura: 16.5,
  humedad: 78,
  clima: 'clear sky',
  fechaConsulta: '2025-01-15'
}
```

## 7. Funcionalidades CRUD (Obligatorio)

El estudiante debe implementar un CRUD completo sobre los datos renormalizados:
> Create<br>
> Guardar registros en localStorage.

> Read<br>
> Listar registros guardados y mostrar en tabla o tarjetas.

> Update<br>
> Editar registros existentes.

> Delete<br>
> Eliminar registros del almacenamiento local.

## 8. Estructura Mínima de la Aplicación

```text
/ proyecto-api
├── index.html
├── styles.css
└── app.js
```

## 9. Operaciones Obligatorias en JavaScript

- [ ] Uso de fetch().
- [ ] Uso de async / await.
- [ ] Manipulación del DOM.
- [ ] Manejo de eventos.
- [ ] Uso de arreglos y objetos.
- [ ] Uso de localStorage.

## 10. Entregables del Proyecto

### 10.1 Entrega técnica

- [ ] Código fuente completo.
- [ ] API Key configurada (en constante).
- [ ] CRUD funcional.

### 10.2 Entrega documental

**PDF que incluya:** API utilizada, estructura de datos original y renormalizada, capturas de la aplicación y
conclusiones.