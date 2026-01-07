# Just Another Notes App

Aplicación desarollada con React para la gestión de usuarios y notas, con autenticación basada en JSON Web Tokens, control de permisos y persistencia de datos en MySQL.

Este proyecto está enfocado en aplicar buenas prácticas de arquitectura frontend, separando responsabilidades en componentes, hooks, helpers y services, con manejo de errores y validaciones.

## Tecnologías y dependencias

- React.js
- Axios para la gestión de peticiones HTTP
- React-hot-toast para la implementación de notificaciones tipo toast
- React-router-dom para el ruteo entre vistas

## Features

- Autenticación de usuarios con JWT
- CRUD completo de notas (crear, editar, eliminar)
- Edición inline de notas
- Validaciones de formularios onBlur
- Manejo de estados de carga y errores
- Notificaciones visuales con toast
- Diseño responsive con CSS Grid

## Arquitectura

El proyecto sigue una estructura modular orientada a responsabilidades claras:

- Pages: vistas principales del proyecto (notes, login, signup)
- Utils: helpers, services y validators
- Styles: estilos CSS componentizados
- Hooks
- Components: componentes generales del proyecto (botones, inputs, etc.)

## Backend

Este proyecto consume una API REST desarrollada en Node.js y MySQL, deployada de forma independiente. https://github.com/reemeerie/jana-api

La comunicación se realiza mediante Axios y autenticación JWT.

## Variables de entorno

Crear un archivo .env en la raíz del proyecto con la variable de entorno:

- VITE_API_URL=backend_url

## Instalación y ejecución

```
npm install
npm run dev
```

El servidor quedará disponible en: http://localhost:5173

## Puntos de mejora

- Extraer lógica de notas (fetch, create, delete, edit, loading/error states) a un hook `useNotes` para reducir responsabilidades en `NotesPage` / `Note` y dejar los componentes de UI más declarativos.
- Implementar confirmación de borrado (modal) y opción de “Undo”.
- Agregar tests básicos (unitarios de validaciones y helpers, e2e del flujo CRUD).

_Este proyecto fue desarrollado como práctica integral de frontend moderno con React, poniendo énfasis en arquitectura limpia, manejo de estado, UX y comunicación con APIs REST._
